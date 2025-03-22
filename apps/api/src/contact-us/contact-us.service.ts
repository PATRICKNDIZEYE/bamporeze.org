import { Injectable } from '@nestjs/common';
import { ApiResponse } from 'src/@types';
import env from 'src/utils/env';
import mailer from 'src/utils/nodemailer';
import { NewMessageDto } from './dtos';

@Injectable()
export class ContactUsService {

    async newMessage(data: NewMessageDto) {
        try {
            // Send email
            await mailer.sendMail({
                from: `${data.name} <${data.email}>`,
                to: env.CONTACT_US_EMAIL,
                subject: ` ${data.name} - New Message from  hcakigali Contact Us Form`,
                text: `Name: ${data.name}\nEmail: ${data.email}\nMessage: ${data.message}`
            });

            return new ApiResponse(200, 'Message sent successfully!', null)

        } catch (error) {
            return new ApiResponse(401, 'Failed to send message', null, error.message)
        }
    }
}
