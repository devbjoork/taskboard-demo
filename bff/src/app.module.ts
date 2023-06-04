import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardModule } from './board/board.module';
import { ColumnModule } from './column/column.module';
import { TaskModule } from './task/task.module';
import { UserModule } from './user/user.module';

const IS_DEV = process.env.NODE_ENV === 'dev';
const PORT = 27017;
const DB = 'taskboard';

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb://${IS_DEV ? '127.0.0.1' : process.env.DB_URI}:${PORT}`,
      {
        auth: {
          username: `${IS_DEV ? '' : process.env.DB_USERNAME}`,
          password: `${IS_DEV ? '' : process.env.DB_PASSWORD}`,
        },
        dbName: `${DB}`,
      },
    ),
    BoardModule,
    ColumnModule,
    TaskModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
