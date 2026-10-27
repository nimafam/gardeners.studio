import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../common/prisma/prisma.service';

import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { TagQueryDto } from './dto/tag-query.dto';
import { getPagination } from 'src/common/pagination';
import { BaseCrudService } from 'src/common/crud';

@Injectable()
export class TagsService extends BaseCrudService {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async findAll(query: TagQueryDto) {
    const pagination = getPagination(query);

    const q = query.q?.trim();

    const where = {
      deletedAt: null,

      ...(q
        ? {
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
          }
        : {}),
    };

    const [items, total] = await this.prisma.$transaction([
      this.prisma.tag.findMany({
        where,
        skip: pagination.skip,
        take: pagination.limit,

        orderBy: {
          createdAt: 'desc',
        },
      }),

      this.prisma.tag.count({
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
    const tag = await this.prisma.tag.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });

    if (!tag) {
      throw new NotFoundException('Tag not found');
    }

    return tag;
  }

  async create(dto: CreateTagDto) {
    const existingTag = await this.prisma.tag.findUnique({
      where: {
        slug: dto.slug,
      },
    });

    if (existingTag) {
      throw new ConflictException('Slug already exists');
    }

    return this.prisma.tag.create({
      data: {
        name: dto.name,
        slug: dto.slug,
        description: dto.description,
      },
    });
  }

  async update(id: string, dto: UpdateTagDto) {
    const tag = await this.prisma.tag.findFirst({
      where: {
        id,
        deletedAt: null,
      },

      select: {
        id: true,
        slug: true,
      },
    });

    if (!tag) {
      throw new NotFoundException('Tag not found');
    }

    if (dto.slug && dto.slug !== tag.slug) {
      const existingTag = await this.prisma.tag.findUnique({
        where: {
          slug: dto.slug,
        },
      });

      if (existingTag) {
        throw new ConflictException('Slug already exists');
      }
    }

    return this.prisma.tag.update({
      where: {
        id,
      },

      data: {
        name: dto.name,
        slug: dto.slug,
        description: dto.description,
      },
    });
  }

  async remove(id: string) {
    return this.softDelete(this.prisma.tag, id, 'Tag');
  }

  async restore(id: string) {
    return this.restoreDeleted(this.prisma.tag, id, 'Tag');
  }
}
