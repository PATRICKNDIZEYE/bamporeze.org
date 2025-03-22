import { Injectable } from '@nestjs/common';
import { Review } from '@prisma/client';
import { ApiResponse } from 'src/@types';
import { PrismaService } from 'src/prisma/prisma.service';
import { ReviewDto } from './dtos';

@Injectable()
export class ReviewsService {
  constructor(private prisma: PrismaService) {}

  async createReview(data: ReviewDto) {
    try {
      const review = await this.prisma.review.create({
        data,
      });

      return new ApiResponse<Review>(200, 'Review added', review);
    } catch (error) {
      return new ApiResponse<Review>(401, 'Error adding review', null, error);
    }
  }

  async getReviews() {
    try {
      const reviews = await this.prisma.review.findMany({
        orderBy: {
          createdAt: 'desc',
        },
        take: 3,
      });
      return new ApiResponse<Review[]>(200, 'Reviews retrieved', reviews);
    } catch (error) {
      return new ApiResponse<Review[]>(
        401,
        'Error fetching reviews',
        null,
        error,
      );
    }
  }

  async getReviewById(id: string) {
    try {
      const review = await this.prisma.review.findUnique({
        where: {
          id,
        },
      });
      return new ApiResponse<Review>(200, 'Review fetched', review);
    } catch (error) {
      return new ApiResponse<Review>(401, 'Error fetching review', null, error);
    }
  }

  async deleteReview(id: string) {
    try {
      const review = await this.prisma.review.delete({
        where: {
          id,
        },
      });
      return new ApiResponse<Review>(200, 'Review deleted', review);
    } catch (error) {
      return new ApiResponse<Review>(401, 'Error deleting review', null, error);
    }
  }

  async updateReview(
    id: string,
    data: Partial<Review>,
  ): Promise<ApiResponse<Review>> {
    try {
      const slider = await this.prisma.review.update({
        where: {
          id,
        },
        data,
      });
      return new ApiResponse<Review>(200, 'Review updated', slider);
    } catch (error) {
      return new ApiResponse<Review>(401, 'Error updating review', null, error);
    }
  }
}
