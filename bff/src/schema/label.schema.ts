import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type LabelDocument = HydratedDocument<Label>;

@Schema()
export class Label {
  _id: Types.ObjectId;

  @Prop()
  boardId: Types.ObjectId;

  @Prop({ required: false })
  title?: string;

  @Prop()
  color: string;

  @Prop()
  textColor?: string;

  @Prop()
  name?: string;
}

export const LabelSchema = SchemaFactory.createForClass(Label);
