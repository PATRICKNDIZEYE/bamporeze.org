import { Injectable } from '@nestjs/common';
import { ApiResponse } from 'src/@types';
import { PrismaService } from 'src/prisma/prisma.service';
import { SeoWordDto } from './dto';

@Injectable()
export class SeoKeywordsService {
    constructor(private prisma: PrismaService) { }

    async getSeoKeywords() {
        try {
            const keywords = await this.prisma.seoKeyword.findMany({})
            return new ApiResponse(200, 'Keywords fetched', keywords)
        } catch (error) {
            return new ApiResponse(401, 'Somewhat isn\'t cool', null, error.message)
        }
    }


    async deleteKeyword(id: string) {
        try {
            const keyword = await this.prisma.seoKeyword.delete({ where: { id } })
            return new ApiResponse(200, 'Keyword deleted', keyword)

        } catch (error) {
            return new ApiResponse(401, 'Somewhat isn\'t cool', null, error.message)

        }
    }
    async addKeyword(keyWordDto: SeoWordDto) {
        try {
            const keyword = await this.prisma.seoKeyword.create({ data: { word: keyWordDto.word } })
            return new ApiResponse(201, 'Keyword added', keyword)

        } catch (error) {
            return new ApiResponse(401, 'Somewhat isn\'t cool', null, error.message)

        }
    }
}
