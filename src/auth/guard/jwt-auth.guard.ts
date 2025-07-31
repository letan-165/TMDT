
import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '../decorator/public';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }
  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    if (err) {
      throw err;
    }

    if (!user) {
      let message = "Access token invalid";
      if (info && info.name ===  'TokenExpiredError') {
        message = "Access token expired";
      } else if (info && info.name === 'JsonWebTokenError') {
        message = "Invalid JWT token";
      }
      throw new UnauthorizedException(message);
    }
    return user;
  }
}
