import { IsEmail, IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class UserSignUpDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsNumber()
  age: number;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
