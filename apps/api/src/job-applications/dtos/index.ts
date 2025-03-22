import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsUUID,
  IsUrl,
  MinLength,
} from 'class-validator';

export class JobApplicationDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsUUID()
  @IsNotEmpty()
  jobId: string;

  @IsString()
  @MinLength(2)
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @MinLength(2)
  @IsNotEmpty()
  last_name: string;

  @IsNotEmpty()
  @IsString()
  phone_number: string;

  @IsString()
  @IsNotEmpty()
  cover_letter: string;

  @IsString()
  @IsUrl()
  resume: string;
}
