import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { HomepageSliderController } from './homepage-slider.controller';
import { HomepageSliderService } from './homepage-slider.service';

@Module({
  imports: [PrismaModule],
  providers: [HomepageSliderService, PrismaService],
  controllers: [HomepageSliderController],
})
export class HomepageSliderModule {}
