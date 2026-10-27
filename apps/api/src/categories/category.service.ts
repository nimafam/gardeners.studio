import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';

import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryQueryDto } from './dto/category-query.dto';
import { contains } from 'class-validator';
import { getPagination } from 'src/common/pagination';
import { SlugService } from 'src/common/slug/slug.service';
import { BaseCrudService } from 'src/common/crud';

@Injectable()
export class CategoryService extends BaseCrudService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly slugService: SlugService,
  ) {
    super();
  }

  async findAll(dto: CategoryQueryDto) {
    const pagination = getPagination(dto);

    const q = dto.q?.trim();

    const where = {
      deletedAt: null,

      ...(q
        ? {
            OR: [
              { name: { contains: q, mode: 'insensitive' as const } },
              { slug: { contains: q, mode: 'insensitive' as const } },
            ],
          }
        : {}),
    };

    const [items, total] = await this.prisma.$transaction([
      this.prisma.category.findMany({
        where,
        skip: pagination.skip,
        take: pagination.limit,
        orderBy: { createdAt: 'desc' },

        include: {
          parent: { select: { id: true, name: true, slug: true } },
          children: { select: { id: true, name: true, slug: true } },
        },
      }),

      this.prisma.category.count({ where }),
    ]);

    return {
      items,
      meta: { total, pagination },
    };
  }

  async findOne(id: string) {
    const category = await this.prisma.category.findFirst({
      where: {
        id,
        deletedAt: null,
      },

      include: {
        parent: { select: { id: true, name: true, slug: true } },
        children: { select: { id: true, name: true, slug: true } },
      },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }

  async create(dto: CreateCategoryDto) {
    const existing = await this.prisma.category.findUnique({
      where: { slug: dto.slug },
      select: { id: true },
    });

    if (existing) {
      throw new ConflictException('Slug already exists');
    }

    return this.prisma.category.create({
      data: {
        name: dto.name,
        slug: dto.slug || this.slugService.generate(dto.name),
        description: dto.description,
        parentId: dto.parentId,
      },
    });
  }

  async update(id: string, dto: UpdateCategoryDto) {
    const category = await this.prisma.category.findFirst({
      where: {
        id,
        deletedAt: null,
      },

      select: { id: true, slug: true },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    if (dto.slug && dto.slug !== category.slug) {
      const existing = await this.prisma.category.findUnique({
        where: { slug: dto.slug },
        select: { id: true },
      });

      if (existing) {
        throw new ConflictException('Slug already exists');
      }
    }

    return this.prisma.category.update({
      where: { id, deletedAt: null },

      data: {
        name: dto.name,
        slug: dto.slug,
        description: dto.description,
        parentId: dto.parentId,
      },
    });
  }

  async remove(id: string) {
    return this.softDelete(this.prisma.category, id, 'Category');
  }

  async restore(id: string) {
    return this.restoreDeleted(this.prisma.category, id, 'Category');
  }
}
