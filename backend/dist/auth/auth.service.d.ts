import { Model } from 'mongoose';
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
export declare class AuthService {
    private companyModel;
    private userModel;
    private otpModel;
    private jwtService;
    private mailerService;
    constructor(companyModel: Model<Company>, userModel: Model<User>, otpModel: Model<Otp>, jwtService: JwtService, mailerService: MailerService);
    signUpCompany(dto: CompanySignupDto): Promise<{
        message: string;
    }>;
    signUpUser(dto: UserSignUpDto): Promise<{
        message: string;
    }>;
    signInCompany(dto: CompanySignInDto): Promise<{
        message: string;
        token?: undefined;
    } | {
        token: string;
        message?: undefined;
    }>;
    signInUser(dto: UserSignInDto): Promise<{
        message: string;
        token?: undefined;
    } | {
        token: string;
        message?: undefined;
    }>;
    sendOtp(email: string): Promise<void>;
    verifyEmail(dto: VerifyEmailDTO): Promise<{
        token: string;
    }>;
    resendOtp(email: string): Promise<{
        message: string;
    }>;
    getCurrentCompany(id: string): Promise<(import("mongoose").Document<unknown, {}, Company, {}> & Company & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
}
