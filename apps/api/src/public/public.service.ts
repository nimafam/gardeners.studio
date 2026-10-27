import { Injectable, NotFoundException } from '@nestjs/common';
import { ContentStatus } from '@prisma/client';
import { PrismaService } from '../common/prisma/prisma.service';
import { PostQueryDto } from '../posts/dto/post-query.dto';
import { getPagination } from 'src/common/pagination';
import { SettingKeys } from 'src/modules/settings/constants/setting-keys';

@Injectable()
export class PublicService {
  constructor(private readonly prisma: PrismaService) {}

  async findPosts(query: PostQueryDto) {
    const pagination = getPagination(query);
    const q = query.q?.trim();

    const where = {
      deletedAt: null,
      status: ContentStatus.PUBLISHED,

      ...(q
        ? {
            OR: [
              { title: { contains: q, mode: 'insensitive' as const } },
              { slug: { contains: q, mode: 'insensitive' as const } },
              { excerpt: { contains: q, mode: 'insensitive' as const } },
            ],
          }
        : {}),
    };

    const [items, total] = await this.prisma.$transaction([
      this.prisma.post.findMany({
        where,
        skip: pagination.skip,
        take: pagination.limit,
        orderBy: {
          publishedAt: 'desc',
        },
        select: {
          id: true,
          title: true,
          slug: true,
          excerpt: true,
          publishedAt: true,
          coverImage: {
            select: {
              id: true,
              url: true,
              altText: true,
              caption: true,
            },
          },
          author: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
            },
          },
          categories: {
            select: {
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
            select: {
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

      this.prisma.post.count({ where }),
    ]);

    return {
      items,
      meta: {
        total,
        pagination,
      },
    };
  }

  async findPostBySlug(slug: string) {
    const post = await this.prisma.post.findFirst({
      where: {
        slug,
        deletedAt: null,
        status: ContentStatus.PUBLISHED,
      },
      include: {
        coverImage: true,
        author: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
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

  findCategories() {
    return this.prisma.category.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        name: 'asc',
      },
      select: {
        id: true,
        name: true,
        slug: true,
      },
    });
  }

  findTags() {
    return this.prisma.tag.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        name: 'asc',
      },
      select: {
        id: true,
        name: true,
        slug: true,
      },
    });
  }

  findHome() {
    return this.prisma.homePageContent.findUnique({
      where: {
        singletonKey: 'homepage',
      },
      include: {
        heroImage: true,
        seoOgImage: true,
      },
    });
  }

  async findPublicSettings() {
    const publicKeys = [
      SettingKeys.GENERAL_SITE_NAME,
      SettingKeys.GENERAL_SITE_DESCRIPTION,
      SettingKeys.GENERAL_SITE_URL,
      SettingKeys.GENERAL_LANGUAGE,
      SettingKeys.GENERAL_TIMEZONE,
      SettingKeys.GENERAL_LOGO,

      SettingKeys.SEO_DEFAULT_TITLE,
      SettingKeys.SEO_DEFAULT_DESCRIPTION,
      SettingKeys.SEO_DEFAULT_OG_IMAGE,
      SettingKeys.SEO_ROBOTS,

      SettingKeys.SOCIAL_GITHUB,
      SettingKeys.SOCIAL_LINKEDIN,
      SettingKeys.SOCIAL_X,
      SettingKeys.SOCIAL_INSTAGRAM,
      SettingKeys.SOCIAL_TELEGRAM,

      SettingKeys.CONTACT_EMAIL,
      SettingKeys.CONTACT_PHONE,
      SettingKeys.CONTACT_ADDRESS,

      SettingKeys.MAINTENANCE_ENABLED,
      SettingKeys.MAINTENANCE_MESSAGE,
    ];

    const settings = await this.prisma.setting.findMany({
      where: {
        key: {
          in: publicKeys,
        },
      },
      select: {
        key: true,
        value: true,
      },
      orderBy: {
        key: 'asc',
      },
    });

    return Object.fromEntries(
      settings.map((setting) => [setting.key, setting.value]),
    );
  }
}
