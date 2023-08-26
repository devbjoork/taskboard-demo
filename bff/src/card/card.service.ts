import {
  ForbiddenException,
  NotFoundException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Action, ActionDocument } from 'src/schema/action.schema';
import { ACTION_TYPES } from 'src/schema/actionTypes';
import { Board, BoardDocument } from 'src/schema/board.schema';
import { Card, CardDocument } from 'src/schema/card.schema';
import { Column, ColumnDocument } from 'src/schema/column.schema';

@Injectable()
export class CardService {
  constructor(
    @InjectModel(Card.name) private cardModel: Model<CardDocument>,
    @InjectModel(Column.name) private columnModel: Model<ColumnDocument>,
    @InjectModel(Board.name) private boardModel: Model<BoardDocument>,
    @InjectModel(Action.name) private actionModel: Model<ActionDocument>,
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

  async createCard(userUID: string, cardPayload: any) {
    const hasAccess = await this.hasAccessToColumn(
      userUID,
      cardPayload.columnId,
    );
    if (!hasAccess) throw new ForbiddenException();

    const card = await this.cardModel.create({
      title: cardPayload.title || 'New Card',
      body: '',
      author: userUID,
      column: new Types.ObjectId(cardPayload.columnId),
      board: new Types.ObjectId(cardPayload.boardId),
      createdAt: new Date().toISOString(),
      assignee: [],
      labels: [],
      actions: [],
    });

    const createAction = await this.actionModel.create({
      type: ACTION_TYPES.CARD_CREATE,
      userUID,
      actionDateTime: Date.now(),
      boardId: cardPayload.boardId,
      payload: { cardId: card._id },
    });

    card.actions.push(createAction._id);
    await card.save();

    await this.columnModel.updateOne(
      { _id: cardPayload.columnId },
      { $push: { cards: card._id } },
    );

    await this.boardModel.updateOne(
      { _id: cardPayload.boardId },
      { $push: { cards: card._id, actions: createAction } },
    );

    return card.populate('actions');
  }

  async updateCard(
    userUID: string,
    cardId: string,
    payload: { title?: string; body?: string },
  ) {
    const card = await this.cardModel.findById(cardId);
    const hasAccess = await this.hasAccessToColumn(
      userUID,
      card.column.toString(),
    );
    if (!hasAccess) throw new ForbiddenException();

    const oldTitle = card.title;

    card.body = payload.body || card.body;
    card.title = payload.title || card.title;

    if (payload.title) {
      const editTitleAction = await this.actionModel.create({
        type: ACTION_TYPES.CARD_EDIT_TITLE,
        userUID,
        actionDateTime: Date.now(),
        boardId: card.board,
        payload: { cardId: card._id, oldTitle, newTitle: payload.title },
      });
      card.actions.push(editTitleAction._id);

      await this.boardModel.updateOne(
        { _id: card.board },
        { $push: { actions: editTitleAction } },
      );
    }

    return card.save();
  }

  async moveCard(userUID: string, cardId: string, payload: any) {
    const card = await this.cardModel.findById(cardId);
    const hasAccess = await this.hasAccessToColumn(
      userUID,
      card.column.toString(),
    );
    if (!hasAccess) throw new ForbiddenException();

    const { source, target } = payload;

    if (source.columnId == target.columnId && source.index == target.index)
      return;

    const sourceColumn = await this.columnModel.findById(source.columnId);
    const targetColumn = await this.columnModel.findById(target.columnId);

    // card is still in source
    if (sourceColumn.cards[source.index].equals(cardId)) {
      if (sourceColumn._id.equals(targetColumn._id)) {
        // moving in same column
        const cards = sourceColumn.cards as Types.ObjectId[];
        const tmp = cards[source.index];
        cards.splice(source.index, 1);
        cards.splice(target.index, 0, tmp);
        sourceColumn.cards = cards as Types.ObjectId[] & Card[];
        sourceColumn.save();
        return this.columnModel
          .find({
            _id: { $in: [sourceColumn._id] },
          })
          .populate('cards');
      } else {
        card.column = targetColumn._id as Types.ObjectId & Column;
        card.save();
        // cut-paste card id to destination and save both
        sourceColumn.cards.splice(source.index, 1);
        targetColumn.cards.splice(target.index, 0, card._id);
        await sourceColumn.save();
        await targetColumn.save();
        return this.columnModel
          .find({
            _id: { $in: [sourceColumn._id, targetColumn._id] },
          })
          .populate('cards');
      }
    } else {
      throw new NotFoundException('Card was moved already or does not exist');
    }
  }

  async deleteCard(userUID: string, cardId: string) {
    const card = await this.cardModel.findById(cardId);
    const hasAccess = await this.hasAccessToColumn(
      userUID,
      card.column.toString(),
    );
    if (!hasAccess) throw new ForbiddenException();

    const targetCard = await this.cardModel.findById(cardId);

    // remove from column
    await this.columnModel.findByIdAndUpdate(targetCard.column, {
      $pull: { cards: targetCard._id },
    });

    // remove card itself
    return targetCard.delete();
  }

  async addLabel(userUID: string, cardId: string, labelId: string) {
    const card = await this.cardModel.findById(cardId);
    const hasAccess = await this.hasAccessToColumn(
      userUID,
      card.column.toString(),
    );
    if (!hasAccess) throw new ForbiddenException();

    const id = new Types.ObjectId(labelId);

    return this.cardModel.findByIdAndUpdate(
      cardId,
      {
        $addToSet: { labels: id },
      },
      { new: true },
    );
  }

  async removeLabel(userUID: string, cardId: string, labelId: string) {
    const card = await this.cardModel.findById(cardId);
    const hasAccess = await this.hasAccessToColumn(
      userUID,
      card.column.toString(),
    );
    if (!hasAccess) throw new ForbiddenException();

    const id = new Types.ObjectId(labelId);

    return this.cardModel.findByIdAndUpdate(
      cardId,
      { $pull: { labels: id } },
      { new: true },
    );
  }

  async addAssignee(userUID: string, cardId: string, assigneeId: string) {
    const card = await this.cardModel.findById(cardId);
    const hasAccess = await this.hasAccessToColumn(
      userUID,
      card.column.toString(),
    );
    if (!hasAccess) throw new ForbiddenException();

    return this.cardModel.findByIdAndUpdate(
      cardId,
      { $addToSet: { assignee: assigneeId } },
      { new: true },
    );
  }

  async removeAssignee(userUID: string, cardId: string, assigneeId: string) {
    const card = await this.cardModel.findById(cardId);
    const hasAccess = await this.hasAccessToColumn(
      userUID,
      card.column.toString(),
    );
    if (!hasAccess) throw new ForbiddenException();

    return this.cardModel.findByIdAndUpdate(
      cardId,
      { $pull: { assignee: assigneeId } },
      { new: true },
    );
  }

  async addComment(
    userUID: string,
    cardId: string,
    boardId: string,
    commentBody: string,
  ) {
    const card = await this.cardModel.findById(cardId);
    const hasAccess = await this.hasAccessToColumn(
      userUID,
      card.column.toString(),
    );
    if (!hasAccess) throw new ForbiddenException();

    // create action entity
    const commentAction = await this.actionModel.create({
      type: ACTION_TYPES.COMMENT,
      userUID,
      actionDateTime: Date.now(),
      boardId: boardId,
      payload: { cardId, commentBody, modified: false },
    });

    // update board with newly created action entity
    await this.boardModel.updateOne(
      { _id: boardId },
      { $push: { actions: commentAction } },
    );

    // add action id to card actions list
    card.actions.push(commentAction._id);
    await card.save();

    return commentAction;
  }

  async deleteComment(userUID: string, cardId: string, commentId: string) {
    const card = await this.cardModel.findById(cardId);
    const hasAccess = await this.hasAccessToColumn(
      userUID,
      card.column.toString(),
    );
    const commentAction = await this.actionModel.findById(commentId);
    const isOwnComment = commentAction.userUID === userUID;
    if (!hasAccess && isOwnComment) throw new ForbiddenException();

    const deletedComment = await this.actionModel.deleteOne({ _id: commentId });

    await this.boardModel.updateOne(
      { _id: card.board },
      { $pull: { actions: { _id: commentId } } },
    );

    await this.cardModel.updateOne(
      { _id: cardId },
      { $pull: { actions: commentId } },
    );

    return deletedComment;
  }

  async modifyComment(
    userUID: string,
    cardId: string,
    commentId: string,
    commentBody: string,
  ) {
    const card = await this.cardModel.findById(cardId);
    const hasAccess = await this.hasAccessToColumn(
      userUID,
      card.column.toString(),
    );
    const commentAction = await this.actionModel.findById(commentId);
    const isOwnComment = commentAction.userUID === userUID;
    if (!hasAccess && isOwnComment) throw new ForbiddenException();

    commentAction.payload.commentBody = commentBody;
    commentAction.actionDateTime = new Date();
    commentAction.payload.modified = true;
    const savedComment = await commentAction.save();
    return savedComment;
  }
}
