import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthMiddleware } from 'src/firebase/auth.middleware';
import { FirebaseModule } from 'src/firebase/firebase.module';
import { Board, BoardSchema } from 'src/schema/board.schema';
import { Column, ColumnSchema } from 'src/schema/column.schema';
import { ColumnController } from './column.controller';
import { ColumnService } from './column.service';
import { Card, CardSchema } from 'src/schema/card.schema';

@Module({
  imports: [
    FirebaseModule,
    MongooseModule.forFeature([
      { name: Board.name, schema: BoardSchema },
      { name: Column.name, schema: ColumnSchema },
      { name: Card.name, schema: CardSchema },
    ]),
  ],
  controllers: [ColumnController],
  providers: [ColumnService],
})
export class ColumnModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(ColumnController);
  }
}
