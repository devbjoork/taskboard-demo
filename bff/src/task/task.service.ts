import {
  ForbiddenException,
  NotFoundException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId, Types } from 'mongoose';
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

  async updateColumn(userUID: string, taskId: string, payload: any) {
    const task = await this.taskModel.findById(taskId);
    const hasAccess = await this.hasAccessToColumn(
      userUID,
      task.column.toString(),
    );
    if (!hasAccess) throw new ForbiddenException();

    task.body = payload.body;
    task.title = payload.title;

    return task.save();
  }

  async moveTask(userUID: string, taskId: string, payload: any) {
    const task = await this.taskModel.findById(taskId);
    const hasAccess = await this.hasAccessToColumn(
      userUID,
      task.column.toString(),
    );
    if (!hasAccess) throw new ForbiddenException();

    const { source, target } = payload;

    if (source.columnId == target.columnId && source.index == target.index)
      return;

    const sourceColumn = await this.columnModel.findById(source.columnId);
    const targetColumn = await this.columnModel.findById(target.columnId);

    // task is still in source
    if (sourceColumn.tasks[source.index].equals(taskId)) {
      if (sourceColumn._id.equals(targetColumn._id)) {
        // moving in same column
        const tasks = sourceColumn.tasks as Types.ObjectId[];
        const tmp = tasks[source.index];
        tasks.splice(source.index, 1);
        tasks.splice(target.index, 0, tmp);
        sourceColumn.tasks = tasks as Types.ObjectId[] & Task[];
        sourceColumn.save();
        return [sourceColumn];
      } else {
        task.column = targetColumn._id as Types.ObjectId & Column;
        task.save();
        // cut-paste task id to destination and save both
        sourceColumn.tasks.splice(source.index, 1);
        targetColumn.tasks.splice(target.index, 0, task._id);
        sourceColumn.save();
        targetColumn.save();
        return [sourceColumn, targetColumn];
      }
    } else {
      throw new NotFoundException('Task was moved already or does not exist');
    }
  }

  async deleteTask(userUID: string, taskId: string) {
    const task = await this.taskModel.findById(taskId);
    const hasAccess = await this.hasAccessToColumn(
      userUID,
      task.column.toString(),
    );
    if (!hasAccess) throw new ForbiddenException();

    return await this.taskModel.findByIdAndDelete(taskId);
  }
}
