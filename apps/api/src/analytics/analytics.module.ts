import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AnalyticsController } from './analytics.controller';
import { AnalyticsService } from './analytics.service';

@Module({
  providers: [AnalyticsService, PrismaService],
  controllers: [AnalyticsController]
})
export class AnalyticsModule { }
