import { IsOptional, IsString } from 'class-validator';

export class UploadMediaDto {
  @IsOptional()
  @IsString()
  altText?: string;

  @IsOptional()
  @IsString()
  caption?: string;
}
