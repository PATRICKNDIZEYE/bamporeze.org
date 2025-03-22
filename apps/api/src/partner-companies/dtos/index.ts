import { IsString } from 'class-validator';

export class PartnerCompanyDto {
  @IsString()
  company_logo: string;
  @IsString()
  company_name: string;
  @IsString()
  company_website: string;
}
