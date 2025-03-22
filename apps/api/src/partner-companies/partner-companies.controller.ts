import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PartnerCompany } from '@prisma/client';
import { ApiResponse } from 'src/@types';
import { PartnerCompanyDto } from './dtos';
import { PartnerCompaniesService } from './partner-companies.service';

@Controller('/partner-companies')
export class PartnerCompaniesController {
  constructor(private partnerCompaniesService: PartnerCompaniesService) { }

  @Post()
  async createPartnerCompany(
    @Body() createPartnerCompanyDto: PartnerCompanyDto,
  ): Promise<ApiResponse<PartnerCompany>> {
    return this.partnerCompaniesService.createPartnerCompany(
      createPartnerCompanyDto,
    );
  }

  @Put(':id')
  async updatePartnerCompany(
    @Param('id') id: string,
    @Body() updatePartnerCompanyDto: Partial<PartnerCompanyDto>,
  ): Promise<ApiResponse<PartnerCompany>> {
    return this.partnerCompaniesService.updatePartnerCompany(
      id,
      updatePartnerCompanyDto,
    );
  }

  @Get()
  async getPartnerCompanies(): Promise<ApiResponse<PartnerCompany[]>> {
    return this.partnerCompaniesService.getPartnerCompanies();
  }

  @Get(':id')
  async getPartnerCompanyById(
    @Param('id') id: string,
  ): Promise<ApiResponse<PartnerCompany>> {
    return this.partnerCompaniesService.getPartnerCompanyById(id);
  }

  @Delete(':id')
  async deletePartnerCompany(
    @Param('id') id: string,
  ): Promise<ApiResponse<PartnerCompany>> {
    return this.partnerCompaniesService.deletePartnerCompany(id);
  }
}
