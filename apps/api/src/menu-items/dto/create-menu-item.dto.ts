import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { LinkTarget, MenuItemType } from '@prisma/client';

export class CreateMenuItemDto {
  @ApiProperty({
    example: 'Home',
  })
  @IsString()
  @MaxLength(100)
  label: string;

  @ApiPropertyOptional({
    example: '/',
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  url?: string;

  @ApiPropertyOptional({
    enum: LinkTarget,
    default: LinkTarget.SELF,
  })
  @IsOptional()
  @IsEnum(LinkTarget)
  target?: LinkTarget;

  @ApiPropertyOptional({
    enum: MenuItemType,
    default: MenuItemType.CUSTOM_URL,
  })
  @IsOptional()
  @IsEnum(MenuItemType)
  type?: MenuItemType = MenuItemType.CUSTOM_URL;

  @ApiPropertyOptional({
    example: 'POST',
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  referenceType?: string;

  @ApiPropertyOptional({
    example: 'cmel6j6o70000abc123xyz',
  })
  @IsOptional()
  @IsString()
  referenceId?: string;

  @ApiPropertyOptional({
    example: 'cmel6j6o70000parent123',
  })
  @IsOptional()
  @IsString()
  parentId?: string;

  @ApiPropertyOptional({
    default: 0,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  sortOrder?: number;

  @ApiPropertyOptional({
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  isVisible?: boolean;
}
