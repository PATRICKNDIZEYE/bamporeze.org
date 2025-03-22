import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { json, urlencoded } from 'express';
import * as morgan from 'morgan';
import { AppModule } from './app.module';
import { AuthGuard } from './auth/auth.guard';
import { NotFoundExceptionFilter } from './notfound/notfound.filter';
import { UnauthorizedExceptionFilter } from './unauthorized/unauthorized.filter';
import env from './utils/env';
const corsConfig = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  optionsSuccessStatus: 200,
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(urlencoded());
  app.use(json({ limit: '50mb' }));
  app.setGlobalPrefix('api/v1');
  app.useGlobalFilters(
    new UnauthorizedExceptionFilter(),
    new NotFoundExceptionFilter(),
  );

  const config = new DocumentBuilder()
    .addBearerAuth({
      type: 'apiKey',
      scheme: 'bearer',
    })
    .setTitle('RwandAir Catering API')
    .setDescription('RwandAir Catering API for web and dashboard')
    .setVersion('1.0')
    // .addTag('latest')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger-doc', app, document);

  app.enableCors(corsConfig);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  app.useGlobalGuards(new AuthGuard());
  app.use(morgan('dev'));
  await app.listen(env.PORT);
}
bootstrap();
