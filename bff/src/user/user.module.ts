import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthMiddleware } from 'src/firebase/auth.middleware';
import { UserController } from './user.controller';
import { User, UserSchema } from 'src/schema/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { FirebaseModule } from 'src/firebase/firebase.module';
import { UserService } from './user.service';
import {
  PendingInvite,
  PendingInviteSchema,
} from 'src/schema/pendingInvite.schema';
import { Board, BoardSchema } from 'src/schema/board.schema';

@Module({
  imports: [
    FirebaseModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Board.name, schema: BoardSchema },
      { name: PendingInvite.name, schema: PendingInviteSchema },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(UserController);
  }
}
