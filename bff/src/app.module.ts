import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BoardModule } from './board/board.module';
import { ColumnModule } from './column/column.module';
import { UserModule } from './user/user.module';
import { CardModule } from './card/card.module';
import { LoggerMiddleware } from './util/logger.middleware';

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
    CardModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
