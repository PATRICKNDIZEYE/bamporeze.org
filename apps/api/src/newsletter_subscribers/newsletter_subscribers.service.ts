import {
  Injectable,
  InternalServerErrorException,
  NotAcceptableException,
} from '@nestjs/common';
import { NewsletterSubscriber } from '@prisma/client';
import { ApiResponse } from 'src/@types';
import { NodemailerService } from 'src/nodemailer/nodemailer.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSubDto } from './dtos';

@Injectable()
export class NewsletterSubscribersService {
  constructor(
    private prisma: PrismaService,
    private mailer: NodemailerService,
  ) { }

  async createNewsletterSubscriber(createSubDto: CreateSubDto) {
    try {
      const subscriber = await this.prisma.newsletterSubscriber.create({
        data: {
          full_name: createSubDto.full_name,
          email: createSubDto.email,
        },
      });
      this.mailer.sendThankForSubscribing(
        subscriber.email,
        subscriber.full_name,
      );
      return new ApiResponse<NewsletterSubscriber>(
        200,
        'Subscriber created',
        subscriber
      );
    } catch (error) {
      throw new NotAcceptableException(error);
    }
  }

  async deleteNewsletterSubscribers(ids: string[]) {
    try {
      await this.prisma.newsletterSubscriber.deleteMany({
        where: {
          id: {
            in: ids,
          },
        },
      });

      return new ApiResponse<null>(200, 'Subscribers deleted', null);
    } catch (error) {
      throw new NotAcceptableException(error);
    }
  }

  async deleteSubscriber(id: string) {
    try {
      await this.prisma.newsletterSubscriber.delete({
        where: {
          id
        },
      });

      return new ApiResponse<null>(200, 'Subscriber deleted', null);
    } catch (error) {
      return new ApiResponse<null>(401, 'Something went wrong', null, error.message);
    }
  }

  async getAllNewsletterSubscribers() {
    try {
      const subscribers = await this.prisma.newsletterSubscriber.findMany();
      return new ApiResponse<NewsletterSubscriber[]>(
        200,
        'Subscribers fetched',
        subscribers,
      );
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
