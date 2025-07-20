import { IsNotEmpty, IsString } from 'class-validator';

export class CreateApplicationDto {
  @IsNotEmpty() @IsString() userId: string;
  @IsNotEmpty() @IsString() vacancyId: string;
  @IsNotEmpty() @IsString() cvUrl: string;
}
