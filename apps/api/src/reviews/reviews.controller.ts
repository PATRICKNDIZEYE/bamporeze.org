import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Review } from '@prisma/client';
import { ApiResponse } from 'src/@types';
import { ReviewDto } from './dtos';
import { ReviewsService } from './reviews.service';

@Controller('/reviews')
export class ReviewsController {
  constructor(private reviewsService: ReviewsService) { }

  @Post()
  async createReview(
    @Body() createReviewDto: ReviewDto,
  ): Promise<ApiResponse<Review>> {
    return this.reviewsService.createReview(createReviewDto);
  }

  @Get()
  async getReviews(): Promise<ApiResponse<Review[]>> {
    return this.reviewsService.getReviews();
  }

  @Put(':id')
  async updateReview(
    @Body() updateReviewDto: Partial<ReviewDto>,
    @Param('id') id: string,
  ): Promise<ApiResponse<Review>> {
    return this.reviewsService.updateReview(id, updateReviewDto);
  }

  @Get(':id')
  async getReviewById(@Param('id') id: string): Promise<ApiResponse<Review>> {
    return this.reviewsService.getReviewById(id);
  }

  @Delete(':id')
  async deleteReview(@Param('id') id: string): Promise<ApiResponse<Review>> {
    return this.reviewsService.deleteReview(id);
  }
}
