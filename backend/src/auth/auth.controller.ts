import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CompanySignInDto } from './dto/company-signin.dto';

import { IsAuthGuard } from './guards/isAuth.guard';
import { VerifyEmailDTO } from './dto/verify-email.dto';
import { UserSignUpDto } from './dto/sign-up.dto';
import { CompanySignupDto } from './dto/company-signup.dto';
import { UserSignInDto } from './dto/sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('company/sign-up')
  signUpCompany(@Body() dto: CompanySignupDto) {
    return this.authService.signUpCompany(dto);
  }

  @Post('company/sign-in')
  signInCompany(@Body() dto: CompanySignInDto) {
    return this.authService.signInCompany(dto);
  }

  @Post('user/sign-up')
  signUpUser(@Body() dto: UserSignUpDto) {
    return this.authService.signUpUser(dto);
  }

  @Post('user/sign-in')
  signInUser(@Body() dto: UserSignInDto) {
    return this.authService.signInUser(dto);
  }

  @Post('verify-email')
  verifyEmail(@Body() dto: VerifyEmailDTO) {
    return this.authService.verifyEmail(dto);
  }

  @Post('resend-verification-code')
  resendCode(@Body('email') email: string) {
    return this.authService.resendOtp(email);
  }

  @UseGuards(IsAuthGuard)
  @Get('company/current')
  getCurrentCompany(@Req() req) {
    return this.authService.getCurrentCompany(req.companyId);
  }
}
