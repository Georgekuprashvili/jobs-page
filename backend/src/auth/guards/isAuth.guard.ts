import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class IsAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    const token = this.getToken(req);

    if (!token) {
      throw new UnauthorizedException('Token not found');
    }

    try {
      const payload = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
      req['userId'] = payload.id;
      return true;
    } catch (e) {
      throw new UnauthorizedException('Token expired or invalid');
    }
  }

  private getToken(req: Request): string | null {
    if (req.cookies && req.cookies.token) {
      return req.cookies.token;
    }

    const authHeader = req.headers['authorization'];
    if (authHeader) {
      const [type, token] = authHeader.split(' ');
      if (type === 'Bearer') return token;
    }

    return null;
  }
}
