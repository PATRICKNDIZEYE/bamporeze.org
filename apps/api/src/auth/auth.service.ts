import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Admin } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { ApiResponse } from 'src/@types';
import { GeneratorsService } from 'src/generators/generators.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAdminDto, LoginDto } from './dtos';
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private generator: GeneratorsService,
    private jwtService: JwtService,
  ) {
    this.prisma = prisma;
  }

  async createAdmin(createAdminDto: CreateAdminDto) {
    const hashedPassword = await bcrypt.hash(createAdminDto.password, 10);
    const verification_code = await this.generator._generateCode();
    const admin = await this.prisma.admin.create({
      data: {
        profile_picture: null,
        name: createAdminDto.name,
        verification_code,
        email: createAdminDto.email,
        password: hashedPassword,
      },
    });

    delete admin.password;
    delete admin.verification_code;
    delete admin.refresh_token;
    return new ApiResponse<Admin>(201, 'Admin created successfully', admin);
  }

  async login(loginDto: LoginDto): Promise<ApiResponse<{ token: string, admin: Admin }>> {
    const admin = await this.prisma.admin.findUnique({
      where: {
        email: loginDto.email,
      },
    });
    if (!admin) throw new NotFoundException('Invalid credentials');
    const passwords_match = await bcrypt.compare(
      loginDto.password,
      admin.password,
    );
    if (!passwords_match)
      throw new NotAcceptableException('Invalid credentials');

    const token = await this.jwtService.sign({
      id: admin.id,
      email: admin.email,
    });
    delete admin.password;
    delete admin.verification_code;
    delete admin.refresh_token;
    return new ApiResponse<{ token: string, admin: Admin }>(
      200,
      'Admin logged in successfully',
      { token, admin },
    );
  }

  async updateRtHash(id: string, hashedRefreshToken: string) {
    await this.prisma.admin.update({
      where: {
        id: id,
      },
      data: {
        refresh_token: hashedRefreshToken,
      },
    });
  }
}
