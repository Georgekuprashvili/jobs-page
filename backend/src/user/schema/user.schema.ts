import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true, unique: true, lowercase: true })
  email: string;

  @Prop({ required: true, select: false })
  password: string;

  @Prop({ default: false })
  verified: boolean;

  @Prop({ enum: ['user', 'admin'], default: 'user' })
  type: 'user' | 'admin';
}

export const UserSchema = SchemaFactory.createForClass(User);
