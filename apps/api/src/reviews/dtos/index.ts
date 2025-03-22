import { IsString, IsUrl, MaxLength, MinLength } from 'class-validator';

export class ReviewDto {
  @IsString()
  reviewer_company: string;

  @IsString()
  @MinLength(2)
  reviewer_name: string;

  @IsUrl()
  reviewer_image: string;

  @IsString()
  @MaxLength(500)
  review_message: string;
}
