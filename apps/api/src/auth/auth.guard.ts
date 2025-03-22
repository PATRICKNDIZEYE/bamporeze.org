import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import env from 'src/utils/env';

@Injectable()
export class AuthGuard implements CanActivate {
  private jwtService: JwtService;
  constructor() {
    this.jwtService = new JwtService();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    //  Non protected routes here  ( do not change )
    if (request.method == 'GET') return true;
    if (request.url.includes('login')) return true;
    if (
      request.url.includes('job-application') &&
      request.method == 'POST'
    ) return true;
    if (
      request.url.includes('newsletter_subscribers') &&
      request.method == 'POST'
    ) return true;
    if (
      request.url.includes('files/upload') &&
      request.method == 'POST'
    ) return true;
    if (
      request.url.includes('files/delete') &&
      request.method == 'DELETE'
    ) return true;
    if (
      request.url.includes('contact-us/new-message') &&
      request.method == 'POST'
    ) return true;
    if (
      request.url.includes('visits/create') &&
      request.method == 'POST'
    ) return true;

    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: env.ACCESS_TOKEN_SECRET,
      });
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
