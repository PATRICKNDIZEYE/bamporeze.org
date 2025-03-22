import { Injectable } from '@nestjs/common';
import { Job, JobType } from '@prisma/client';
import { ApiResponse } from 'src/@types';
import { PrismaService } from 'src/prisma/prisma.service';
import { JobDto } from './dtos';

@Injectable()
export class JobsService {
  constructor(private prisma: PrismaService) { }

  async createJob(createJobDto: JobDto) {
    try {
      const job = await this.prisma.job.create({
        data: {
          type: createJobDto.type as JobType,
          ...createJobDto,
        },
      });
      return new ApiResponse<Job>(201, 'Job created', job);
    } catch (error) {
      return new ApiResponse(401, 'An error occurred', null, error.message)
    }
  }

  async getSingleJob(id: string) {
    try {
      const job = await this.prisma.job.findUnique({
        where: {
          id,
        },
        include: {
          applications: true
        }
      });
      return new ApiResponse<Job>(200, 'Job retrieved', job);
    } catch (error) {
      return new ApiResponse(401, 'An error occurred', null, error.message)
    }
  }

  async updateJob(id: string, updateJobDto: Partial<Job>) {
    try {
      const job = await this.prisma.job.update({
        where: {
          id,
        },
        data: {
          type: updateJobDto.type as JobType,
          ...updateJobDto,
        },
      });
      return new ApiResponse<Job>(201, 'Job updated', job);
    } catch (error) {
      return new ApiResponse(401, 'An error occurred', null, error.message)
    }
  }
  async deleteJob(id: string) {
    try {
      const job = await this.prisma.job.delete({
        where: {
          id,
        },
      });
      return new ApiResponse<Job>(201, 'Job deleted ', job);
    } catch (error) {
      return new ApiResponse(401, 'An error occurred', null, error.message)
    }
  }

  async getJobs(type: 'all' | 'open') {
    try {
      let jobs = await this.prisma.job.findMany({
        include: {
          applications: true
        }
      });
      if (type == 'open') jobs = jobs.filter((job) => job.isOpen == true);

      return new ApiResponse(200, 'Jobs retrieved', jobs);
    } catch (error) {
      return new ApiResponse(401, 'An error occurred', null, error.message)
    }
  }
}
