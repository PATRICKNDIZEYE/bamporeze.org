import { Logger } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import { env } from 'process';

const mailer = createTransport({
  host: env.SMTP_SERVER,
  port: 465,
  secure: true,
  debug: true,
  auth: {
    user: env.SMTP_USERNAME,
    pass: env.SMTP_PASSWORD,
  },
  logger: true,

});

mailer.verify((error, success) => {
  if (error) {
    Logger.error('SMTP Connection failed', 'NodeMailerConn');
  } else if (success) {
    Logger.log('Smtp service connected', 'NodeMailerConn');
  }
});

export default mailer;