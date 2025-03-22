import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { Visit } from '@prisma/client';
import { ApiResponse } from 'src/@types';
import { CreateVisitDto } from './dtos';
import { VisitsService } from './visits.service';

@Controller('/visits')
export class VisitsController {
  constructor(private visitService: VisitsService) { }
  @Post('create')
  createVisit(
    @Body() createVisitDto: CreateVisitDto,
  ): Promise<ApiResponse<null>> {
    return this.visitService.createVisit(createVisitDto);
  }

  @Delete('delete/batch')
  deleteVisits(@Body() { ids }: { ids: string[] }): Promise<ApiResponse<null>> {
    return this.visitService.deleteVisits(ids);
  }
  @Get()
  getVisits(): Promise<ApiResponse<Visit[]>> {
    return this.visitService.getVisits();
  }
}
