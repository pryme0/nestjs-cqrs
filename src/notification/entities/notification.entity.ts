import { Prop, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NotificationDocument = NotificationEntity & Document;

@Schema({ timestamps: true, _id: true, id: true })
export class NotificationEntity {
  @Prop()
  id?: string;

  @Prop()
  message?: string;

  @Prop()
  notiFiableId?: string;

  @Prop()
  notificationType?: string;

  @Prop()
  notifiable?: string;

  @Prop()
  priority?: string;

  @Prop()
  seen?: boolean;

  @Prop({ default: false })
  isDeleted?: boolean;
}
