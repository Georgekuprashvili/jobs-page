import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserSchema } from 'src/user/schema/user.schema';
import { CompanySchema } from 'src/company/schemas/company.schema';
import { IsAuthGuard } from './guards/isAuth.guard';
import { OtpSchema } from 'src/schemas/otp.schema';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule, 

    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Company', schema: CompanySchema },
      { name: 'Otp', schema: OtpSchema },
    ]),

    JwtModule.registerAsync({
      imports: [ConfigModule], 
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, IsAuthGuard],
})
export class AuthModule {}
