import { Injectable } from '@nestjs/common';
import { Official, OfficialClassification } from '@prisma/client';
import { ApiResponse } from 'src/@types';
import { PrismaService } from 'src/prisma/prisma.service';
import { OfficialDto } from './dtos';

@Injectable()
export class OfficialsService {
  constructor(private prisma: PrismaService) {}

  async createOfficial(data: OfficialDto) {
    try {
      const official = await this.prisma.official.create({
        data: {
          classification: data.classification as OfficialClassification,
          ...data,
        },
      });
      return new ApiResponse<Official>(201, 'Official added', official);
    } catch (error) {
      return new ApiResponse<Official>(
        401,
        'Error adding official',
        null,
        error,
      );
    }
  }

  async getOfficials(classification?: 'BOARD_MEMBER' | 'MANAGER') {
    try {
      let officials = await this.prisma.official.findMany();
      if (classification)
        officials = officials.filter(
          (official) =>
            official.classification ===
            (classification as OfficialClassification),
        );
      return new ApiResponse<Official[]>(200, 'Officials retrieved', officials);
    } catch (error) {
      return new ApiResponse<Official[]>(
        401,
        'Error fetching officials',
        null,
        error,
      );
    }
  }

  async getOfficialById(id: string) {
    try {
      const official = await this.prisma.official.findUnique({
        where: {
          id,
        },
      });
      return new ApiResponse<Official>(200, 'Official fetched', official);
    } catch (error) {
      return new ApiResponse<Official>(
        401,
        'Error fetching official',
        null,
        error,
      );
    }
  }

  async deleteOfficialById(id: string) {
    try {
      const official = await this.prisma.official.delete({
        where: {
          id,
        },
      });
      return new ApiResponse<Official>(200, 'Official deleted', official);
    } catch (error) {
      return new ApiResponse<Official>(
        401,
        'Error deleting official',
        null,
        error,
      );
    }
  }

  async updateOfficial(id: string, data: Partial<OfficialDto>) {
    try {
      const official = await this.prisma.official.update({
        where: {
          id,
        },
        data,
      });
      return new ApiResponse<Official>(200, 'Official updated', official);
    } catch (error) {
      return new ApiResponse<Official>(
        401,
        'Error updating official',
        null,
        error,
      );
    }
  }
}
