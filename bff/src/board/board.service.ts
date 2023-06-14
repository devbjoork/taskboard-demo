import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserIdentifier } from 'firebase-admin/lib/auth/identifier';
import { Model, Types } from 'mongoose';
import { FirebaseService } from 'src/firebase/firebase.service';
import { LabelService } from 'src/label/label.service';
import { Board, BoardDocument } from 'src/schema/board.schema';
import { CardDocument, Card } from 'src/schema/card.schema';
import { Column, ColumnDocument } from 'src/schema/column.schema';
import { Label, LabelDocument } from 'src/schema/label.schema';
import {
  PendingInvite,
  PendingInviteDocument,
} from 'src/schema/pendingInvite.schema';
import { User, UserDocument } from 'src/schema/user.schema';
import { UserService } from 'src/user/user.service';

@Injectable()
export class BoardService {
  constructor(
    @InjectModel(Board.name) private boardModel: Model<BoardDocument>,
    @InjectModel(Column.name) private columnModel: Model<ColumnDocument>,
    @InjectModel(Card.name) private cardModel: Model<CardDocument>,
    @InjectModel(Label.name) private labelModel: Model<LabelDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(PendingInvite.name)
    private pendingInviteModel: Model<PendingInviteDocument>,
    private labelService: LabelService,
    private firebaseService: FirebaseService,
    private userService: UserService,
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
    const boards = await this.findAccessibleBoards(uid).lean();
    const starredBoards = await this.userService.getStarredBoards(uid);
    boards.forEach((board) => {
      const isStarred = starredBoards.some((b) => {
        return b.equals(board._id);
      });
      isStarred ? (board.starred = true) : (board.starred = false);
    });
    return boards;
  }

  async getBoardById(uid: string, boardId: string): Promise<Board> {
    console.log('board lookup');
    const board = await this.boardModel
      .findOne({
        $and: [{ _id: boardId }, { $or: [{ ownerId: uid }, { users: uid }] }],
      })
      .populate('cards')
      .populate('columns')
      // .populate({
      //   path: 'columns',
      //   populate: { path: 'cards', model: 'Card' },
      // })
      .populate('labels');

    if (!board)
      throw new NotFoundException(`Board with id ${boardId} was not found`);

    const ownerIdentifier: UserIdentifier = { uid: board.ownerId };
    const userIdentifierList: UserIdentifier[] = board.users.map((userUID) => {
      return { uid: userUID };
    });
    const users = await this.firebaseService.auth.getUsers([
      ownerIdentifier,
      ...userIdentifierList,
    ]);
    board.userData = users.users;

    return board;
  }

  async createBoard(uid: string, boardPayload: Board): Promise<Board> {
    const createdBoard = await this.boardModel.create({
      title: boardPayload.title,
      isPrivate: boardPayload.isPrivate,
      ownerId: uid,
      users: [],
      columns: [],
      cards: [],
      labels: [],
    });

    const defaultLabels = await this.labelService.initDefaultLabels(
      createdBoard._id,
    );

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
    const hasAccess = await this.userHasAccessToBoard(userUID, boardId);
    if (!hasAccess) throw new ForbiddenException();

    const foundBoard = await this.boardModel.findById(boardId);
    if (foundBoard.columns.length !== reorderColumnPayload.length)
      throw new BadRequestException('Column mismatch');

    const columnIds = reorderColumnPayload.map((id) => {
      return new Types.ObjectId(id);
    });

    foundBoard.columns = columnIds;
    foundBoard.save();

    return foundBoard.columns;
  }

  // todo allow only owners to delete boards

  async deleteBoard(userUID: string, boardId: string) {
    const hasAccess = await this.userHasAccessToBoard(userUID, boardId);
    if (!hasAccess) throw new ForbiddenException();

    const id = new Types.ObjectId(boardId);

    // wipe off board relation
    await this.userModel.updateMany(
      {},
      { $pull: { starredBoards: new Types.ObjectId(boardId) } },
    );
    await this.columnModel.deleteMany({ board: id });
    await this.cardModel.deleteMany({ board: id });
    await this.labelModel.deleteMany({ boardId: id });

    return this.boardModel.findByIdAndDelete(boardId);
  }

  async shareBoard(userUID: string, boardId: string, emails: string[]) {
    const hasAccess = await this.userHasAccessToBoard(userUID, boardId);
    if (!hasAccess) throw new ForbiddenException();

    const id = new Types.ObjectId(boardId);
    const board = await this.boardModel.findById(id).exec();

    const immediatelyAddedUsers = [];

    for (const email of emails) {
      const existingUser = await this.userModel.findOne({ email }).exec();
      if (existingUser) {
        // check if user is not an owner
        if (board.ownerId === existingUser.uid) return;

        // add user to board participants right away
        await this.boardModel.updateOne(
          { _id: id },
          { $addToSet: { users: existingUser.uid } },
        );

        immediatelyAddedUsers.push(existingUser);
      } else {
        // create entry for defered sharing
        await this.pendingInviteModel.create({ userEmail: email, board: id });
      }
    }

    return immediatelyAddedUsers;
  }

  async removeUserFromBoard(
    userUID: string,
    boardId: string,
    targetUID: string,
  ) {
    const hasAccess = await this.userHasAccessToBoard(userUID, boardId);
    if (!hasAccess) throw new ForbiddenException();

    const id = new Types.ObjectId(boardId);

    return this.boardModel.updateOne(
      { _id: id },
      { $pull: { users: targetUID } },
      { new: true },
    );
  }
}
