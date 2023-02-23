import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Column } from './column.schema';

export type TaskDocument = HydratedDocument<Task>;

@Schema()
export class Task {
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

  @Prop([String])
  assignee: string[];

  @Prop({ type: [{ type: Types.ObjectId }] })
  labels: Types.ObjectId[];
}

export const TaskSchema = SchemaFactory.createForClass(Task);
