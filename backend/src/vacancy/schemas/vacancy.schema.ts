import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Vacancy {
  @Prop({ required: true }) title: string;
  @Prop({ required: true }) description: string;
  @Prop({ required: true }) category: string;
  @Prop({ required: true }) location: string;
  @Prop({ required: true }) salary: number;
  @Prop({ required: true }) companyEmail: string;
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
  })
  companyId: string;
  @Prop({ default: false }) approved: boolean;
}

export const VacancySchema = SchemaFactory.createForClass(Vacancy);
