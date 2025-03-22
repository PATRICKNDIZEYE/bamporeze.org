import { Injectable } from '@nestjs/common';
import { readFile } from 'fs';
import mailer from 'src/utils/nodemailer';
@Injectable()
export class NodemailerService {
  public contactInfo = {
    website_link: 'http://localhost:3000',
    whatsapp_link: '+250788927469',
    phone_link: '+250788927469',
    email_link: 'info@hcakigali.rw',
  };

  async sendThankForSubscribing(email: string, name: string) {
    return mailer.sendMail({
      from: this.contactInfo.email_link,
      to: email,
      subject: 'Thanks for subscribing to our newsletter',
      html: await this.makeThanksForSubscribing(name),
    });
  }

  private makeThanksForSubscribing(name: string) {
    return new Promise<string>((resolve, reject) => {
      readFile(
        './templates/thanks_for_sub.template.html',
        'utf-8',
        (err, data) => {
          if (err) {
            return reject(err);
          }
          const newString = data
            .replace('{{name}}', name)
            .replace('{{website_link}}', this.contactInfo.website_link)
            .replace('{{phone_link}}', this.contactInfo.phone_link)
            .replace('{{whatsapp_link}}', this.contactInfo.whatsapp_link)
            .replace('{{email_link}}', this.contactInfo.email_link);
          resolve(newString);
        },
      );
    });
  }
}
