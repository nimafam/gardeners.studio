import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { UserStatus } from '@prisma/client';

import { CreateUserDto } from './dto/create-user.dto';
import { UserQueryDto } from './dto/user-dto.query';
import { UpdateUserStatusDto } from './dto/update-user-status.dto';
import { UpdateUserRolesDto } from './dto/udpate-user-roles.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import tr from 'zod/v4/locales/tr.js';
import th from 'zod/v4/locales/th.js';
import { getPagination } from 'src/common/pagination';
import { BaseCrudService } from 'src/common/crud';

@Injectable()
export class UsersService extends BaseCrudService {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async findAll(query: UserQueryDto) {
    const pagination = getPagination(query);
    const q = query.q?.trim();

    const where = {
      deletedAt: null,

      ...(q
        ? {
            OR: [
              { email: { contains: query.q, mode: 'insensitive' as const } },
              {
                firstName: { contains: query.q, mode: 'insensitive' as const },
              },
              { lastName: { contains: query.q, mode: 'insensitive' as const } },
            ],
          }
        : {}),
    };

    const [items, total] = await this.prisma.$transaction([
      this.prisma.user.findMany({
        where,
        skip: pagination.skip,
        take: pagination.limit,
        orderBy: {
          createdAt: 'desc',
        },

        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          status: true,
          createdAt: true,

          roles: {
            select: {
              role: {
                select: {
                  slug: true,
                  name: true,
                },
              },
            },
          },
        },
      }),
      this.prisma.user.count({ where }),
    ]);

    return {
      items,
      meta: {
        total,
        pagination,
      },
    };
  }

  async findById(id: string) {
    return this.prisma.user.findFirst({
      where: {
        id,
        deletedAt: null,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        status: true,
        lastLoginAt: true,
        createdAt: true,
        updatedAt: true,

        roles: {
          select: {
            role: {
              select: {
                slug: true,
                name: true,
              },
            },
          },
        },
      },
    });
  }

  async findAuthenticatedUserById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        status: true,
        deletedAt: true,

        roles: {
          select: {
            role: {
              select: {
                slug: true,
              },
            },
          },
        },
      },
    });
  }

  async updateStatus(id: string, dto: UpdateUserStatusDto) {
    return this.prisma.user.update({
      where: {
        id,
      },
      data: {
        status: dto.status,
      },

      select: {
        id: true,
        email: true,
        status: true,
        updatedAt: true,
      },
    });
  }

  async updateRoles(id: string, dto: UpdateUserRolesDto) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const roles = await this.prisma.role.findMany({
      where: {
        slug: {
          in: dto.roles,
        },
      },
    });

    if (roles.length !== dto.roles.length) {
      throw new BadRequestException('One or more roles are invalid');
    }

    await this.prisma.$transaction([
      this.prisma.userRole.deleteMany({
        where: {
          userId: id,
        },
      }),
    ]);

    await this.prisma.userRole.createMany({
      data: roles.map((roles) => ({
        userId: id,
        roleId: roles.id,
      })),
    });

    return this.findById(id);
  }

  async Create(dto: CreateUserDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
      select: { id: true },
    });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const roles = await this.prisma.role.findMany({
      where: {
        slug: {
          in: dto.roles,
        },
      },
    });

    if (roles.length !== dto.roles.length) {
      throw new BadRequestException('One or more roles are invalid');
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        passwordHash,
        firstName: dto.firstName,
        lastName: dto.lastName,
        status: UserStatus.ACTIVE,

        roles: {
          create: roles.map((role) => ({
            roleId: role.id,
          })),
        },
      },

      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        status: true,
        createdAt: true,

        roles: {
          select: {
            role: {
              select: {
                slug: true,
                name: true,
              },
            },
          },
        },
      },
    });

    return user;
  }

  async update(id: string, dto: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (dto.email && dto.email !== user.email) {
      const existingUser = await this.prisma.user.findUnique({
        where: {
          email: dto.email,
        },
      });

      if (existingUser) {
        throw new ConflictException('Email already exists');
      }
    }

    const data: any = {
      email: dto.email,
      firstName: dto.firstName,
      lastName: dto.lastName,
    };

    if (dto.password) {
      data.passwordHash = await bcrypt.hash(dto.password, 10);
    }

    return this.prisma.user.update({
      where: { id },

      data,

      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        status: true,
        updatedAt: true,
      },
    });
  }

  async remove(id: string) {
    return this.softDelete(this.prisma.user, id, 'User');
  }

  async restore(id: string) {
    return this.restoreDeleted(this.prisma.user, id, 'User');
  }
}
