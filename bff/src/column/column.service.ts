import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Board, BoardDocument } from 'src/schema/board.schema';
import { Column, ColumnDocument } from 'src/schema/column.schema';

@Injectable()
export class ColumnService {
  constructor(
    @InjectModel(Board.name) private boardModel: Model<BoardDocument>,
    @InjectModel(Column.name) private columnModel: Model<ColumnDocument>,
  ) {}

  private async findAvailableBoardById(
    uid: string,
    boardId: string,
  ): Promise<Board> {
    return this.boardModel.findOne({
      $and: [
        {
          $or: [{ ownerId: uid }, { users: uid }],
        },
        { _id: boardId },
      ],
    });
  }

  private async checkUserAccessForColumn(
    userUID: string,
    columnId: string,
  ): Promise<boolean> {
    const column = await this.columnModel.findById(columnId);
    if (column) {
      const board = await this.boardModel.findById(column.board);
      if (board) {
        const userHasBoardAccess =
          board.ownerId === userUID || board.users.includes(userUID);
        if (userHasBoardAccess) return true;
      }
    }

    return false;
  }

  async findColumnById(userUID: string, columnId: string) {
    return this.columnModel.findById(columnId);
  }

  async findColumnsByBoardId(userUID: string, boardId: string) {
    const board = await this.findAvailableBoardById(userUID, boardId);
    if (!board) throw new ForbiddenException(`You can't access this board`);

    return this.columnModel.find({ _id: { $in: board.columns } });
  }

  async createColumn(userUID: string, columnPayload: any) {
    const foundBoard = await this.findAvailableBoardById(
      userUID,
      columnPayload.boardId,
    );

    if (!foundBoard)
      throw new ForbiddenException('You have no rights for this board');

    const createdColumn = await this.columnModel.create({
      title: columnPayload.title,
      board: foundBoard._id,
      cards: [],
    });

    await this.boardModel.updateOne(
      { _id: foundBoard._id },
      { $push: { columns: createdColumn._id } },
    );

    return createdColumn;
  }

  async updateColumn(
    userUID: string,
    columnId: string,
    updatedColumnPayload: any,
  ) {
    const hasAccess = await this.checkUserAccessForColumn(userUID, columnId);
    if (!hasAccess)
      throw new ForbiddenException(`You don't have access to this resource`);

    return this.columnModel.findByIdAndUpdate(columnId, updatedColumnPayload, {
      new: true,
    });
  }

  async deleteColumn(userUID, columnId) {
    const hasAccess = await this.checkUserAccessForColumn(userUID, columnId);
    if (!hasAccess)
      throw new ForbiddenException(`You don't have access to this resource`);

    return this.columnModel.findByIdAndDelete(columnId);
  }
}
