import { IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';

import { Type } from 'class-transformer';
import { PageStatus } from '@prisma/client';

export class PageQueryDto {
  @IsOptional()
  @IsString()
  q?: string;

  @IsOptional()
  @IsEnum(PageStatus)
  status?: PageStatus;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit = 10;
}
