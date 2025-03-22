import { Injectable } from '@nestjs/common';
import { JobApplication } from '@prisma/client';
import { ApiResponse } from 'src/@types';
import { PrismaService } from 'src/prisma/prisma.service';
import { JobApplicationDto } from './dtos';

@Injectable()
export class JobApplicationsService {
  constructor(private prisma: PrismaService) { }

  async createJobApplication(data: JobApplicationDto) {
    try {
      const application = await this.prisma.jobApplication.create({
        data: {
          job: {
            connect: {
              id: data.jobId,
            },
          },
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          phone_number: data.phone_number,
          cover_letter: data.cover_letter,
          resume: data.resume,
        },
      });
      return new ApiResponse<JobApplication>(
        201,
        'Application successful',
        application,
      );
    } catch (error: any) {
      return new ApiResponse<JobApplication>(
        401,
        'An error occured',
        null,
        error,
      );
    }
  }

  async getApplicationsByJobId(
    jobId: string,
  ): Promise<ApiResponse<JobApplication[]>> {
    try {
      const applications = await this.prisma.jobApplication.findMany({
        where: {
          jobId,
        },
      });
      return new ApiResponse<JobApplication[]>(
        200,
        'Applications fetched',
        applications,
      );
    } catch (error: any) {
      return new ApiResponse<JobApplication[]>(
        500,
        'An error occured',
        null,
        error,
      );
    }
  }

  async getApplicationById(
    applicationId: string,
  ): Promise<ApiResponse<JobApplication>> {
    try {
      const application = await this.prisma.jobApplication.findUnique({
        where: {
          id: applicationId,
        },
      });
      return new ApiResponse<JobApplication>(
        200,
        'Application fetched',
        application,
      );
    } catch (error: any) {
      return new ApiResponse<JobApplication>(
        500,
        'An error occured',
        null,
        error,
      );
    }
  }

  async deleteApplications(
    applicationIds: string[],
  ): Promise<ApiResponse<boolean>> {
    try {
      const application = await this.prisma.jobApplication.deleteMany({
        where: {
          id: {
            in: applicationIds,
          },
        },
      });
      return new ApiResponse<boolean>(200, 'Applications deleted', true);
    } catch (error: any) {
      return new ApiResponse<boolean>(500, 'An error occured', null, error);
    }
  }
}
