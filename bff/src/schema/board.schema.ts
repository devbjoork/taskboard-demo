import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Column } from './column.schema';

export type BoardDocument = HydratedDocument<Board>;

@Schema()
export class Board {
  _id: Types.ObjectId;

  @Prop()
  title: string;

  @Prop()
  ownerId: string;

  @Prop()
  isPrivate: boolean;

  @Prop([String])
  users: string[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Column' }] })
  columns: Column[];
}

export const BoardSchema = SchemaFactory.createForClass(Board);
