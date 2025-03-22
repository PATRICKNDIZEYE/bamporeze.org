import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GalleryController } from './gallery.controller';
import { GalleryService } from './gallery.service';

@Module({
  providers: [GalleryService, PrismaService],
  controllers: [GalleryController]
})
export class GalleryModule { }
