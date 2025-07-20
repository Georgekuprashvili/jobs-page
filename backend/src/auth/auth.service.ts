import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';

import { Company } from 'src/company/schemas/company.schema';
import { User } from 'src/user/schema/user.schema';
import { Otp } from 'src/schemas/otp.schema';

import { CompanySignInDto } from './dto/company-signin.dto';
import { CompanySignupDto } from './dto/company-signup.dto';
import { UserSignUpDto } from './dto/sign-up.dto';
import { UserSignInDto } from './dto/sign-in.dto';
import { VerifyEmailDTO } from './dto/verify-email.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('Company') private companyModel: Model<Company>,
    @InjectModel('User') private userModel: Model<User>,
    @InjectModel('Otp') private otpModel: Model<Otp>,
    private jwtService: JwtService,
    private mailerService: MailerService,
  ) {}

  async signUpCompany(dto: CompanySignupDto) {
    const exists = await this.companyModel.findOne({ email: dto.email });
    if (exists) throw new BadRequestException('Company already exists');

    dto.password = await bcrypt.hash(dto.password, 10);
    await this.companyModel.create(dto);

    await this.sendOtp(dto.email);
    return { message: 'Company registered. Please verify email.' };
  }

  async signUpUser(dto: UserSignUpDto) {
    const exists = await this.userModel.findOne({ email: dto.email });
    if (exists) throw new BadRequestException('User already exists');

    dto.password = await bcrypt.hash(dto.password, 10);
    await this.userModel.create(dto);

    await this.sendOtp(dto.email);
    return { message: 'User registered. Please verify email.' };
  }

  async signInCompany(dto: CompanySignInDto) {
    const company = await this.companyModel
      .findOne({ email: dto.email })
      .select('+password');

    if (!company || !(await bcrypt.compare(dto.password, company.password))) {
      throw new BadRequestException('Invalid credentials');
    }

    if (!company.verified) {
      return { message: 'verify email' };
    }

    const token = this.jwtService.sign({ id: company._id, role: 'company' });
    return { token };
  }

  async signInUser(dto: UserSignInDto) {
    const user = await this.userModel
      .findOne({ email: dto.email })
      .select('+password');

    if (!user || !(await bcrypt.compare(dto.password, user.password))) {
      throw new BadRequestException('Invalid credentials');
    }

    if (!user.verified) {
      return { message: 'verify email' };
    }

    const token = this.jwtService.sign({ id: user._id, role: 'user' });
    return { token };
  }

  async sendOtp(email: string) {
    const code = Math.floor(100000 + Math.random() * 900000);

    await this.otpModel.findOneAndUpdate(
      { email },
      { code, expiresAt: new Date(Date.now() + 10 * 60 * 1000) },
      { upsert: true },
    );

    await this.mailerService.sendMail({
      to: email,
      subject: 'Your OTP Code',
      html: `<p>Your verification code is <b>${code}</b>. It will expire in 10 minutes.</p>`,
    });
  }

  async verifyEmail(dto: VerifyEmailDTO) {
    const otp = await this.otpModel.findOne({ email: dto.email });

    if (!otp || otp.code !== dto.otpCode || otp.expiresAt < new Date()) {
      throw new BadRequestException('Invalid or expired OTP code');
    }

    await this.companyModel.updateOne({ email: dto.email }, { verified: true });
    await this.userModel.updateOne({ email: dto.email }, { verified: true });

    await this.otpModel.deleteOne({ email: dto.email });

    const user = await this.userModel.findOne({ email: dto.email }).lean();
    const company = await this.companyModel
      .findOne({ email: dto.email })
      .lean();

    if (!user && !company) {
      throw new BadRequestException('Verified user or company not found');
    }

    let tokenPayload: {
      id: string;
      email: string;
      fullName: string;
      type: 'user' | 'company';
    };

    if (user) {
      tokenPayload = {
        id: user._id.toString(),
        email: user.email,
        fullName: user.fullName,
        type: 'user',
      };
    } else if (company) {
      tokenPayload = {
        id: company._id.toString(),
        email: company.email,
        fullName: company.companyName,
        type: 'company',
      };
    } else {
      throw new BadRequestException('Unexpected error');
    }

    const token = this.jwtService.sign(tokenPayload);
    return { token };
  }

  async resendOtp(email: string) {
    const user = await this.userModel.findOne({ email });
    const company = await this.companyModel.findOne({ email });

    if (!user && !company) {
      throw new NotFoundException('User not found');
    }

    await this.sendOtp(email);
    return { message: 'OTP resent' };
  }

  async getCurrentCompany(id: string) {
    return this.companyModel.findById(id);
  }
}
