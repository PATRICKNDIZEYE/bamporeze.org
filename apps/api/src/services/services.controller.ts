import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Service } from '@prisma/client';
import { ApiResponse } from 'src/@types';
import { ServiceDto } from './dtos';
import { ServicesService } from './services.service';

@Controller('/services')
export class ServicesController {
  constructor(private servicesService: ServicesService) { }

  @Post()
  async createService(
    @Body() createServiceDto: ServiceDto,
  ): Promise<ApiResponse<Service>> {
    return this.servicesService.createService(createServiceDto);
  }

  @Get()
  async getServices() {
    return this.servicesService.getServices();
  }

  @Get(':id')
  async getServiceById(@Param('id') id: string): Promise<ApiResponse<Service>> {
    return this.servicesService.getServiceById(id);
  }

  @Put(':id')
  async updateService(
    @Param('id') id: string,
    @Body() updateServiceDto: Partial<ServiceDto>,
  ): Promise<ApiResponse<Service>> {
    return this.servicesService.updateService(id, updateServiceDto);
  }

  @Delete(':id')
  async deleteServiceById(
    @Param('id') id: string,
  ): Promise<ApiResponse<boolean>> {
    return this.servicesService.deleteService(id);
  }
}
