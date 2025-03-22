import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { GalleryPhoto } from '@prisma/client';
import { ApiResponse } from 'src/@types';
import { GalleryDto } from './gallery.dto';
import { GalleryService } from './gallery.service';

@Controller('gallery')
export class GalleryController {
    constructor(private galleryService: GalleryService) { }


    @Post()
    addPhoto(@Body() galleryDto: GalleryDto): Promise<ApiResponse<GalleryPhoto>> {
        return this.galleryService.createPhoto(galleryDto)
    }

    @Get()
    getPhotos(): Promise<ApiResponse<GalleryPhoto[]>> {
        return this.galleryService.getGallery()
    }

    @Delete(":id")
    deletePhoto(@Param("id") id: string) {
        return this.galleryService.deleteGallery(id)
    }


    @Put(":id")
    updatePhotos(@Param("id") id: string, @Body() updateDto: Partial<GalleryDto>) {
        return this.galleryService.updatePhoto(id, updateDto)
    }


}
