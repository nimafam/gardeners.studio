import type { PaginationInput, PaginationResult } from './pagination.types';

export function getPagination(input: PaginationInput): PaginationResult {
  const page = input.page ?? 1;
  const limit = input.limit ?? 20;

  return {
    page,
    limit,
    skip: (page - 1) * limit,
  };
}

export function createPaginationMeta(
  total: number,
  pagination: PaginationResult,
) {
  return {
    total,
    page: pagination.page,
    limit: pagination.limit,
    pageCount: Math.ceil(total / pagination.limit),
  };
}
