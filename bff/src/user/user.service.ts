import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types, UpdateQuery } from 'mongoose';
import { Board, BoardDocument } from 'src/schema/board.schema';
import {
  PendingInvite,
  PendingInviteDocument,
} from 'src/schema/pendingInvite.schema';
import { User, UserDocument } from 'src/schema/user.schema';

type actionType = 'star' | 'unstar';
const MESSAGE_UNKNOWN_ACTION = 'Unknonw action';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    @InjectModel(Board.name)
    private boardModel: Model<BoardDocument>,
    @InjectModel(PendingInvite.name)
    private pendingInviteModel: Model<PendingInviteDocument>,
  ) {}

  async getOwnData(userUID: string) {
    return this.userModel.findOne({ uid: userUID });
  }

  async getStarredBoards(userUID: string) {
    const user = await this.userModel.findOne({ uid: userUID });
    return user ? user.starredBoards : [];
  }

  async starBoard(userUID: string, boardId: string, action: actionType) {
    let updateQuery: UpdateQuery<UserDocument>;
    const id = new Types.ObjectId(boardId);
    if (action === 'star') updateQuery = { $addToSet: { starredBoards: id } };
    else if (action === 'unstar')
      updateQuery = { $pull: { starredBoards: id } };
    else throw new BadRequestException(MESSAGE_UNKNOWN_ACTION);
    const updateResult = await this.userModel.findOneAndUpdate(
      { uid: userUID },
      updateQuery,
      { new: true },
    );
    return updateResult;
  }

  async saveUserData(user: any) {
    const existingUser = await this.userModel.findOne({ uid: user.uid }).exec();

    if (!existingUser) {
      // check pendingInvites to add new user to corresponding boards
      const invites = await this.pendingInviteModel.find({
        userEmail: user.email,
      });

      await invites.forEach(async (invite) => {
        const targetBoard = await this.boardModel.findById(invite.board);
        if (targetBoard) {
          await this.boardModel.updateOne(
            { _id: invite.board },
            {
              $addToSet: { users: user.uid },
            },
          );
          await invite.delete();
        }
      });

      return await this.userModel.create({
        uid: user.uid,
        starredBoards: [],
        displayName: user.name,
        photoURL: user.picture,
        email: user.email,
      });
    }
    return 'ok';
  }
}
