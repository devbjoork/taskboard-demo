import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { LabelService } from './label.service';
import { FirebaseUser } from 'src/firebase/firebaseUser.decorator';

@Controller('label')
export class LabelController {
  constructor(private labelService: LabelService) {}

  @Post(':boardId')
  createLabel(@FirebaseUser() user, @Param('boardId') boardId) {
    return this.labelService.createLabel(boardId);
  }

  @Patch(':labelId')
  editLabel(@FirebaseUser() user, @Param('labelId') labelId, @Body() payload) {
    return this.labelService.editLabel(labelId, payload);
  }

  @Delete(':labelId')
  deleteLabel(@FirebaseUser() user, @Param('labelId') labelId) {
    return this.labelService.deleteLabel(labelId);
  }
}
