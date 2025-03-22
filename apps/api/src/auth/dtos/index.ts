import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';

export class LoginDto {
  @IsEmail({
    allow_ip_domain: true,
  })
  public email: string;

  public password: string;
}

export class CreateAdminDto {
  @IsEmail({
    allow_ip_domain: true,
  })
  public email: string;

  @IsStrongPassword()
  public password: string;

  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  public name: string;

  profile_picture!: number | null;
}
