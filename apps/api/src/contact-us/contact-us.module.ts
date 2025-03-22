import { Module } from '@nestjs/common';
import { ContactUsService } from './contact-us.service';
import { ContactUsController } from './contact-us.controller';

@Module({
  providers: [ContactUsService],
  controllers: [ContactUsController]
})
export class ContactUsModule {}
