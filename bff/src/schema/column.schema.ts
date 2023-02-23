import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Board } from './board.schema';
import { Task } from './task.schema';

export type ColumnDocument = HydratedDocument<Column>;

@Schema()
export class Column {
  _id: Types.ObjectId;

  @Prop()
  title: string;

  @Prop({ type: Types.ObjectId, ref: 'Board' })
  board: Types.ObjectId & Board;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Task' }] })
  tasks: Types.ObjectId[] & Task[];
}

export const ColumnSchema = SchemaFactory.createForClass(Column);
