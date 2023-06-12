import { MiddlewareConsumer, Module } from '@nestjs/common';
import { LabelService } from './label.service';
import { LabelHelper } from './label.helper';
import { MongooseModule } from '@nestjs/mongoose';
import { Label, LabelSchema } from 'src/schema/label.schema';
import { LabelController } from './label.controller';
import { AuthMiddleware } from 'src/firebase/auth.middleware';
import { Board, BoardSchema } from 'src/schema/board.schema';
import { FirebaseModule } from 'src/firebase/firebase.module';
import { Card, CardSchema } from 'src/schema/card.schema';

@Module({
  imports: [
    FirebaseModule,
    MongooseModule.forFeature([
      { name: Label.name, schema: LabelSchema },
      { name: Board.name, schema: BoardSchema },
      { name: Card.name, schema: CardSchema },
    ]),
  ],
  controllers: [LabelController],
  providers: [LabelService, LabelHelper],
  exports: [LabelService],
})
export class LabelModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(LabelController);
  }
}
