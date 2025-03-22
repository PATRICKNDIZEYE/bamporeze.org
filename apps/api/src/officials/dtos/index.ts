import { IsIn, IsString, IsUrl, MinLength } from 'class-validator';

export class OfficialDto {
  @IsString()
  @MinLength(2)
  full_name: string;

  @IsString()
  role: string;

  @IsIn(['BOARD_MEMBER', 'MANAGER'])
  classification: 'BOARD_MEMBER' | 'MANAGER';

  @IsUrl()
  profile_picture: string;
}
