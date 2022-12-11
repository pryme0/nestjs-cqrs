import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OtpDocument = OtpEntity & Document;

@Schema({ timestamps: true, _id: true, id: true })
export class OtpEntity {
  @Prop()
  id?: string;

  @Prop()
  otp?: string;

  @Prop()
  phoneNumber?: string;

  @Prop()
  type?: string;

  @Prop()
  userId?: string;
}

export const OtpSchema = SchemaFactory.createForClass(OtpEntity);
