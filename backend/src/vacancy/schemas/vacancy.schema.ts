import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Vacancy {
  @Prop({ required: true }) title: string;
  @Prop({ required: true }) description: string;
  @Prop({ required: true }) category: string;
  @Prop({ required: true }) location: string;
  @Prop({ required: true }) salary: number;
  @Prop({ required: true }) companyId: string;
  @Prop({ default: false }) approved: boolean;
}

export const VacancySchema = SchemaFactory.createForClass(Vacancy);
