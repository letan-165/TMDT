import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Res, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Public } from './decorator/public';
import { Roles } from './decorator/roles.decorator';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  @Public()
  async register(@Body() createAuthDto: CreateAuthDto) {
    return await this.authService.handleRegister(createAuthDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @Public()
  async login(@Req() req, @Res({ passthrough: true }) res: Response) {
    const result = await this.authService.login(req.user, res);
    return result;
  }

  @Get('profile')
  @UseGuards(LocalAuthGuard)
  async getProfile(@Req() req) {
    return req.user;
  }

  @Post('google-login')
  @Public()
  async loginWithGoogle(@Body('code') code: string, @Res({ passthrough: true }) res: Response) {
    const user = await this.authService.loginWithGoogle(code, res);
    return user;
  }

  @Post('forgot-password')
  @Public()
  async forgotPassword(@Body('email') email: string) {
    return this.authService.forgotPassword(email);
  }

  @Post('check-code')
  @Public()
  async checkCodeResetPassword(@Body('email') email: string, @Body('code') code: string) {
    return this.authService.checkCodeResetPassword(email, code);
  }

  @Post('reset-password')
  @Public()
  async resetPassword(@Body('resetToken') resetToken: string, @Body('newPassword') newPassword: string) {
    return this.authService.resetPassword(resetToken, newPassword);
  }

}
