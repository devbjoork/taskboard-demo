import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Board } from './board.schema';

export type PendingInviteDocument = HydratedDocument<PendingInvite>;

@Schema()
export class PendingInvite {
  _id: Types.ObjectId;

  @Prop()
  userEmail: string;

  @Prop({ type: Types.ObjectId, ref: 'Board' })
  board: Types.ObjectId & Board;
}

export const PendingInviteSchema = SchemaFactory.createForClass(PendingInvite);
