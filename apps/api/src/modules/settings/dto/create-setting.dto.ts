import {
  IsDefined,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';

export class CreateSettingDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  @Matches(/^[a-z][a-zA-Z0-9]*(\.[a-z][a-zA-Z0-9]*)+$/, {
    message: 'Key must use dot notation, for example general.siteName',
  })
  key: string;

  @IsDefined()
  value: unknown;
}
