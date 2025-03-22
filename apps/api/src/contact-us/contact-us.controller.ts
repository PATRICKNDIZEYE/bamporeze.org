import { Body, Controller, Post } from '@nestjs/common';
import { ContactUsService } from './contact-us.service';
import { NewMessageDto } from './dtos';

@Controller('/contact-us')
export class ContactUsController {
    constructor(private contactUsService: ContactUsService) { }


    @Post('new-message')
    async newMessage(@Body() data: NewMessageDto) {
        return await this.contactUsService.newMessage(data);
    }
}
