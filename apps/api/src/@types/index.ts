import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
export * from './response';

export type hash = string;

export class TokenPayload {
  @IsString()
  @IsNotEmpty()
  public id: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  public email: string;
}


export interface IMainModuleAnalytics {
  visitsCount: number,
  blogReadsCount: number,
  newsletterSubsCount: number,
  openJobsCount: number
}