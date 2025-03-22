import { IsString, IsUrl } from 'class-validator';

export class HomePageSliderDto {
  @IsUrl()
  background_image: string;

  @IsString()
  title: string;

  @IsString()
  description: string;
}
