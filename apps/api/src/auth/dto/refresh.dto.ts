import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RefreshDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(20)
  refreshToken: string;
}
