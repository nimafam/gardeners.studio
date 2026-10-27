import { IsIn, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

import { Type } from 'class-transformer';
import { ContentStatus } from '@prisma/client';

export class ProjectQueryDto {
  @IsOptional()
  @IsString()
  q?: string;

  @IsOptional()
  status?: ContentStatus;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit = 10;
}
