import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Column, ColumnDocument } from 'src/schema/column.schema';
import { Task, TaskDocument } from 'src/schema/task.schema';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name) private taskModel: Model<TaskDocument>,
    @InjectModel(Column.name) private columnModel: Model<ColumnDocument>,
  ) {}

  private async hasAccessToColumn(userUID: string, columnId: string) {
    const column = await this.columnModel
      .findById(columnId)
      .populate('board', 'ownerId users');

    if (
      column.board.ownerId === userUID ||
      column.board.users.includes(userUID)
    ) {
      return true;
    }

    return false;
  }

  async createTask(userUID: string, taskPayload: any) {
    const hasAccess = await this.hasAccessToColumn(
      userUID,
      taskPayload.columnId,
    );
    if (!hasAccess) throw new ForbiddenException();

    const task = await this.taskModel.create({
      title: taskPayload.title || 'New Task',
      body: '',
      author: userUID,
      column: new Types.ObjectId(taskPayload.columnId),
      createdAt: new Date().toISOString(),
      assignee: [],
      labels: [],
    });

    await this.columnModel.updateOne(
      { _id: taskPayload.columnId },
      { $push: { tasks: task._id } },
    );
    return task;
  }
}
