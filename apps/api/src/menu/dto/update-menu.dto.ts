import {
  IsBoolean,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

import { ApiPropertyOptional } from '@nestjs/swagger';

import { MenuLocation } from '@prisma/client';

export class UpdateMenuDto {
  @ApiPropertyOptional({
    example: 'Main Menu',
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  name?: string;

  @ApiPropertyOptional({
    example: 'main-menu',
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  slug?: string;

  @ApiPropertyOptional({
    example: 'Primary website navigation',
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  description?: string;

  @ApiPropertyOptional({
    enum: MenuLocation,
    example: MenuLocation.HEADER,
  })
  @IsOptional()
  @IsEnum(MenuLocation)
  location?: MenuLocation;

  @ApiPropertyOptional({
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
