import { IsBoolean, IsIn, IsString } from 'class-validator';

export class JobDto {
  @IsString()
  title: string;

  @IsIn(['UNDERGRADUATE', 'POSTGRADUATE', 'DOCTORATE'])
  type: 'UNDERGRADUATE' | 'POSTGRADUATE' | 'DOCTORATE';

  @IsString()
  location: string;

  @IsBoolean()
  isOpen: boolean;

  @IsString()
  description: string;
}
