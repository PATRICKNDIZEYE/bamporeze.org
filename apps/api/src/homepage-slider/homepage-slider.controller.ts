import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { HomePageSliderDto } from './dto';
import { HomepageSliderService } from './homepage-slider.service';

@Controller('/homepage-sliders')
export class HomepageSliderController {
  constructor(private homepageSliderService: HomepageSliderService) { }
  @Post()
  async createHomePageSlider(@Body() createSliderDto: HomePageSliderDto) {
    return this.homepageSliderService.createHomePageSlider(createSliderDto);
  }

  @Get()
  async getSliders() {
    return this.homepageSliderService.getSliders();
  }

  @Get(':id')
  async getSliderById(@Param('id') id: string) {
    return this.homepageSliderService.getSliderById(id);
  }

  @Delete(':id')
  async deleteSlider(@Param('id') id: string) {
    return this.homepageSliderService.deleteSlider(id);
  }

  @Put(':id')
  async updateSlider(
    @Body() updateSliderDto: Partial<HomePageSliderDto>,
    @Param('id') id: string,
  ) {
    return this.homepageSliderService.updateSlider(id, updateSliderDto);
  }
}
