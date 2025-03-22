import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { OfficialDto } from './dtos';
import { OfficialsService } from './officials.service';

@Controller('/officials')
export class OfficialsController {
  constructor(private officialsService: OfficialsService) { }

  @Post()
  async createOfficial(@Body() createOfficialDto: OfficialDto) {
    return await this.officialsService.createOfficial(createOfficialDto);
  }

  @Get()
  async getOfficials(
    @Query('classification') classification?: 'BOARD_MEMBER' | 'MANAGER',
  ) {
    return await this.officialsService.getOfficials(classification);
  }

  @Get(':id')
  async getOfficialById(@Param('id') id: string) {
    return await this.officialsService.getOfficialById(id);
  }

  @Delete(':id')
  async deleteOfficialById(@Param('id') id: string) {
    return await this.officialsService.deleteOfficialById(id);
  }

  @Put(':id')
  async updateOfficial(
    @Param('id') id: string,
    @Body() updateOfficialDto: Partial<OfficialDto>,
  ) {
    return await this.officialsService.updateOfficial(id, updateOfficialDto);
  }
}
