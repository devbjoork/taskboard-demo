import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Column } from './column.schema';
import { Label } from './label.schema';
import { Card } from './card.schema';
import { ThemePreference } from './themePreference.schema';
import { Action } from './action.schema';

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

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Card' }] })
  cards: Types.ObjectId[] & Card[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Label' }] })
  labels: Label[];

  @Prop()
  userData: any[];

  @Prop({ type: Types.ObjectId, ref: 'ThemePreference' })
  themePrefs: Types.ObjectId & ThemePreference;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Action' }] })
  actions: Action[];

  starred = false;
}

export const BoardSchema = SchemaFactory.createForClass(Board);
