import { Injectable } from '@nestjs/common';
import { comparePassword } from 'utils/hashPass';
import { Response } from 'express';
import { UsersService } from '@/users/users.service';
import { JwtTokenService } from 'utils/jwt-token.service';




@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtTokenService: JwtTokenService,
  ) { }

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

  async forgotPassword(email: string) {
    return await this.userService.handleForgotPassword(email);
  }

  async checkCodeResetPassword(email: string, code: string) {
    return await this.userService.checkCodeResetPassword(email, code);
  }

  async resetPassword(resetToken: string, newPassword: string) {
    return await this.userService.resetPassword(resetToken, newPassword);
  }
  
}

