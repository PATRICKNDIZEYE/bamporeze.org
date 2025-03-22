import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { OfficialsController } from './officials.controller';
import { OfficialsService } from './officials.service';

@Module({
  imports: [PrismaModule],
  providers: [OfficialsService, PrismaService],
  controllers: [OfficialsController],
})
export class OfficialsModule {}
