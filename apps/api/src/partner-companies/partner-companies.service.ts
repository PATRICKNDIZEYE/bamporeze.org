import { Injectable, NotFoundException } from '@nestjs/common';
import { PartnerCompany } from '@prisma/client';
import { ApiResponse } from 'src/@types';
import { PrismaService } from 'src/prisma/prisma.service';
import { PartnerCompanyDto } from './dtos';

@Injectable()
export class PartnerCompaniesService {
  constructor(private prisma: PrismaService) {}

  async createPartnerCompany(data: PartnerCompanyDto) {
    try {
      const company = await this.prisma.partnerCompany.create({
        data,
      });

      return new ApiResponse<PartnerCompany>(
        201,
        'Partner company created successfully',
        company,
      );
    } catch (error) {
      return new ApiResponse<PartnerCompany>(
        401,
        'Error creating partner company',
        null,
        error.message,
      );
    }
  }

  async updatePartnerCompany(id: string, data: Partial<PartnerCompanyDto>) {
    try {
      const company = await this.prisma.partnerCompany.update({
        where: {
          id,
        },
        data,
      });

      return new ApiResponse<PartnerCompany>(
        201,
        'Partner company updated',
        company,
      );
    } catch (error) {
      return new ApiResponse<PartnerCompany>(
        401,
        'Error updating partner company',
        null,
        error.message,
      );
    }
  }
  async getPartnerCompanyById(id: string) {
    try {
      const company = await this.prisma.partnerCompany.findUnique({
        where: {
          id,
        },
      });

      if (!company) throw new NotFoundException('Partner company not found');
      return new ApiResponse<PartnerCompany>(
        201,
        'Partner company retrieved successfully',
        company,
      );
    } catch (error) {
      return new ApiResponse<PartnerCompany>(
        401,
        'Error retrieving partner company',
        null,
        error.message,
      );
    }
  }

  async deletePartnerCompany(id: string) {
    try {
      const company = await this.prisma.partnerCompany.delete({
        where: {
          id,
        },
      });

      return new ApiResponse<PartnerCompany>(
        201,
        'Partner company deleted successfully',
        company,
      );
    } catch (error) {
      return new ApiResponse<PartnerCompany>(
        401,
        'Error deleting partner company',
        null,
        error.message,
      );
    }
  }

  async getPartnerCompanies() {
    try {
      const companies = await this.prisma.partnerCompany.findMany();

      return new ApiResponse<PartnerCompany[]>(
        200,
        'Partner companies retrieved successfully',
        companies,
      );
    } catch (error) {
      return new ApiResponse<PartnerCompany[]>(
        401,
        'Error fetching partner companies',
        null,
        error.message,
      );
    }
  }
}
