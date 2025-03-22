import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SeoKeywordsController } from './seo-keywords.controller';
import { SeoKeywordsService } from './seo-keywords.service';

@Module({
  providers: [SeoKeywordsService, PrismaService],
  controllers: [SeoKeywordsController]
})
export class SeoKeywordsModule { }
