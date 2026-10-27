import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../common/prisma/prisma.service';
import { Prisma } from '@prisma/client';

import { CreatePostDto } from './dto/create-post.dto';
import { CurrentUser } from '../auth/types/current-user.type';
import { ContentStatus } from '@prisma/client';
import { PostQueryDto } from './dto/post-query.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { getPagination } from 'src/common/pagination';
import { SlugService } from 'src/common/slug/slug.service';
import { BaseCrudService } from 'src/common/crud';

@Injectable()
export class PostsService extends BaseCrudService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly slugService: SlugService,
  ) {
    super();
  }

  async create(dto: CreatePostDto, currentUser: CurrentUser) {
    const slug = dto.slug || this.slugService.generate(dto.title);

    const existingPost = await this.prisma.page.findUnique({
      where: { slug },
    });

    if (existingPost) {
      throw new ConflictException('Slug already exists');
    }

    return this.prisma.post.create({
      data: {
        title: dto.title,
        slug,
        excerpt: dto.excerpt,
        content: dto.content,
        seoTitle: dto.seoTitle,
        seoDescription: dto.seoDescription,
        coverImageId: dto.coverImageId,

        categories: dto.categoryIds
          ? {
              create: dto.categoryIds.map((categoryId) => ({
                categoryId,
              })),
            }
          : undefined,

        tags: dto.tagIds
          ? {
              create: dto.tagIds.map((tagId) => ({
                tagId,
              })),
            }
          : undefined,

        status: dto.status ?? ContentStatus.DRAFT,

        authorId: currentUser.userId,
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

  async findAll(query: PostQueryDto) {
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
      this.prisma.post.findMany({
        where,

        skip: pagination.skip,
        take: pagination.limit,

        orderBy: {
          createdAt: 'desc',
        },

        include: {
          author: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
            },
          },
          coverImage: {
            select: {
              id: true,
              url: true,
              altText: true,
              caption: true,
            },
          },

          categories: {
            include: {
              category: {
                select: {
                  id: true,
                  name: true,
                  slug: true,
                },
              },
            },
          },

          tags: {
            include: {
              tag: {
                select: {
                  id: true,
                  name: true,
                  slug: true,
                },
              },
            },
          },
        },
      }),

      this.prisma.post.count({
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
    const post = await this.prisma.post.findFirst({
      where: {
        id,
        deletedAt: null,
      },
      include: {
        author: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        categories: {
          include: {
            category: true,
          },
        },
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return post;
  }

  async update(id: string, dto: UpdatePostDto) {
    const post = await this.prisma.post.findFirst({
      where: {
        id,
        deletedAt: null,
      },
      select: {
        id: true,
        slug: true,
      },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    if (dto.slug && dto.slug !== post.slug) {
      const existingPost = await this.prisma.post.findUnique({
        where: {
          slug: dto.slug,
        },
        select: {
          id: true,
        },
      });

      if (existingPost) {
        throw new ConflictException('Slug already exists');
      }
    }

    const queries: Prisma.PrismaPromise<any>[] = [];

    if (dto.categoryIds !== undefined) {
      queries.push(
        this.prisma.postCategory.deleteMany({
          where: { postId: id },
        }),
      );

      if (dto.categoryIds.length > 0) {
        queries.push(
          this.prisma.postCategory.createMany({
            data: dto.categoryIds.map((categoryId) => ({
              postId: id,
              categoryId,
            })),
            skipDuplicates: true,
          }),
        );
      }
    }

    if (dto.tagIds !== undefined) {
      queries.push(
        this.prisma.postTag.deleteMany({
          where: {
            postId: id,
          },
        }),
      );

      if (dto.tagIds.length > 0) {
        queries.push(
          this.prisma.postTag.createMany({
            data: dto.tagIds.map((tagId) => ({
              postId: id,
              tagId,
            })),
            skipDuplicates: true,
          }),
        );
      }
    }

    queries.push(
      this.prisma.post.update({
        where: {
          id,
        },
        data: {
          title: dto.title,
          slug: dto.slug,
          excerpt: dto.excerpt,
          content: dto.content,
          coverImageId: dto.coverImageId,
          seoTitle: dto.seoTitle,
          seoDescription: dto.seoDescription,
          status: dto.status,
        },
      }),
    );

    await this.prisma.$transaction(queries);

    return this.findOne(id);
  }

  async remove(id: string) {
    return this.softDelete(this.prisma.post, id, 'Post');
  }

  async restore(id: string) {
    return this.restoreDeleted(this.prisma.post, id, 'Post');
  }
}
