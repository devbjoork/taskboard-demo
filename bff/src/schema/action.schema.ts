import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Board } from './board.schema';

export type ActionDocument = HydratedDocument<Action>;

@Schema()
export class Action {
  _id: Types.ObjectId;

  @Prop()
  type: string;

  @Prop()
  userUID: string;

  @Prop()
  actionDateTime: Date;

  @Prop({ type: Types.ObjectId, ref: 'Board' })
  boardId: Types.ObjectId & Board;

  @Prop({ type: Object })
  payload: any;
}

export const ActionSchema = SchemaFactory.createForClass(Action);
