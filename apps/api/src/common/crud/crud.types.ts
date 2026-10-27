export type FindFirstDelegate<TEntity> = {
  findFirst(args: {
    where: Record<string, unknown>;
    select?: Record<string, boolean>;
  }): Promise<TEntity | null>;
};

export type UpdateDelegate<TEntity> = {
  update(args: {
    where: Record<string, unknown>;
    data: Record<string, unknown>;
  }): Promise<TEntity>;
};

export type FindUniqueDelegate<TEntity> = {
  findUnique(args: {
    where: Record<string, unknown>;
    select?: Record<string, boolean>;
  }): Promise<TEntity | null>;
};

export type SoftDeleteDelegate<TEntity> = FindFirstDelegate<TEntity> &
  UpdateDelegate<TEntity>;
