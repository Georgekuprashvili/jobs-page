import {
  IsString,
  IsNotEmpty,
  IsEmail,
  MinLength,
  IsNumberString,
} from 'class-validator';

export class CompanySignupDto {
  @IsString()
  @IsNotEmpty()
  companyName: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;

  @IsNumberString()
  @IsNotEmpty()
  phoneNumber: string;
}
