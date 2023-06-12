import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Label, LabelDocument } from 'src/schema/label.schema';
import { LabelHelper } from './label.helper';
import { Board, BoardDocument } from 'src/schema/board.schema';
import { Card, CardDocument } from 'src/schema/card.schema';

@Injectable()
export class LabelService {
  constructor(
    @InjectModel(Label.name)
    private labelModel: Model<LabelDocument>,
    @InjectModel(Board.name)
    private boardModel: Model<BoardDocument>,
    @InjectModel(Card.name)
    private cardModel: Model<CardDocument>,
    private readonly labelHelper: LabelHelper,
  ) {}

  public async initDefaultLabels(boardId: Types.ObjectId) {
    const labelsPayload: Array<any> =
      this.labelHelper.getDefaultLabels(boardId);
    return await this.labelModel.insertMany(labelsPayload);
  }

  async createLabel(boardId: string) {
    const id = new Types.ObjectId(boardId);
    const createdLabel = await this.labelModel.create({
      boardId: id,
      color: '#baf3bc',
      textColor: '#005603',
      title: 'Label',
      name: 'light green',
    });

    await this.boardModel.findByIdAndUpdate(id, {
      $addToSet: { labels: createdLabel._id },
    });

    return createdLabel;
  }

  async editLabel(
    labelId: string,
    labelPayload: {
      title: string;
      color: string;
      textColor: string;
      name: string;
    },
  ) {
    console.log(labelId);
    const id = new Types.ObjectId(labelId);
    const updatedLabel = await this.labelModel.findByIdAndUpdate(
      id,
      {
        title: labelPayload.title,
        color: labelPayload.color,
        textColor: labelPayload.textColor,
        name: labelPayload.name,
      },
      { new: true },
    );
    console.log(updatedLabel);
    return updatedLabel;
  }

  async deleteLabel(labelId: string) {
    const id = new Types.ObjectId(labelId);
    // delete from general list and also delete from each card
    const cards = await this.cardModel.find({ labels: { $in: id } });
    for (const card of cards) {
      const filteredLabels = card.labels.filter(
        (label) => !label._id.equals(id),
      );
      card.labels = filteredLabels;
      await card.save();
    }

    return this.labelModel.findByIdAndDelete(id);
  }
}
