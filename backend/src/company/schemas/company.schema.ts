import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Company {
  @Prop({ required: true })
  companyName: string;

  @Prop({ required: true, unique: true, lowercase: true })
  email: string;

  @Prop({ required: true, select: false })
  password: string;

  @Prop({ required: true })
  phoneNumber: number;

  @Prop({ default: false })
  approved: boolean;

  @Prop({ default: false })
  verified: boolean;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
