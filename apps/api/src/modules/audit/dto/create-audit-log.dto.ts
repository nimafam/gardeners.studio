import { AuditAction, Prisma } from '@prisma/client';

export interface CreateAuditLogDto {
  action: AuditAction;

  entityType: string;

  entityId?: string | null;

  before?: Prisma.InputJsonValue | null;

  after?: Prisma.InputJsonValue | null;

  metadata?: Prisma.InputJsonValue | null;

  userId?: string | null;

  ipAddress?: string | null;

  userAgent?: string | null;
}
