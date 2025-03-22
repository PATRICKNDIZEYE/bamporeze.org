import { config } from 'dotenv';
import z from 'zod';
config();

const envSchema = z.object({
  ACCESS_TOKEN_SECRET: z.string().min(10, 'Please use a long jwt secret'),
  REFRESH_TOKEN_SECRET: z.string().min(10, 'Please use a long jwt secret'),
  DATABASE_URL: z.string().url(),
  CLOUDINARY_CLOUD_NAME: z.string(),
  CLOUDINARY_API_KEY: z.string(),
  CLOUDINARY_API_SECRET: z.string(),
  SMTP_SERVER: z.string(),
  SMTP_USERNAME: z.string(),
  SMTP_PASSWORD: z.string(),
  PORT: z.string(),
  CONTACT_US_EMAIL: z.string().email(),
});

const env = envSchema.parse({ ...process.env });
export default env;
