import { AuthService } from './auth.service';
import { CompanySignInDto } from './dto/company-signin.dto';
import { VerifyEmailDTO } from './dto/verify-email.dto';
import { UserSignUpDto } from './dto/sign-up.dto';
import { CompanySignupDto } from './dto/company-signup.dto';
import { UserSignInDto } from './dto/sign-in.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signUpCompany(dto: CompanySignupDto): Promise<{
        message: string;
    }>;
    signInCompany(dto: CompanySignInDto): Promise<{
        message: string;
        token?: undefined;
    } | {
        token: string;
        message?: undefined;
    }>;
    signUpUser(dto: UserSignUpDto): Promise<{
        message: string;
    }>;
    signInUser(dto: UserSignInDto): Promise<{
        message: string;
        token?: undefined;
    } | {
        token: string;
        message?: undefined;
    }>;
    verifyEmail(dto: VerifyEmailDTO): Promise<{
        token: string;
    }>;
    resendCode(email: string): Promise<{
        message: string;
    }>;
    getCurrentCompany(req: any): Promise<(import("mongoose").Document<unknown, {}, import("../company/schemas/company.schema").Company, {}> & import("../company/schemas/company.schema").Company & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
}
