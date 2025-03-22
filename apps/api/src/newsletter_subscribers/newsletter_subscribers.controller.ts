import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { NewsletterSubscriber } from '@prisma/client';
import { ApiResponse } from 'src/@types';
import { CreateSubDto } from './dtos';
import { NewsletterSubscribersService } from './newsletter_subscribers.service';

@Controller('/newsletter_subscribers')
export class NewsletterSubscribersController {
  constructor(
    private newsletterSubscribersService: NewsletterSubscribersService,
  ) { }

  @Get()
  getAllNewsletterSubscribers(): Promise<ApiResponse<NewsletterSubscriber[]>> {
    return this.newsletterSubscribersService.getAllNewsletterSubscribers();
  }

  @Post()
  createNewsletterSubscriber(
    @Body() createSubDto: CreateSubDto,
  ): Promise<ApiResponse<NewsletterSubscriber>> {
    return this.newsletterSubscribersService.createNewsletterSubscriber(
      createSubDto,
    );
  }

  @Delete('delete/batch')
  deleteNewsletterSubscribers(
    @Body() ids: string[],
  ): Promise<ApiResponse<null>> {
    return this.newsletterSubscribersService.deleteNewsletterSubscribers(ids);
  }
  @Delete(':id')
  deleteSubscriber(
    @Param('id') id: string,
  ): Promise<ApiResponse<null>> {
    return this.newsletterSubscribersService.deleteSubscriber(id);
  }
}
