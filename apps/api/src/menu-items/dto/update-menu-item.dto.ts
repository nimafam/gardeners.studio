import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

import { ApiPropertyOptional } from '@nestjs/swagger';

import { LinkTarget, MenuItemType } from '@prisma/client';

export class UpdateMenuItemDto {
  @ApiPropertyOptional({
    example: 'About Us',
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  label?: string;

  @ApiPropertyOptional({
    example: '/about-us',
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  url?: string;

  @ApiPropertyOptional({
    enum: LinkTarget,
    example: LinkTarget.SELF,
  })
  @IsOptional()
  @IsEnum(LinkTarget)
  target?: LinkTarget;

  @ApiPropertyOptional({
    enum: MenuItemType,
    example: MenuItemType.CUSTOM_URL,
  })
  @IsOptional()
  @IsEnum(MenuItemType)
  type?: MenuItemType;

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
    nullable: true,
  })
  @IsOptional()
  @IsString()
  parentId?: string | null;

  @ApiPropertyOptional({
    example: 1,
    minimum: 0,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  sortOrder?: number;

  @ApiPropertyOptional({
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  isVisible?: boolean;
}
