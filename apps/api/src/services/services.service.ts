import { Injectable } from '@nestjs/common';
import { Service } from '@prisma/client';
import { ApiResponse } from 'src/@types';
import { PrismaService } from 'src/prisma/prisma.service';
import { ServiceDto } from './dtos';

@Injectable()
export class ServicesService {
  constructor(private prisma: PrismaService) {}

  async createService(data: ServiceDto) {
    try {
      const service = await this.prisma.service.create({
        data,
      });
      return new ApiResponse<Service>(201, 'Service added', service);
    } catch (error) {
      return new ApiResponse<Service>(
        201,
        'An error occured',
        null,
        error.message,
      );
    }
  }

  async updateService(id: string, data: Partial<ServiceDto>) {
    try {
      const service = await this.prisma.service.update({
        where: {
          id,
        },
        data,
      });
      return new ApiResponse<Service>(200, 'Service updated', service);
    } catch (error) {
      return new ApiResponse<Service>(
        201,
        'An error occured',
        null,
        error.message,
      );
    }
  }

  async deleteService(id: string) {
    try {
      const service = await this.prisma.service.delete({
        where: {
          id,
        },
      });
      return new ApiResponse<boolean>(200, 'Service deleted', true);
    } catch (error) {
      return new ApiResponse<boolean>(
        201,
        'An error occured',
        false,
        error.message,
      );
    }
  }

  async getServices() {
    try {
      const services = await this.prisma.service.findMany();
      return new ApiResponse<Service[]>(200, 'Services fetched', services);
    } catch (error) {
      return new ApiResponse<Service>(
        201,
        'An error occured',
        null,
        error.message,
      );
    }
  }

  async getServiceById(id: string) {
    try {
      const service = await this.prisma.service.findUnique({
        where: {
          id,
        },
      });
      return new ApiResponse<Service>(200, 'Service fetched', service);
    } catch (error) {
      return new ApiResponse<Service>(
        201,
        'An error occured',
        null,
        error.message,
      );
    }
  }
}
