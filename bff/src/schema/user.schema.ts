import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Board } from './board.schema';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  _id: Types.ObjectId;

  @Prop()
  uid: string;

  @Prop({ type: Types.ObjectId, ref: 'Board' })
  starredBoards: Types.ObjectId[] & Board[];

  @Prop()
  displayName: string;

  @Prop()
  photoURL: string;

  @Prop()
  email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
