import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Query, Types } from 'mongoose';
import { LabelService } from 'src/label/label.service';
import { Board, BoardDocument } from 'src/schema/board.schema';
import { Column, ColumnDocument } from 'src/schema/column.schema';

@Injectable()
export class BoardService {
  constructor(
    @InjectModel(Board.name) private boardModel: Model<BoardDocument>,
    @InjectModel(Column.name) private columnModel: Model<ColumnDocument>,
    private labelService: LabelService,
  ) {}

  private findAccessibleBoards(uid: string) {
    return this.boardModel.find({ $or: [{ ownerId: uid }, { users: uid }] });
  }

  private async userHasAccessToBoard(
    uid: string,
    boardId: string,
  ): Promise<boolean> {
    const board = await this.boardModel.findOne({
      $and: [
        { _id: boardId },
        {
          $or: [{ ownerId: uid }, { users: uid }],
        },
      ],
    });

    return board ? true : false;
  }

  async getBoards(uid: string): Promise<Board[]> {
    return this.findAccessibleBoards(uid);
  }

  async getBoardById(uid: string, boardId: string) {
    const board = this.boardModel
      .findOne({
        $and: [{ _id: boardId }, { $or: [{ ownerId: uid }, { users: uid }] }],
      })
      .populate('columns')
      .populate({
        path: 'columns',
        populate: { path: 'tasks', model: 'Task' },
      })
      .populate('labels');

    if (!board)
      throw new NotFoundException(`Board with id ${boardId} was not found`);

    return board;
  }

  async createBoard(uid: string, boardPayload: Board): Promise<Board> {
    const createdBoard = await this.boardModel.create({
      title: boardPayload.title,
      isPrivate: boardPayload.isPrivate,
      ownerId: uid,
      users: [],
      columns: [],
      labels: [],
    });

    const defaultLabels = await this.labelService.initDefaultLabels(
      createdBoard._id,
    );

    console.log(defaultLabels);

    createdBoard.labels.push(...defaultLabels);
    createdBoard.save();
    await createdBoard.populate('labels');
    return createdBoard;
  }

  async updateBoard(userUID: string, boardId: string, updateBoardPayload: any) {
    const hasAccess = await this.userHasAccessToBoard(userUID, boardId);
    if (!hasAccess) throw new ForbiddenException();

    return this.boardModel.findByIdAndUpdate(boardId, updateBoardPayload, {
      new: true,
    });
  }

  async reorderColumns(
    userUID: string,
    boardId: string,
    reorderColumnPayload: any,
  ) {
    // const hasAccess = await this.userHasAccessToBoard(userUID, boardId);
    // if (!hasAccess) throw new ForbiddenException();

    const foundBoard = await this.boardModel.findById(boardId);
    if (foundBoard.columns.length !== reorderColumnPayload.length)
      throw new BadRequestException();

    const columnIds = reorderColumnPayload.map((id) => {
      return new Types.ObjectId(id);
    });

    foundBoard.columns = columnIds;
    foundBoard.save();

    return foundBoard.columns;
  }

  async deleteBoard(userUID: string, boardId: string) {
    const hasAccess = await this.userHasAccessToBoard(userUID, boardId);
    if (!hasAccess) throw new ForbiddenException();

    return this.boardModel.findByIdAndDelete(boardId);
  }
}
