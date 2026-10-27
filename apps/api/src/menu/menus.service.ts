import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import {
  Menu,
  MenuItem,
  MenuItemType,
  MenuLocation,
  Prisma,
} from '@prisma/client';

import { PrismaService } from 'src/common/prisma/prisma.service';
import { SlugService } from 'src/common/slug/slug.service';
import { BaseCrudService } from 'src/common/crud';

import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { MenuQueryDto } from './dto/query-menu.dto';

import { CreateMenuItemDto } from 'src/menu-items/dto/create-menu-item.dto';
import { UpdateMenuItemDto } from 'src/menu-items/dto/update-menu-item.dto';
import { ReorderMenuItemsDto } from 'src/menu-items/dto/reorder-menu-items.dto';
import { getPagination } from 'src/common/pagination';
import { AuditService } from 'src/modules/audit/audit.service';

@Injectable()
export class MenusService extends BaseCrudService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly slugService: SlugService,
    private readonly audit: AuditService,
  ) {
    super();
  }

  private async findMenuOrFail(id: string): Promise<Menu> {
    const menu = await this.prisma.menu.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });

    if (!menu) {
      throw new NotFoundException('Menu not found.');
    }

    return menu;
  }

  async create(dto: CreateMenuDto) {
    const slug = dto.slug || this.slugService.generate(dto.name);

    const existingMenu = await this.prisma.menu.findUnique({
      where: {
        slug,
      },
      select: {
        id: true,
      },
    });

    if (existingMenu) {
      throw new ConflictException('Menu slug already exists.');
    }

    const menu = await this.prisma.menu.create({
      data: {
        name: dto.name,
        slug,
        description: dto.description,

        location: dto.location,
        isActive: dto.isActive,
      },

      select: {
        id: true,
        name: true,
        slug: true,
        location: true,
        isActive: true,
        createdAt: true,
      },
    });

    await this.audit.create('Menu', menu.id, menu);

    return menu;
  }

  async findAll(query: MenuQueryDto) {
    const pagination = getPagination(query);

    const { q, location } = query;

    const where = {
      deletedAt: null,

      ...(location && { location }),

      ...(q && {
        OR: [
          {
            name: {
              contains: q,
              mode: 'insensitive' as const,
            },
          },
          {
            slug: {
              contains: q,
              mode: 'insensitive' as const,
            },
          },
        ],
      }),
    };

    const [items, total] = await this.prisma.$transaction([
      this.prisma.menu.findMany({
        where,

        skip: pagination.skip,
        take: pagination.limit,

        orderBy: {
          createdAt: 'desc',
        },

        select: {
          id: true,
          name: true,
          slug: true,
          description: true,

          location: true,
          isActive: true,

          createdAt: true,
          updatedAt: true,
        },
      }),

      this.prisma.menu.count({
        where,
      }),
    ]);

    return {
      items,
      meta: {
        total,
        pagination,
      },
    };
  }

  async findOne(id: string) {
    const menu = await this.prisma.menu.findUnique({
      where: {
        id,
        deletedAt: null,
      },

      include: {
        items: {
          where: {
            deletedAt: null,
          },

          orderBy: [
            {
              sortOrder: 'asc',
            },
            {
              createdAt: 'asc',
            },
          ],
        },
      },
    });

    if (!menu) {
      throw new NotFoundException('Menu not found.');
    }

    return menu;
  }

  async update(id: string, dto: UpdateMenuDto) {
    const menu = await this.prisma.menu.findUnique({
      where: {
        id,
      },

      select: {
        id: true,
        slug: true,
      },
    });

    if (!menu) {
      throw new NotFoundException('Menu not found.');
    }

    let slug = menu.slug;

    if (dto.slug || dto.name) {
      slug = dto.slug ?? this.slugService.generate(dto.name!);

      const existingMenu = await this.prisma.menu.findFirst({
        where: {
          slug,
          NOT: {
            id,
          },
        },

        select: {
          id: true,
        },
      });

      if (existingMenu) {
        throw new ConflictException('Menu slug already exists.');
      }
    }

    const before = await this.ensureExists(this.prisma.menu, id, 'Menu');

    const after = await this.prisma.menu.update({
      where: {
        id,
      },

      data: {
        ...dto,

        slug,
      },

      select: {
        id: true,
        name: true,
        slug: true,
        location: true,
        isActive: true,
        updatedAt: true,
      },
    });

    await this.audit.update('Menu', id, before, after);

    return after;
  }

  async remove(id: string) {
    const before = await this.ensureExists(this.prisma.menu, id, 'Menu');

    const after = await this.softDelete(this.prisma.menu, id, 'Menu');

    await this.audit.delete('Menu', id, before, {
      deletionType: 'soft-delete',
      deletedAt: after.deletedAt,
    });

    return after;
  }

  async restore(id: string) {
    const before = await this.prisma.menu.findUnique({
      where: {
        id,
      },
    });

    if (!before) {
      throw new NotFoundException(`Menu with ID "${id}" was not found.`);
    }

    const after = await this.restoreDeleted(this.prisma.menu, id, 'Menu');

    await this.audit.restore('Menu', id, before, after);

    return after;
  }

  private async validateParent(menuId: string, parentId?: string | null) {
    if (!parentId) {
      return;
    }

    const parent = await this.prisma.menuItem.findFirst({
      where: {
        id: parentId,
        menuId,
        deletedAt: null,
      },
      select: {
        id: true,
      },
    });

    if (!parent) {
      throw new BadRequestException('Parent menu item not found.');
    }
  }

  private async validateReference(type: MenuItemType, referenceId?: string) {
    if (type === MenuItemType.CUSTOM_URL) {
      return;
    }

    if (!referenceId) {
      throw new BadRequestException('Reference is required.');
    }

    switch (type) {
      case MenuItemType.POST:
        await this.ensureExists(this.prisma.post, referenceId, 'Post');
        break;

      case MenuItemType.PROJECT:
        await this.ensureExists(this.prisma.project, referenceId, 'Project');
        break;

      case MenuItemType.CATEGORY:
        await this.ensureExists(this.prisma.category, referenceId, 'Category');
        break;

      case MenuItemType.SERVICE:
        await this.ensureExists(this.prisma.service, referenceId, 'Service');
        break;
    }
  }

  private async getNextSortOrder(menuId: string, parentId?: string) {
    const lastItem = await this.prisma.menuItem.findFirst({
      where: {
        menuId,
        parentId: parentId ?? null,
        deletedAt: null,
      },

      orderBy: {
        sortOrder: 'desc',
      },

      select: {
        sortOrder: true,
      },
    });

    return (lastItem?.sortOrder ?? -1) + 1;
  }

  private async ensureNoCircularReference(itemId: string, parentId: string) {
    let currentParentId: string | null = parentId;

    while (currentParentId) {
      if (currentParentId === itemId) {
        throw new BadRequestException('Circular menu hierarchy detected.');
      }

      const parent = await this.prisma.menuItem.findUnique({
        where: {
          id: currentParentId,
        },

        select: {
          parentId: true,
        },
      });

      currentParentId = parent?.parentId ?? null;
    }
  }

  async createItem(menuId: string, dto: CreateMenuItemDto) {
    await this.ensureExists(this.prisma.menu, menuId, 'Menu');

    await this.validateParent(menuId, dto.parentId);

    const type = dto.type ?? MenuItemType.CUSTOM_URL;

    await this.validateReference(type, dto.referenceId);

    const sortOrder =
      dto.sortOrder ?? (await this.getNextSortOrder(menuId, dto.parentId));

    const menuItem = await this.prisma.menuItem.create({
      data: {
        menuId,

        parentId: dto.parentId,

        label: dto.label,

        url: dto.url,

        target: dto.target,

        type,

        referenceType: dto.referenceType,
        referenceId: dto.referenceId,

        sortOrder,

        isVisible: dto.isVisible,
      },

      select: {
        id: true,
        label: true,
        type: true,
        sortOrder: true,
        parentId: true,
        createdAt: true,
      },
    });

    await this.audit.create('MenuItem', menuItem.id, menuItem);

    return menuItem;
  }

  async updateItem(id: string, dto: UpdateMenuItemDto) {
    const item = await this.prisma.menuItem.findUnique({
      where: {
        id,
      },

      select: {
        id: true,
        menuId: true,
        parentId: true,
        type: true,
      },
    });

    if (!item) {
      throw new NotFoundException('Menu item not found.');
    }

    if (dto.parentId === id) {
      throw new BadRequestException('A menu item cannot be its own parent.');
    }

    const type = dto.type ?? item.type;

    await this.validateParent(item.menuId, dto.parentId);

    await this.validateReference(type, dto.referenceId);

    if (dto.parentId) {
      await this.ensureNoCircularReference(id, dto.parentId);
    }

    return this.prisma.menuItem.update({
      where: {
        id,
      },

      data: {
        ...dto,

        type,
      },

      select: {
        id: true,
        label: true,
        type: true,
        parentId: true,
        sortOrder: true,
        updatedAt: true,
      },
    });
  }

  async removeItem(id: string) {
    return this.softDelete(this.prisma.menuItem, id, 'MenuItem');
  }

  async restoreItem(id: string) {
    return this.restoreDeleted(this.prisma.menuItem, id, 'MenuItem');
  }

  async reorderItems(menuId: string, dto: ReorderMenuItemsDto) {
    await this.ensureExists(this.prisma.menu, menuId, 'Menu');

    const existingItems = await this.prisma.menuItem.findMany({
      where: {
        menuId,
        deletedAt: null,
      },
      select: {
        id: true,
      },
    });

    const existingIds = new Set(existingItems.map((item) => item.id));

    for (const item of dto.items) {
      if (!existingIds.has(item.id)) {
        throw new NotFoundException(`Menu item '${item.id}' not found.`);
      }

      await this.validateParent(menuId, item.parentId);

      if (item.parentId) {
        await this.ensureNoCircularReference(item.id, item.parentId);
      }
    }

    await this.prisma.$transaction(
      dto.items.map((item) =>
        this.prisma.menuItem.update({
          where: {
            id: item.id,
          },
          data: {
            parentId: item.parentId,
            sortOrder: item.sortOrder,
          },
        }),
      ),
    );

    return {
      success: true,
    };
  }

  async findPublicByLocation(location: MenuLocation) {
    const menu = await this.prisma.menu.findFirst({
      where: {
        location,
        isActive: true,
        deletedAt: null,
      },

      include: {
        items: {
          where: {
            deletedAt: null,
            isVisible: true,
          },

          orderBy: {
            sortOrder: 'asc',
          },
        },
      },
    });

    if (!menu) {
      throw new NotFoundException('Menu not found.');
    }

    return {
      ...menu,
      items: this.buildTree(menu.items),
    };
  }

  private buildTree(items: MenuItem[], parentId: string | null = null): any[] {
    return items
      .filter((item) => item.parentId === parentId)
      .map((item) => ({
        ...item,

        children: this.buildTree(items, item.id),
      }));
  }
}
