import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { SeoKeyword } from '@prisma/client';
import { ApiResponse } from 'src/@types';
import { SeoKeywordsService } from './seo-keywords.service';
import { SeoWordDto } from './dto';

@Controller('seo-keywords')
export class SeoKeywordsController {
    constructor(private seoKeywordsService: SeoKeywordsService) { }


    @Get()
    async getSeoKeywords(): Promise<ApiResponse<SeoKeyword[]>> {
        return this.seoKeywordsService.getSeoKeywords()
    }

    @Delete(':id')
    async deleteKeyword(@Param("id") id: string): Promise<ApiResponse<SeoKeyword[]>> {
        return this.seoKeywordsService.deleteKeyword(id)
    }

    @Post('')
    async addKeyword(@Body() keyWordDto :SeoWordDto ): Promise<ApiResponse<SeoKeyword[]>> {
        return this.seoKeywordsService.addKeyword(keyWordDto)
    }
}
