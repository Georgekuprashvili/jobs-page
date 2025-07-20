import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Application {
  @Prop({ required: true }) userId: string;
  @Prop({ required: true }) vacancyId: string;
  @Prop({ required: true }) cvUrl: string;
}

export const ApplicationSchema = SchemaFactory.createForClass(Application);
