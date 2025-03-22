import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Job } from '@prisma/client';
import { ApiResponse } from 'src/@types';
import { JobDto } from './dtos';
import { JobsService } from './jobs.service';

@Controller('/jobs')
export class JobsController {
  constructor(private jobService: JobsService) { }

  @Post()
  async createJob(@Body() createJobDto: JobDto): Promise<ApiResponse<Job>> {
    return this.jobService.createJob(createJobDto);
  }

  @Put(':id')
  async updateJob(
    @Param('id') id: string,
    @Body() updateJobDto: Partial<JobDto>,
  ) {
    return this.jobService.updateJob(id, updateJobDto);
  }

  @Get(':id')
  async getSingleJob(
    @Param('id') id: string,
  ) {
    return this.jobService.getSingleJob(id);
  }

  @Delete(':id')
  async deleteJob(@Param('id') id: string) {
    return this.jobService.deleteJob(id);
  }

  @Get()
  async getJobs(
    @Query('type') type: 'all' | 'open',
  ): Promise<ApiResponse<Job[]>> {
    return this.jobService.getJobs(type);
  }
}
