import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class ServiceDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsUrl()
  descriptive_image: string;
}
