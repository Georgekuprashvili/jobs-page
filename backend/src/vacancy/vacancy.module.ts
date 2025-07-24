import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VacancyController } from './vacancy.controller';
import { VacancyService } from './vacancy.service';
import { VacancySchema } from './schemas/vacancy.schema';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Vacancy', schema: VacancySchema }]),
    AuthModule,
  ],
  controllers: [VacancyController],
  providers: [VacancyService],
})
export class VacancyModule {}
