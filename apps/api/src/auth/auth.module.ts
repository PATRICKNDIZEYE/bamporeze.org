import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { GeneratorsModule } from 'src/generators/generators.module';
import { GeneratorsService } from 'src/generators/generators.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import env from 'src/utils/env';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    PrismaModule,
    GeneratorsModule,
    JwtModule.register({
      global: true,
      secret: env.ACCESS_TOKEN_SECRET,
      signOptions: {
        expiresIn: '1d',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, GeneratorsService],
})
export class AuthModule {}
