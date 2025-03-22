import { Module } from '@nestjs/common';
import { NodemailerModule } from 'src/nodemailer/nodemailer.module';
import { NodemailerService } from 'src/nodemailer/nodemailer.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { NewsletterSubscribersController } from './newsletter_subscribers.controller';
import { NewsletterSubscribersService } from './newsletter_subscribers.service';

@Module({
  imports: [PrismaModule, NodemailerModule],
  providers: [NewsletterSubscribersService, PrismaService, NodemailerService],
  controllers: [NewsletterSubscribersController],
})
export class NewsletterSubscribersModule {}
