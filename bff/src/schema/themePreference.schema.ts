import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ThemePreferenceDocument = HydratedDocument<ThemePreference>;

@Schema({ _id: false })
export class ThemeColorPrefs {
  @Prop()
  bg: string;

  @Prop()
  fg: string;

  @Prop()
  shadow: string;
}

@Schema()
export class ThemePreference {
  _id: Types.ObjectId;

  @Prop()
  name: string;

  @Prop()
  type: string;

  @Prop()
  colors: ThemeColorPrefs;
}

export const ThemePreferenceSchema =
  SchemaFactory.createForClass(ThemePreference);
