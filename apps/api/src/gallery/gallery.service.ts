import { Injectable } from '@nestjs/common';
import { ApiResponse } from 'src/@types';
import { PrismaService } from 'src/prisma/prisma.service';
import { GalleryDto } from './gallery.dto';

@Injectable()
export class GalleryService {
    constructor(private prisma: PrismaService) { }

    async getGallery() {
        try {
            const gallery = await this.prisma.galleryPhoto.findMany()
            return new ApiResponse(200, 'Gallery fetched', gallery)
        } catch (error) {

            return new ApiResponse(401, 'Something went wrong', null, error.message)
        }
    }


    async createPhoto(data: GalleryDto) {
        try {
            const photo = await this.prisma.galleryPhoto.create({
                data
            })
            return new ApiResponse(201, 'Photo added', photo)
        } catch (error) {

            return new ApiResponse(401, 'Something went wrong', null, error.message)
        }
    }

    async deleteGallery(id: string) {
        try {
            const photo = await this.prisma.galleryPhoto.delete({
                where: {
                    id
                }
            })
            return new ApiResponse(200, 'Photo deleted', photo)
        } catch (error) {

            return new ApiResponse(401, 'Something went wrong', null, error.message)
        }
    }
    async updatePhoto(id: string, updateDto: Partial<GalleryDto>) {
        try {
            const photo = await this.prisma.galleryPhoto.update({
                where: {
                    id
                },
                data: {
                    description: updateDto.description,
                    image: updateDto.image,
                    title: updateDto.title
                }

            })
            return new ApiResponse(200, 'Photo deleted', photo)
        } catch (error) {

            return new ApiResponse(401, 'Something went wrong', null, error.message)
        }
    }


}
