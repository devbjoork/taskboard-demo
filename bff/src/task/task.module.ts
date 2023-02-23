import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthMiddleware } from 'src/firebase/auth.middleware';
import { FirebaseModule } from 'src/firebase/firebase.module';
import { Column, ColumnSchema } from 'src/schema/column.schema';
import { Task, TaskSchema } from 'src/schema/task.schema';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';

@Module({
  imports: [
    FirebaseModule,
    MongooseModule.forFeature([
      { name: Task.name, schema: TaskSchema },
      { name: Column.name, schema: ColumnSchema },
    ]),
  ],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(TaskController);
  }
}
