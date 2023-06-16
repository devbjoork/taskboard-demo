import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';

interface LabelConstruct {
  id: string;
  color: string;
  textColor: string;
  name: string;
  boardId?: Types.ObjectId;
  title?: string;

}

@Injectable()
export class LabelHelper {
  private defaultLabels: LabelConstruct[] = [
    { id: '11', color: '#0c8710', textColor: '#f0fff0', name: 'deep green' },
    { id: '12', color: '#3712da', textColor: '#e1dbff', name: 'deep purple' },
    { id: '13', color: '#dd7d10', textColor: '#fff3e6', name: 'deep brown' },
  ];

  public getDefaultLabels(boardId: Types.ObjectId) {
    return this.defaultLabels.map((l) => {
      return { boardId, color: l.color };
    });
  }
}
