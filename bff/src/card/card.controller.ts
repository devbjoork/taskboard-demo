import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { FirebaseUser } from 'src/firebase/firebaseUser.decorator';
import { CardService } from './card.service';

@Controller('card')
export class CardController {
  constructor(private cardService: CardService) {}

  @Post()
  createCard(@FirebaseUser() user: FirebaseUser, @Body() cardPayload) {
    return this.cardService.createCard(user.uid, cardPayload);
  }

  @Patch(':id')
  modifyCard(
    @FirebaseUser() user: FirebaseUser,
    @Param('id') cardId: string,
    @Body() updatedCardPayload: any,
  ) {
    return this.cardService.updateCard(user.uid, cardId, updatedCardPayload);
  }

  @Patch(':id/move')
  moveCard(
    @FirebaseUser() user: FirebaseUser,
    @Param('id') cardId: string,
    @Body() moveCardPayload: any,
  ) {
    return this.cardService.moveCard(user.uid, cardId, moveCardPayload);
  }

  @Delete(':id')
  deleteCard(@FirebaseUser() user: FirebaseUser, @Param('id') cardId) {
    return this.cardService.deleteCard(user.uid, cardId);
  }

  @Put(':id/label')
  addLabel(
    @FirebaseUser() user: FirebaseUser,
    @Param('id') cardId,
    @Body() payload,
  ) {
    return this.cardService.addLabel(user.uid, cardId, payload.labelId);
  }

  @Delete(`:id/label`)
  removeLabel(
    @FirebaseUser() user: FirebaseUser,
    @Param('id') cardId,
    @Body() payload,
  ) {
    return this.cardService.removeLabel(user.uid, cardId, payload.labelId);
  }

  @Put(':id/assignee')
  addAssignee(
    @FirebaseUser() user: FirebaseUser,
    @Param('id') cardId,
    @Body() payload,
  ) {
    return this.cardService.addAssignee(user.uid, cardId, payload.assigneeId);
  }

  @Delete(':id/assignee')
  removeAssignee(
    @FirebaseUser() user: FirebaseUser,
    @Param('id') cardId,
    @Body() payload,
  ) {
    return this.cardService.removeAssignee(
      user.uid,
      cardId,
      payload.assigneeId,
    );
  }

  @Put(':id/comment')
  addComment(
    @FirebaseUser() user: FirebaseUser,
    @Param('id') cardId: string,
    @Body() payload: { boardId: string; commentBody: string },
  ) {
    return this.cardService.addComment(
      user.uid,
      cardId,
      payload.boardId,
      payload.commentBody,
    );
  }

  @Delete(':id/comment/:commentId')
  deleteComment(
    @FirebaseUser() user: FirebaseUser,
    @Param('id') cardId: string,
    @Param('commentId') commentId: string,
  ) {
    return this.cardService.deleteComment(user.uid, cardId, commentId);
  }

  @Patch(':id/comment/:commentId')
  modifyComment(
    @FirebaseUser() user: FirebaseUser,
    @Param('id') cardId: string,
    @Param('commentId') commentId: string,
    @Body() payload: { commentBody: string },
  ) {
    return this.cardService.modifyComment(
      user.uid,
      cardId,
      commentId,
      payload.commentBody,
    );
  }
}
