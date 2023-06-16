import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Board } from './board.schema';
import { Card } from './card.schema';

export type ColumnDocument = HydratedDocument<Column>;

@Schema()
export class Column {
  _id: Types.ObjectId;

  @Prop()
  title: string;

  @Prop({ type: Types.ObjectId, ref: 'Board' })
  board: Types.ObjectId & Board;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Card' }] })
  cards: Types.ObjectId[] & Card[];
}

export const ColumnSchema = SchemaFactory.createForClass(Column);
