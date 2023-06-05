import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
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

  @Patch(':id/move')
  moveTask(
    @FirebaseUser() user,
    @Param('id') taskId: string,
    @Body() moveTaskPayload: any,
  ) {
    return this.taskService.moveTask(user.uid, taskId, moveTaskPayload);
  }

  @Delete(':id')
  deleteTask(@FirebaseUser() user, @Param('id') columnId) {
    return this.taskService.deleteTask(user.uid, columnId);
  }

  @Put(':id/label')
  addLabel(@FirebaseUser() user, @Param('id') taskId, @Body() payload) {
    return this.taskService.addLabel(user.uid, taskId, payload.labelId);
  }

  @Delete(`:id/label`)
  removeLabel(@FirebaseUser() user, @Param('id') taskId, @Body() payload) {
    return this.taskService.removeLabel(user.uid, taskId, payload.labelId);
  }
}
