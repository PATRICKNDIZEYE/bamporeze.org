import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JobApplication } from '@prisma/client';
import { ApiResponse } from 'src/@types';
import { AuthGuard } from 'src/auth/auth.guard';
import { JobApplicationDto } from './dtos';
import { JobApplicationsService } from './job-applications.service';

@Controller('/job-applications')
export class JobApplicationsController {
  constructor(private jobApplicationService: JobApplicationsService) { }
  @Post()
  async createJobApplication(
    @Body() createJobApplicationDto: JobApplicationDto,
  ): Promise<ApiResponse<JobApplication>> {
    return this.jobApplicationService.createJobApplication(
      createJobApplicationDto,
    );
  }

  @UseGuards(AuthGuard)
  @Get('job/:jobId')
  async getApplicationsByJobId(
    @Param('jobId') jobId: string,
  ): Promise<ApiResponse<JobApplication[]>> {
    return this.jobApplicationService.getApplicationsByJobId(jobId);
  }

  @Get(':applicationId')
  async getApplicationById(
    @Param('applicationId') applicationId: string,
  ): Promise<ApiResponse<JobApplication>> {
    return this.jobApplicationService.getApplicationById(applicationId);
  }

  @Delete('/batch')
  async deleteApplications(
    @Body() { applicationIds }: { applicationIds: string[] },
  ): Promise<ApiResponse<boolean>> {
    return this.jobApplicationService.deleteApplications(applicationIds);
  }
}
