import {
  ForbiddenException,
  NotFoundException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Card, CardDocument } from 'src/schema/card.schema';
import { Column, ColumnDocument } from 'src/schema/column.schema';

@Injectable()
export class CardService {
  constructor(
    @InjectModel(Card.name) private cardModel: Model<CardDocument>,
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
    });

    await this.columnModel.updateOne(
      { _id: cardPayload.columnId },
      { $push: { cards: card._id } },
    );
    return card;
  }

  async updateCard(userUID: string, cardId: string, payload: any) {
    const card = await this.cardModel.findById(cardId);
    const hasAccess = await this.hasAccessToColumn(
      userUID,
      card.column.toString(),
    );
    if (!hasAccess) throw new ForbiddenException();

    card.body = payload.body;
    card.title = payload.title;

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
        // return [sourceColumn];
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
        // console.log([sourceColumn, targetColumn]);
        // return [sourceColumn, targetColumn];
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

    return await this.cardModel.findByIdAndDelete(cardId);
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
}
