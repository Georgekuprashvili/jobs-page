import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateVacancyDto {
  @IsNotEmpty() @IsString() title: string;
  @IsNotEmpty() @IsString() description: string;
  @IsNotEmpty() @IsString() category: string;
  @IsNotEmpty() @IsString() location: string;
  @IsNotEmpty() @IsNumber() salary: number;
  @IsNotEmpty() @IsString() companyId: string;
}
