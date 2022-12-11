import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type documentDocument = DocumentEntity & Document;

@Schema({ timestamps: true, _id: true, id: true })
export class DocumentEntity {
  @Prop()
  id?: string;

  @Prop()
  owner?: string;

  @Prop()
  documentType?: string;

  @Prop()
  document?: string;

  @Prop()
  key?: string;

  @Prop()
  bucket?: string;
}

export const documentSchema = SchemaFactory.createForClass(DocumentEntity);
