import { BadRequestException, PipeTransform } from '@nestjs/common';
import { Types } from 'mongoose';

const MESSAGE_INVALID_OBJECTID = 'Invalid ObjectID';

export class ParseObjectIdPipe implements PipeTransform<any, Types.ObjectId> {
  transform(value: any): Types.ObjectId {
    const isValid = Types.ObjectId.isValid(value);
    if (!isValid) throw new BadRequestException(MESSAGE_INVALID_OBJECTID);
    return new Types.ObjectId(value);
  }
}
