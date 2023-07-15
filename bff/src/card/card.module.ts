import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthMiddleware } from 'src/firebase/auth.middleware';
import { FirebaseModule } from 'src/firebase/firebase.module';
import { Column, ColumnSchema } from 'src/schema/column.schema';
import { CardController } from './card.controller';
import { CardService } from './card.service';
import { Card, CardSchema } from 'src/schema/card.schema';
import { Board, BoardSchema } from 'src/schema/board.schema';
import { Action, ActionSchema } from 'src/schema/action.schema';

@Module({
  imports: [
    FirebaseModule,
    MongooseModule.forFeature([
      { name: Card.name, schema: CardSchema },
      { name: Column.name, schema: ColumnSchema },
      { name: Board.name, schema: BoardSchema },
      { name: Action.name, schema: ActionSchema },
    ]),
  ],
  controllers: [CardController],
  providers: [CardService],
})
export class CardModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(CardController);
  }
}
