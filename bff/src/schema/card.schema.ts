import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Column } from './column.schema';
import { Board } from './board.schema';

export type CardDocument = HydratedDocument<Card>;

@Schema()
export class Card {
  _id: Types.ObjectId;

  @Prop()
  title: string;

  @Prop()
  body: string;

  @Prop()
  author: string;

  @Prop()
  createdAt: Date;

  @Prop({ type: Types.ObjectId, ref: 'Column' })
  column: Types.ObjectId & Column;

  @Prop({ type: Types.ObjectId, ref: 'Board' })
  board: Types.ObjectId & Board;

  @Prop([String])
  assignee: string[];

  @Prop({ type: [{ type: Types.ObjectId }] })
  labels: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId }] })
  actions: Types.ObjectId[];
}

export const CardSchema = SchemaFactory.createForClass(Card);
