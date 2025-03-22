import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { WritingController } from './writing.controller';
import { WritingService } from './writing.service';

@Module({
  imports: [PrismaModule],
  providers: [WritingService, PrismaService],
  controllers: [WritingController],
})
export class WritingModule {}
