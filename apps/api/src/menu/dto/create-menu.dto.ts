import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { MenuLocation } from '@prisma/client';

export class CreateMenuDto {
  @ApiProperty({
    example: 'Main Menu',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

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

  @ApiProperty({
    enum: MenuLocation,
    example: MenuLocation.HEADER,
  })
  @IsEnum(MenuLocation)
  location: MenuLocation;

  @ApiPropertyOptional({
    default: true,
  })
  @IsOptional()
  isActive?: boolean = true;
}
