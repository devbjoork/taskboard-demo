import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthMiddleware } from 'src/firebase/auth.middleware';
import { FirebaseModule } from 'src/firebase/firebase.module';
import { Board, BoardSchema } from 'src/schema/board.schema';
import { Column, ColumnSchema } from 'src/schema/column.schema';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { LabelModule } from 'src/label/label.module';
import { UserModule } from 'src/user/user.module';
import { User, UserSchema } from 'src/schema/user.schema';
import { Label, LabelSchema } from 'src/schema/label.schema';
import {
  PendingInvite,
  PendingInviteSchema,
} from 'src/schema/pendingInvite.schema';
import { Card, CardSchema } from 'src/schema/card.schema';
import {
  ThemePreference,
  ThemePreferenceSchema,
} from 'src/schema/themePreference.schema';
import { ThemeController } from './theme.controller';

@Module({
  imports: [
    FirebaseModule,
    MongooseModule.forFeature([
      { name: Board.name, schema: BoardSchema },
      { name: Column.name, schema: ColumnSchema },
      { name: Card.name, schema: CardSchema },
      { name: User.name, schema: UserSchema },
      { name: Label.name, schema: LabelSchema },
      { name: PendingInvite.name, schema: PendingInviteSchema },
      { name: ThemePreference.name, schema: ThemePreferenceSchema },
    ]),
    LabelModule,
    UserModule,
  ],
  controllers: [BoardController, ThemeController],
  providers: [BoardService],
})
export class BoardModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(BoardController);
  }
}
