import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
} from '@nestjs/common';
import { Writing } from '@prisma/client';
import { ApiResponse } from 'src/@types';
import { CreateWritingDto } from './dtos';
import { WritingService } from './writing.service';

@Controller('/writing')
export class WritingController {
  constructor(private writingService: WritingService) { }

  @Post()
  async createWriting(
    @Body() createWritingDto: CreateWritingDto,
    @Request() req: Request,
  ): Promise<ApiResponse<Writing>> {
    return this.writingService.createWriting(
      createWritingDto,
      req['user'].id as string,
    );
  }

  @Get('blogs')
  async getBlogs(): Promise<ApiResponse<Writing[]>> {
    return this.writingService.getBlogs();
  }
  @Get('blogs/for-site')
  async getBlogsForSite(): Promise<ApiResponse<Writing[]>> {
    return this.writingService.getBlogsForSite();
  }
  @Get('blogs/random')
  async getRandomBlog(): Promise<ApiResponse<Writing>> {
    return this.writingService.getRandomBlog();
  }

  @Get('newsletter')
  async getNewsletters(): Promise<ApiResponse<Writing[]>> {
    return this.writingService.getNewsletters();
  }

  // The ones that should be displayed on the website
  @Get('released')
  async getReleased(
    @Query('writingType') writingType: 'newsletter' | 'blog',
  ): Promise<ApiResponse<Writing[]>> {
    return this.writingService.getReleased(writingType);
  }

  @Get(':id')
  async getWriting(@Param('id') id: string): Promise<ApiResponse<Writing>> {
    return this.writingService.getWriting(id);
  }

  @Get('read/:id')
  async readWriting(@Param('id') id: string): Promise<ApiResponse<null>> {
    return this.writingService.readWriting(id);
  }

  @Put('release/:id')
  async releaseWriting(@Param('id') id: string): Promise<ApiResponse<Writing>> {
    return this.writingService.releaseWriting(id);
  }

  @Put(':id')
  async updateWriting(
    @Param('id') id: string,
    @Body() updateWritingDto: Partial<CreateWritingDto>,
  ): Promise<ApiResponse<Writing>> {
    return this.writingService.updateWriting(id, updateWritingDto);
  }

  @Delete(':id')
  async deleteWriting(@Param('id') id: string): Promise<ApiResponse<Writing>> {
    return this.writingService.deleteWriting(id);
  }
}
