import { Injectable, UnauthorizedException } from '@nestjs/common';
import { comparePassword } from 'utils/hashPass';
import { Response } from 'express';
import { UsersService } from '@/users/users.service';
import { JwtTokenService } from 'utils/jwt-token.service';
import { ConfigService } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';




@Injectable()
export class AuthService {
  private googleClient: OAuth2Client;
  constructor(
    private userService: UsersService,
    private configService: ConfigService,
    private jwtTokenService: JwtTokenService,
  ) {
    this.googleClient = new OAuth2Client(this.configService.get<string>('GOOGLE_CLIENT_ID'));
  }
  async validateUser(username: string, password: string) {
    const user = await this.userService.findOneByUsername(username);
    if (!user) {
      return null;
    }
    const checkPass = await comparePassword(password, user.password!);
    if (!checkPass) {
      return null;
    }
    return user;
  }

  async handleRegister(createAuthDto: any) {
    return await this.userService.register(createAuthDto);
  }


  async login(user: any, res: Response) {
    try {
      if (!user) {
        throw new Error('User not found');
      }
      const token = await this.jwtTokenService.login(user, res);
      return token;
    } catch (error) {
      throw new Error('Error occurred while logging in');
    }
  }

  async loginWithGoogle(code: string, res: Response) {
    try {
      if (!code) {
        throw new UnauthorizedException('Google authorization code is required');
      }
      const userData = await this.verifyGoogleCode(code);

      if (!userData) {
        throw new UnauthorizedException('Invalid Google login');
      }
      const user = await this.userService.processGoogleLogin(userData);
      if (!user) {
        throw new UnauthorizedException('User not found or not registered');
      }
      const tokens = await this.jwtTokenService.login(user, res);
      return tokens;
    } catch (error) {
      console.error('Error during Google login:', error);
      throw new Error('Error occurred while logging in with Google');
    }
  }

  async forgotPassword(email: string) {
    return await this.userService.handleForgotPassword(email);
  }

  async checkCodeResetPassword(email: string, code: string) {
    return await this.userService.checkCodeResetPassword(email, code);
  }

  async resetPassword(resetToken: string, newPassword: string) {
    return await this.userService.resetPassword(resetToken, newPassword);
  }

  async verifyGoogleCode(code: string) {
    try {
      const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: this.configService.get('GOOGLE_CLIENT_ID')!,
          client_secret: this.configService.get('GOOGLE_CLIENT_SECRET')!,
          code: code,
          grant_type: 'authorization_code',
          redirect_uri: 'postmessage',
        }).toString(),
      });

      if (!tokenResponse.ok) {
        const error = await tokenResponse.text();
        throw new UnauthorizedException(error || 'Failed to exchange authorization code');
      }
      const tokens = await tokenResponse.json();
      return await this.verifyGoogleToken(tokens.id_token);
    } catch (error) {
      throw new UnauthorizedException('Google authorization code verification failed');
    }
  }

  async verifyGoogleToken(idToken: string) {
    try {
      if (!idToken) {
        throw new UnauthorizedException('ID Token is required');
      }
      const tokenParts = idToken.split('.');
      if (tokenParts.length !== 3) {
        throw new UnauthorizedException(`Invalid token format. Expected 3 segments, got ${tokenParts.length}`);
      }

      const ticket = await this.googleClient.verifyIdToken({
        idToken,
        audience: this.configService.get('GOOGLE_CLIENT_ID'),
      });

      const payload = ticket.getPayload();

      if (!payload || !payload.email_verified) {
        throw new UnauthorizedException('Invalid or unverified Google token');
      }

      return {
        email: payload.email,
        name: payload.name,
        picture: payload.picture,
        googleId: payload.sub,
        provider: 'GOOGLE',
      };
    } catch (error) {
      throw new UnauthorizedException('Google token verification failed');
    }
  }
}

