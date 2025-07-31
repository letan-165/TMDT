import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';

@Injectable()
export class JwtTokenService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) { }
  // Tạo jwt tokens
  async generateTokens(user: any) {
    const payload = {
      sub: user._id,
      email: user.email,
      role: user.role,
      iat: Math.floor(Date.now() / 1000)
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: this.configService.get('JWT_ACCESS_TOKEN_EXPIRES') || '15m',
    });

    const refreshToken = await this.jwtService.signAsync(payload,
      {
        expiresIn: this.configService.get('JWT_REFRESH_TOKEN_EXPIRES') || '7d',
      }
    );

    return {
      access_token: accessToken,
      refresh_token: refreshToken
    };
  }

  // Gắn token vào cookies
  setTokenCookies(res: Response, tokens: any) {
    res.cookie('access_token', tokens.access_token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: this.parseTimeToMs(this.configService.get<string>('JWT_ACCESS_TOKEN_EXPIRES')!) || 15 * 60 * 1000 // 15 minutes
    });

    res.cookie('refresh_token', tokens.refresh_token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: this.parseTimeToMs(this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRES')!) || 7 * 24 * 60 * 60 * 1000 // 7 days
    });
  }
  // Chuyển đổi ký hiệu với thời gian tương ứng
  private parseTimeToMs(timeStr: string): number {
    const units = {
      's': 1000,
      'm': 60 * 1000,
      'h': 60 * 60 * 1000,
      'd': 24 * 60 * 60 * 1000,
    };

    const match = timeStr.match(/^(\d+)([smhd])$/);
    if (!match) {
      throw new Error(`Invalid time format: ${timeStr}`);
    }

    const [, value, unit] = match;
    return parseInt(value) * units[unit];
  }

  // Tạo phản hồi đăng nhập thành công
  async login(user: any, res: Response) {
    const tokens = await this.generateTokens(user);
    // Gắn token vào cookies
    if (res) {
      this.setTokenCookies(res, tokens);
    }
    return {
      success: true,
      message: 'Login successful',
    };
  }
}
