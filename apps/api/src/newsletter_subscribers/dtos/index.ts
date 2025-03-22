import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateSubDto {
  @IsString()
  @MinLength(3)
  public full_name: string;

  @IsEmail()
  public email: string;
}
