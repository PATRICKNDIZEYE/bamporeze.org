import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { JobApplicationsController } from './job-applications.controller';
import { JobApplicationsService } from './job-applications.service';

@Module({
  imports: [PrismaModule],
  providers: [JobApplicationsService, PrismaService],
  controllers: [JobApplicationsController],
})
export class JobApplicationsModule {}
