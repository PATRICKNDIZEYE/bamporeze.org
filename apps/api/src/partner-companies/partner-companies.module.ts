import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { PartnerCompaniesController } from './partner-companies.controller';
import { PartnerCompaniesService } from './partner-companies.service';

@Module({
  imports: [PrismaModule],
  providers: [PartnerCompaniesService, PrismaService],
  controllers: [PartnerCompaniesController],
})
export class PartnerCompaniesModule {}
