import { IsBoolean, IsDate, IsIn, IsString, IsUrl } from 'class-validator';

export class CreateWritingDto {
  @IsUrl()
  thumbnail_image: string;

  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsString()
  @IsIn(['NEWSLETTER', 'BLOG'])
  writingType: string;

  @IsString()
  description: string;

  @IsBoolean()
  isReleased: boolean;
}
