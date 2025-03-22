import { IsIP, IsNotEmpty, IsString } from 'class-validator';

export class CreateVisitDto {
  @IsString()
  public location: string;
}
