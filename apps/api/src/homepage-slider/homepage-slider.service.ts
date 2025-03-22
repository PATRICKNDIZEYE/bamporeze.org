import { Injectable } from '@nestjs/common';
import { HomePageSlider } from '@prisma/client';
import { ApiResponse } from 'src/@types';
import { PrismaService } from 'src/prisma/prisma.service';
import { HomePageSliderDto } from './dto';

@Injectable()
export class HomepageSliderService {
  constructor(private prisma: PrismaService) {}

  async createHomePageSlider(data: HomePageSliderDto) {
    try {
      const slider = await this.prisma.homePageSlider.create({
        data,
      });

      return new ApiResponse<HomePageSlider>(
        200,
        'Homepage slider created',
        slider,
      );
    } catch (error) {
      return new ApiResponse<HomePageSlider>(
        401,
        'Error creating homepage slider',
        null,
        error,
      );
    }
  }

  async getSliders() {
    try {
      const sliders = await this.prisma.homePageSlider.findMany({
        orderBy: {
          createdAt: 'desc',
        },
      });
      return new ApiResponse<HomePageSlider[]>(200, 'Sliders fetched', sliders);
    } catch (error) {
      return new ApiResponse<HomePageSlider[]>(
        401,
        'Error fetching sliders',
        null,
        error,
      );
    }
  }

  async getSliderById(id: string) {
    try {
      const slider = await this.prisma.homePageSlider.findUnique({
        where: {
          id,
        },
      });
      return new ApiResponse<HomePageSlider>(200, 'Slider fetched', slider);
    } catch (error) {
      return new ApiResponse<HomePageSlider>(
        401,
        'Error fetching slider',
        null,
        error,
      );
    }
  }

  async deleteSlider(id: string) {
    try {
      const slider = await this.prisma.homePageSlider.delete({
        where: {
          id,
        },
      });
      return new ApiResponse<HomePageSlider>(200, 'Slider deleted', slider);
    } catch (error) {
      return new ApiResponse<HomePageSlider>(
        401,
        'Error deleting slider',
        null,
        error,
      );
    }
  }

  async updateSlider(
    id: string,
    data: Partial<HomePageSliderDto>,
  ): Promise<ApiResponse<HomePageSlider>> {
    try {
      const slider = await this.prisma.homePageSlider.update({
        where: {
          id,
        },
        data,
      });
      return new ApiResponse<HomePageSlider>(200, 'Slider updated', slider);
    } catch (error) {
      return new ApiResponse<HomePageSlider>(
        401,
        'Error updating slider',
        null,
        error,
      );
    }
  }
}
