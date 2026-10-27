import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Min,
  IsBooleanString,
} from 'class-validator';

import { Type } from 'class-transformer';
import { MenuLocation } from '@prisma/client';

export class MenuQueryDto {
  @IsOptional()
  @IsString()
  q?: string;

  @IsOptional()
  @IsEnum(MenuLocation)
  location?: MenuLocation;

  @IsOptional()
  @IsBooleanString()
  isActive?: string;

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
