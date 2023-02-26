import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { FirebaseUser } from 'src/firebase/firebaseUser.decorator';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Post()
  createTask(@FirebaseUser() user, @Body() taskPayload) {
    return this.taskService.createTask(user.uid, taskPayload);
  }

  @Patch(':id')
  modifyTask(
    @FirebaseUser() user,
    @Param('id') taskId: string,
    @Body() updatedTaskPayload: any,
  ) {
    return this.taskService.updateColumn(user.uid, taskId, updatedTaskPayload);
  }

  @Delete(':id')
  deleteTask(@FirebaseUser() user, @Param('id') columnId) {
    return this.taskService.deleteTask(user.uid, columnId);
  }
}
