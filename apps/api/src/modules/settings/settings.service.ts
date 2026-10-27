import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { createPaginationMeta, getPagination } from 'src/common/pagination';
import { PrismaService } from 'src/common/prisma/prisma.service';

import { CreateSettingDto } from './dto/create-setting.dto';
import { SettingQueryDto } from './dto/query-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';

@Injectable()
export class SettingsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(dto: SettingQueryDto) {
    const pagination = getPagination(dto);

    const q = dto.q?.trim();
    const namespace = dto.namespace?.trim();

    const where: Prisma.SettingWhereInput = {
      AND: [
        ...(q
          ? [
              {
                key: {
                  contains: q,
                  mode: Prisma.QueryMode.insensitive,
                },
              },
            ]
          : []),

        ...(namespace
          ? [
              {
                key: {
                  startsWith: `${namespace}.`,
                  mode: Prisma.QueryMode.insensitive,
                },
              },
            ]
          : []),
      ],
    };

    const [items, total] = await this.prisma.$transaction([
      this.prisma.setting.findMany({
        where,
        skip: pagination.skip,
        take: pagination.limit,
        orderBy: {
          key: 'asc',
        },
      }),

      this.prisma.setting.count({
        where,
      }),
    ]);

    return {
      items,
      meta: createPaginationMeta(total, pagination),
    };
  }

  async findOneByKey(key: string) {
    const setting = await this.prisma.setting.findUnique({
      where: { key },
    });

    if (!setting) {
      throw new NotFoundException('Setting not found');
    }

    return setting;
  }

  async create(dto: CreateSettingDto) {
    const existing = await this.prisma.setting.findUnique({
      where: {
        key: dto.key,
      },
      select: {
        id: true,
      },
    });

    if (existing) {
      throw new ConflictException('Setting key already exists');
    }

    return this.prisma.setting.create({
      data: {
        key: dto.key,
        value: dto.value as Prisma.InputJsonValue,
      },
    });
  }

  async update(key: string, dto: UpdateSettingDto) {
    await this.findOneByKey(key);

    return this.prisma.setting.update({
      where: { key },
      data: {
        value: dto.value as Prisma.InputJsonValue,
      },
    });
  }

  async remove(key: string) {
    await this.findOneByKey(key);

    return this.prisma.setting.delete({
      where: { key },
    });
  }
}
