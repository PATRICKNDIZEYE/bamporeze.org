import { Injectable, NotAcceptableException } from '@nestjs/common';
import { Visit } from '@prisma/client';
import { ApiResponse } from 'src/@types';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateVisitDto } from './dtos';

@Injectable()
export class VisitsService {
  constructor(private prisma: PrismaService) { }

  async createVisit(createVisitDto: CreateVisitDto) {
    try {
      await this.prisma.visit.create({
        data: {
          location: createVisitDto.location,
        },
      });
      return new ApiResponse<null>(200, 'Visit created', null);
    } catch (error) {
      throw new NotAcceptableException(error);
    }
  }
  async getVisits() {
    try {
      const visits = await this.prisma.visit.findMany();
      return new ApiResponse<Visit[]>(200, 'Visit fetched', visits);
    } catch (error) {
      throw new NotAcceptableException(error);
    }
  }
  async deleteVisits(ids: string[]) {
    try {
      await this.prisma.visit.deleteMany({
        where: {
          id: {
            in: ids,
          },
        },
      });

      return new ApiResponse<null>(200, 'Visits deleted', null);
    } catch (error) {
      throw new NotAcceptableException(error);
    }
  }
}
