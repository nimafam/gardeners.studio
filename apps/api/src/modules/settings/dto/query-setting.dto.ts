import { IsOptional, IsString, MaxLength } from 'class-validator';

import { PaginationQueryDto } from 'src/common/pagination';

export class SettingQueryDto extends PaginationQueryDto {
  @IsOptional()
  @IsString()
  @MaxLength(150)
  q?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  namespace?: string;
}
