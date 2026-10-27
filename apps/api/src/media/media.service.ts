import { Injectable, NotFoundException } from '@nestjs/common';
import { StorageDriver } from '@prisma/client';
import { PrismaService } from 'src/common/prisma/prisma.service';
import type { CurrentUser } from 'src/auth/types/current-user.type';
import { MediaQueryDto } from './dto/media-query.dto';
import { UploadMediaDto } from './dto/upload-media.dto';
import { getPagination } from 'src/common/pagination';
import { BaseCrudService } from 'src/common/crud';

@Injectable()
export class MediaService extends BaseCrudService {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async createFromUploadFile(
    file: Express.Multer.File,
    user: CurrentUser,
    dto: UploadMediaDto,
  ) {
    const normailizePath = file.path.replace(/\\/g, '/');

    const uploadIndex = normailizePath.indexOf('uploads/');
    const relativePath =
      uploadIndex >= 0 ? normailizePath.slice(uploadIndex) : normailizePath;

    return this.prisma.mediaAsset.create({
      data: {
        filename: file.filename,
        originalFilename: file.originalname,
        mimeType: file.mimetype,
        size: file.size,
        altText: dto.altText,
        caption: dto.caption,
        storageDriver: StorageDriver.LOCAL,
        path: relativePath,
        url: `/${relativePath}`,
        uploadedById: user.userId,
      },
    });
  }

  async findAll(query: MediaQueryDto) {
    const pagination = getPagination(query);

    const where = {
      deletedAt: null,

      ...(query.q
        ? {
            OR: [
              {
                filename: {
                  contains: query.q,
                  mode: 'insensitive' as const,
                },
              },
              {
                originalFilename: {
                  contains: query.q,
                  mode: 'insensitive' as const,
                },
              },
            ],
          }
        : {}),

      ...(query.mimeType
        ? {
            mimeType: {
              startsWith: query.mimeType,
            },
          }
        : {}),
    };

    const [items, total] = await this.prisma.$transaction([
      this.prisma.mediaAsset.findMany({
        where,

        skip: pagination.skip,
        take: pagination.limit,

        orderBy: {
          createdAt: 'desc',
        },

        include: {
          uploadedBy: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
            },
          },
        },
      }),

      this.prisma.mediaAsset.count({
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
    const media = this.prisma.mediaAsset.findFirst({
      where: {
        id,
        deletedAt: null,
      },

      select: {
        filename: true,
        originalFilename: true,
        mimeType: true,
        size: true,
        altText: true,
        caption: true,
        storageDriver: true,
        path: true,
        url: true,

        uploadedBy: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });

    if (!media) {
      throw new NotFoundException('Media file not found');
    }

    return media;
  }

  async update(id: string, dto: UploadMediaDto) {
    const media = await this.prisma.mediaAsset.findFirst({
      where: {
        id,
        deletedAt: null,
      },

      select: {
        id: true,
      },
    });

    if (!media) {
      throw new NotFoundException('Media not found');
    }

    return this.prisma.mediaAsset.update({
      where: {
        id,
        deletedAt: null,
      },

      data: {
        altText: dto.altText,
        caption: dto.caption,
      },

      select: {
        id: true,
        filename: true,
        url: true,
        altText: true,
        caption: true,
        updatedAt: true,
      },
    });
  }

  async remove(id: string) {
    return this.softDelete(this.prisma.mediaAsset, id, 'MediaAssets');
  }

  async restore(id: string) {
    return this.restoreDeleted(this.prisma.mediaAsset, id, 'MediaAsset');
  }
}
