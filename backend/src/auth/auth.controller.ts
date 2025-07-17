import { Response } from 'express';

import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { VerifyEmailDTO } from './dto/verify-email.dto';
import { SignInDto } from './dto/sign-in.dto';
import { IsAuthGuard } from './guards/isAuth.guard';
import { UserId } from 'src/users/decorators/user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  async signUp(@Body() dto: SignUpDto) {
    await this.authService.signUp(dto);
    return { message: 'Check email for verification code' };
  }

  @Post('verify-email')
  verifyEmail(@Body() { email, otpCode }: VerifyEmailDTO) {
    return this.authService.verifyEmail({ otpCode, email });
  }

  @Post('resend-verification-code')
  verficationCode(@Body('email') email: string) {
    return this.authService.resendOTPCode(email);
  }
  @Post('sign-in')
  async signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.signIn(signInDto);

    if (result.token) {
      res.cookie('token', result.token, {
        httpOnly: true,
        secure: false, 
        sameSite: 'lax',
        maxAge: 3600000, 
      });
      return { message: 'success' };
    }

    return result;
  }

  @Get('current-user')
  @UseGuards(IsAuthGuard)
  getCurrentUser(@UserId() userId) {
    return this.authService.getCurrentUser(userId);
  }
}
