import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from 'src/common/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { SlugService } from 'src/common/slug/slug.service';

import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dot';
import { PageQueryDto } from './dto/query-page.dto';
import { PageStatus } from '@prisma/client';

import { getPagination } from 'src/common/pagination';
import { BaseCrudService } from 'src/common/crud';
import { CurrentUser } from 'src/auth/types/current-user.type';
import id from 'zod/v4/locales/id.js';

@Injectable()
export class PagesService extends BaseCrudService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly slugService: SlugService,
  ) {
    super();
  }

  async create(dto: CreatePageDto, currentUser: CurrentUser) {
    const slug = dto.slug || this.slugService.generate(dto.title);

    const existingPage = await this.prisma.page.findUnique({
      where: {
        slug,
      },
    });

    if (existingPage) {
      throw new ConflictException('Slug Already exists');
    }

    return this.prisma.page.create({
      data: {
        title: dto.title,
        slug,

        excerpt: dto.excerpt,
        content: dto.content,

        seoTitle: dto.seoTitle,
        seoDescription: dto.seoDescription,

        coverImageId: dto.coverImageId,

        status: dto.status ?? PageStatus.DRAFT,

        createdById: currentUser.userId,
      },

      select: {
        id: true,
        title: true,
        slug: true,
        status: true,
        createdAt: true,
      },
    });
  }

  async findAll(query: PageQueryDto) {
    const pagination = getPagination(query);

    const where = {
      deletedAt: null,

      ...(query.q
        ? {
            OR: [
              {
                title: {
                  contains: query.q,
                  mode: 'insensitive' as const,
                },
              },
              {
                slug: {
                  contains: query.q,
                  mode: 'insensitive' as const,
                },
              },
            ],
          }
        : {}),

      ...(query.status
        ? {
            status: query.status,
          }
        : {}),
    };

    const [items, total] = await this.prisma.$transaction([
      this.prisma.page.findMany({
        where,

        skip: pagination.skip,
        take: pagination.limit,

        orderBy: {
          createdAt: 'desc',
        },

        include: {
          coverImage: {
            select: {
              id: true,
              url: true,
              altText: true,
              caption: true,
            },
          },
        },
      }),

      this.prisma.page.count({
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
    const page = await this.prisma.page.findFirst({
      where: {
        id,
        deletedAt: null,
      },

      include: {
        coverImage: {
          select: {
            id: true,
            url: true,
            altText: true,
            caption: true,
          },
        },
      },
    });

    if (!page) {
      throw new NotFoundException('Page not found');
    }

    return page;
  }
  async update(id: string, dto: UpdatePageDto, currentUser: CurrentUser) {
    const page = await this.prisma.page.findFirst({
      where: {
        id,
        deletedAt: null,
      },
      select: {
        id: true,
        slug: true,
      },
    });

    if (!page) {
      throw new NotFoundException('Page not found');
    }

    const slug = dto.slug;

    if (slug && slug !== page.slug) {
      const existingPage = await this.prisma.page.findUnique({
        where: {
          slug,
        },
        select: {
          id: true,
        },
      });

      if (existingPage) {
        throw new ConflictException('Slug already exists');
      }
    }

    await this.prisma.page.update({
      where: {
        id,
      },
      data: {
        title: dto.title,
        slug,
        excerpt: dto.excerpt,
        content: dto.content,
        coverImageId: dto.coverImageId,
        seoTitle: dto.seoTitle,
        seoDescription: dto.seoDescription,
        status: dto.status,
        updatedById: currentUser.userId,
      },
    });

    return this.findOne(id);
  }

  async remove(id: string) {
    return this.softDelete(this.prisma.page, id, 'Page');
  }
  async restore(id: string) {
    return this.restoreDeleted(this.prisma.page, id, 'Page');
  }
}
