import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from 'src/common/prisma/prisma.service';
import { SlugService } from 'src/common/slug/slug.service';
import { BaseCrudService } from 'src/common/crud/base-crud.service';
import { getPagination } from 'src/common/pagination';

import type { CurrentUser } from 'src/auth/types/current-user.type';

import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectQueryDto } from './dto/query-project.dto';

@Injectable()
export class ProjectsService extends BaseCrudService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly slugService: SlugService,
  ) {
    super();
  }

  async create(dto: CreateProjectDto, currentUser: CurrentUser) {
    const slug = dto.slug || this.slugService.generate(dto.title);

    const existingProject = await this.prisma.project.findUnique({
      where: {
        slug,
      },
      select: {
        id: true,
      },
    });

    if (existingProject) {
      throw new ConflictException('Project slug already exists');
    }

    if (dto.coverImageId) {
      const image = await this.prisma.mediaAsset.findUnique({
        where: {
          id: dto.coverImageId,
        },
        select: {
          id: true,
        },
      });

      if (!image) {
        throw new BadRequestException('Cover image not found.');
      }
    }

    const project = await this.prisma.project.create({
      data: {
        title: dto.title,
        slug,
        summary: dto.summary,
        description: dto.description,

        clientName: dto.clientName,
        projectUrl: dto.projectUrl,
        repositoryUrl: dto.repositoryUrl,

        status: dto.status,
        featured: dto.featured,
        sortOrder: dto.sortOrder,

        startedAt: dto.startedAt ? new Date(dto.startedAt) : undefined,

        completedAt: dto.completedAt ? new Date(dto.completedAt) : undefined,

        coverImageId: dto.coverImageId,

        createdById: currentUser.userId,
        updatedById: currentUser.userId,
      },
      select: {
        id: true,
        title: true,
        slug: true,
        status: true,
        featured: true,
        sortOrder: true,
        createdAt: true,
      },
    });

    return project;
  }

  async findAll(query: ProjectQueryDto) {
    const pagination = getPagination(query);

    const { q, status } = query;

    const where = {
      deletedAt: null,

      ...(status && { status }),

      ...(q && {
        OR: [
          {
            title: {
              contains: q,
              mode: 'insensitive' as const,
            },
          },
          {
            clientName: {
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
      this.prisma.project.findMany({
        where,

        skip: pagination.skip,
        take: pagination.limit,

        orderBy: [
          {
            sortOrder: 'asc',
          },
          {
            createdAt: 'desc',
          },
        ],

        select: {
          id: true,
          title: true,
          slug: true,
          summary: true,

          clientName: true,

          status: true,
          featured: true,

          coverImage: {
            select: {
              id: true,
              filename: true,
              originalFilename: true,
              mimeType: true,
            },
          },

          createdAt: true,
          updatedAt: true,
        },
      }),

      this.prisma.project.count({
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
    const project = await this.prisma.project.findUnique({
      where: {
        id,
        deletedAt: null,
      },

      include: {
        coverImage: {
          select: {
            id: true,
            filename: true,
            originalFilename: true,
            mimeType: true,
            url: true,
          },
        },

        images: {
          orderBy: {
            sortOrder: 'asc',
          },

          select: {
            id: true,
            sortOrder: true,
            caption: true,
            mediaAsset: {
              select: {
                id: true,
                filename: true,
                originalFilename: true,
                mimeType: true,
                url: true,
              },
            },
          },
        },

        tags: {
          include: {
            tag: true,
          },
        },

        createdBy: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },

        updatedBy: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });

    if (!project) {
      throw new NotFoundException('Project not found.');
    }

    return project;
  }

  async update(id: string, dto: UpdateProjectDto, currentUser: CurrentUser) {
    const project = await this.prisma.project.findUnique({
      where: { id },
      select: {
        id: true,
        slug: true,
      },
    });

    if (!project) {
      throw new NotFoundException('Project not found.');
    }

    if (dto.coverImageId) {
      await this.ensureExists(
        this.prisma.mediaAsset,
        dto.coverImageId,
        'CoverImage',
      );
    }

    let slug = project.slug;

    if (dto.slug || dto.title) {
      slug = dto.slug ?? this.slugService.generate(dto.title!);

      await this.ensureExists(this.prisma.project, dto.slug, 'Project');
    }

    return this.prisma.project.update({
      where: {
        id,
      },

      data: {
        ...dto,

        slug,

        startedAt: dto.startedAt ? new Date(dto.startedAt) : undefined,

        completedAt: dto.completedAt ? new Date(dto.completedAt) : undefined,

        updatedById: currentUser.userId,
      },

      select: {
        id: true,
        title: true,
        slug: true,
        status: true,
        featured: true,
        updatedAt: true,
      },
    });
  }

  async remove(id: string) {
    return this.softDelete(this.prisma.project, id, 'Project');
  }

  async restore(id: string) {
    return this.restoreDeleted(this.prisma.project, id, 'Project');
  }
}
