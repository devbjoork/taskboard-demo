import { Body, Controller, Post } from '@nestjs/common';
import { FirebaseUser } from 'src/firebase/firebaseUser.decorator';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Post()
  createTask(@FirebaseUser() user, @Body() taskPayload) {
    return this.taskService.createTask(user.uid, taskPayload);
  }
}
