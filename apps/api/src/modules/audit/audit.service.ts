import { Injectable, NotFoundException } from '@nestjs/common';
import { AuditAction, Prisma } from '@prisma/client';

import { PrismaService } from 'src/common/prisma/prisma.service';
import { RequestContextService } from '../../common/request-context/request-context.service';
import { CreateAuditLogDto } from './dto/create-audit-log.dto';
import { QueryAuditDto } from './dto/query-audit.dto';
import { getPagination } from 'src/common/pagination';

@Injectable()
export class AuditService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly requestContext: RequestContextService,
  ) {}

  async log(dto: CreateAuditLogDto) {
    const context = this.requestContext.get();

    return this.prisma.auditLog.create({
      data: {
        action: dto.action,
        entityType: dto.entityType,
        entityId: dto.entityId ?? null,

        before: this.toNullableJson(dto.before),
        after: this.toNullableJson(dto.after),
        metadata: this.toNullableJson(dto.metadata),

        userId: dto.userId ?? context?.userId ?? null,

        ipAddress: dto.ipAddress ?? context?.ipAddress ?? null,

        userAgent: dto.userAgent ?? context?.userAgent ?? null,
      },
    });
  }

  async create(
    entityType: string,
    entityId: string,
    after: unknown,
    metadata?: unknown,
  ) {
    return this.log({
      action: AuditAction.CREATE,
      entityType,
      entityId,
      after: this.toJson(after),
      metadata: this.toOptionalJson(metadata),
    });
  }

  async update(
    entityType: string,
    entityId: string,
    before: unknown,
    after: unknown,
    metadata?: unknown,
  ) {
    return this.log({
      action: AuditAction.UPDATE,
      entityType,
      entityId,
      before: this.toJson(before),
      after: this.toJson(after),
      metadata: this.toOptionalJson(metadata),
    });
  }

  async delete(
    entityType: string,
    entityId: string,
    before: unknown,
    metadata?: unknown,
  ) {
    return this.log({
      action: AuditAction.DELETE,
      entityType,
      entityId,
      before: this.toJson(before),
      metadata: this.toOptionalJson(metadata),
    });
  }

  async restore(
    entityType: string,
    entityId: string,
    before: unknown,
    after: unknown,
    metadata?: unknown,
  ) {
    return this.log({
      action: AuditAction.RESTORE,
      entityType,
      entityId,
      before: this.toJson(before),
      after: this.toJson(after),
      metadata: this.toOptionalJson(metadata),
    });
  }

  async publish(
    entityType: string,
    entityId: string,
    before: unknown,
    after: unknown,
    metadata?: unknown,
  ) {
    return this.log({
      action: AuditAction.PUBLISH,
      entityType,
      entityId,
      before: this.toJson(before),
      after: this.toJson(after),
      metadata: this.toOptionalJson(metadata),
    });
  }

  async unpublish(
    entityType: string,
    entityId: string,
    before: unknown,
    after: unknown,
    metadata?: unknown,
  ) {
    return this.log({
      action: AuditAction.UNPUBLISH,
      entityType,
      entityId,
      before: this.toJson(before),
      after: this.toJson(after),
      metadata: this.toOptionalJson(metadata),
    });
  }

  async archive(
    entityType: string,
    entityId: string,
    before: unknown,
    after: unknown,
    metadata?: unknown,
  ) {
    return this.log({
      action: AuditAction.ARCHIVE,
      entityType,
      entityId,
      before: this.toJson(before),
      after: this.toJson(after),
      metadata: this.toOptionalJson(metadata),
    });
  }

  async login(userId: string, metadata?: unknown) {
    return this.log({
      action: AuditAction.LOGIN,
      entityType: 'User',
      entityId: userId,
      userId,
      metadata: this.toOptionalJson(metadata),
    });
  }

  async logout(userId: string, metadata?: unknown) {
    return this.log({
      action: AuditAction.LOGOUT,
      entityType: 'User',
      entityId: userId,
      userId,
      metadata: this.toOptionalJson(metadata),
    });
  }

  async findAll(queryDto: QueryAuditDto) {
    const pagination = getPagination(queryDto);

    const where: Prisma.AuditLogWhereInput = {
      userId: queryDto.userId,
      action: queryDto.action,
      entityType: queryDto.entityType,
      entityId: queryDto.entityId,
    };

    if (queryDto.search) {
      where.OR = [
        {
          entityType: {
            contains: queryDto.search,
            mode: 'insensitive',
          },
        },
        {
          entityId: {
            contains: queryDto.search,
            mode: 'insensitive',
          },
        },
        {
          user: {
            email: {
              contains: queryDto.search,
              mode: 'insensitive',
            },
          },
        },
      ];
    }

    if (queryDto.from || queryDto.to) {
      where.createdAt = {
        ...(queryDto.from
          ? {
              gte: new Date(queryDto.from),
            }
          : {}),
        ...(queryDto.to
          ? {
              lte: new Date(queryDto.to),
            }
          : {}),
      };
    }

    const [items, total] = await this.prisma.$transaction([
      this.prisma.auditLog.findMany({
        where,
        skip: pagination.skip,
        take: pagination.limit,
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
            },
          },
        },
      }),

      this.prisma.auditLog.count({
        where,
      }),
    ]);

    return {
      data: items,
      meta: {
        total,
        pagination,
      },
    };
  }

  async findOne(id: string) {
    const auditLog = await this.prisma.auditLog.findUnique({
      where: {
        id,
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });

    if (!auditLog) {
      throw new NotFoundException(`Audit log with ID "${id}" was not found.`);
    }

    return auditLog;
  }

  private toJson(value: unknown): Prisma.InputJsonValue {
    return JSON.parse(JSON.stringify(value)) as Prisma.InputJsonValue;
  }

  private toOptionalJson(value: unknown): Prisma.InputJsonValue | undefined {
    if (value === undefined) {
      return undefined;
    }

    return this.toJson(value);
  }

  private toNullableJson(
    value: Prisma.InputJsonValue | null | undefined,
  ): Prisma.InputJsonValue | Prisma.NullableJsonNullValueInput | undefined {
    if (value === undefined) {
      return undefined;
    }

    if (value === null) {
      return Prisma.JsonNull;
    }

    return value;
  }
}
