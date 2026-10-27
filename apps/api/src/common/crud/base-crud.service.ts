import { NotFoundException } from '@nestjs/common';
import {
  FindFirstDelegate,
  SoftDeleteDelegate,
  FindUniqueDelegate,
} from './crud.types';

export abstract class BaseCrudService {
  protected async findActiveOrFail<TEntity extends { id: string }>(
    delegate: FindFirstDelegate<TEntity>,
    id: string,
    entityName: string,
  ): Promise<TEntity> {
    const entity = await delegate.findFirst({
      where: {
        id,
        deletedAt: null,
      },
      select: {
        id: true,
      },
    });

    if (!entity) {
      throw new NotFoundException(`${entityName} not found`);
    }

    return entity;
  }

  protected async softDelete<TEntity extends { id: string }>(
    delegate: SoftDeleteDelegate<TEntity>,
    id: string,
    entityName: string,
  ): Promise<TEntity> {
    await this.findActiveOrFail(delegate, id, entityName);

    return delegate.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  protected async restoreDeleted<TEntity extends { id: string }>(
    delegate: SoftDeleteDelegate<TEntity>,
    id: string,
    entityName: string,
  ): Promise<TEntity> {
    const entity = await delegate.findFirst({
      where: {
        id,
        deletedAt: {
          not: null,
        },
      },
      select: {
        id: true,
      },
    });

    if (!entity) {
      throw new NotFoundException(`${entityName} not found`);
    }

    return delegate.update({
      where: { id },
      data: {
        deletedAt: null,
      },
    });
  }

  protected async ensureExists(
    delegate: {
      findUnique: (args: any) => Promise<any>;
    },
    id: string | null | undefined,
    entityName: string,
  ): Promise<void> {
    if (!id) {
      return;
    }

    const entity = await delegate.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
      },
    });

    if (!entity) {
      throw new NotFoundException(`${entityName} not found`);
    }
  }
}
