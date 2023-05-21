import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';

interface LabelConstruct {
  color: string;
  boardId?: Types.ObjectId;
  title?: string;
}

@Injectable()
export class LabelHelper {
  private defaultLabels: LabelConstruct[] = [
    { color: '#baf3bc' },
    { color: '#c4baf3' },
    { color: '#f3d8ba' },
  ];

  public getDefaultLabels(boardId: Types.ObjectId) {
    return this.defaultLabels.map((l) => {
      return { boardId, color: l.color };
    });
  }
}
