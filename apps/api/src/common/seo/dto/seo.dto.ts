import {
  IsBoolean,
  IsJSON,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';

export class SeoDto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  seoTitle?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  seoDescription?: string;

  @IsOptional()
  @IsUrl()
  @MaxLength(500)
  seoCanonicalUrl?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  seoOgTitle?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  seoOgDescription?: string;

  @IsOptional()
  @IsString()
  seoOgImageId?: string;

  @IsOptional()
  @IsBoolean()
  seoNoIndex?: boolean;

  @IsOptional()
  @IsBoolean()
  seoNoFollow?: boolean;

  @IsOptional()
  @IsJSON()
  seoStructuredData?: any;
}
