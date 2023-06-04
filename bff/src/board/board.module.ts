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
import { Task, TaskSchema } from 'src/schema/task.schema';
import { Label, LabelSchema } from 'src/schema/label.schema';
import {
  PendingInvite,
  PendingInviteSchema,
} from 'src/schema/pendingInvite.schema';

@Module({
  imports: [
    FirebaseModule,
    MongooseModule.forFeature([
      { name: Board.name, schema: BoardSchema },
      { name: Column.name, schema: ColumnSchema },
      { name: Task.name, schema: TaskSchema },
      { name: User.name, schema: UserSchema },
      { name: Label.name, schema: LabelSchema },
      { name: PendingInvite.name, schema: PendingInviteSchema },
    ]),
    LabelModule,
    UserModule,
  ],
  controllers: [BoardController],
  providers: [BoardService],
})
export class BoardModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(BoardController);
  }
}
