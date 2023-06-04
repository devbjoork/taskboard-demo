import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Label, LabelDocument } from 'src/schema/label.schema';
import { LabelHelper } from './label.helper';

@Injectable()
export class LabelService {
  constructor(
    @InjectModel(Label.name) private labelModel: Model<LabelDocument>,
    private readonly labelHelper: LabelHelper,
  ) {}

  public async initDefaultLabels(boardId: Types.ObjectId) {
    const labelsPayload: Array<any> =
      this.labelHelper.getDefaultLabels(boardId);

    console.log(labelsPayload);
    return await this.labelModel.insertMany(labelsPayload);
  }
}
