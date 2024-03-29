import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Delete,
} from '@nestjs/common';
import { FirebaseUser } from 'src/firebase/firebaseUser.decorator';
import { BoardService } from './board.service';

@Controller('board')
export class BoardController {
  constructor(private boardService: BoardService) {}

  @Get()
  getBoards(@FirebaseUser() user: FirebaseUser) {
    return this.boardService.getBoards(user.uid);
  }

  @Get(':id')
  getBoardById(
    @FirebaseUser() user: FirebaseUser,
    @Param('id') boardId: string,
  ) {
    return this.boardService.getBoardById(user.uid, boardId);
  }

  @Post()
  createBoard(@FirebaseUser() user: FirebaseUser, @Body() boardPayload) {
    return this.boardService.createBoard(user.uid, boardPayload);
  }

  @Patch(':id')
  updateBoard(
    @FirebaseUser() user: FirebaseUser,
    @Param('id') boardId: string,
    @Body() updateBoardPayload: any,
  ) {
    return this.boardService.updateBoard(user.uid, boardId, updateBoardPayload);
  }

  @Patch(`:id/reorder`)
  moveColumn(
    @FirebaseUser() user: FirebaseUser,
    @Param('id') boardId: string,
    @Body() reorderColumnPayload: any,
  ) {
    return this.boardService.reorderColumns(
      user.uid,
      boardId,
      reorderColumnPayload,
    );
  }

  // todo clean from starred

  @Delete(':id')
  deleteBoard(
    @FirebaseUser() user: FirebaseUser,
    @Param('id') boardId: string,
  ) {
    return this.boardService.deleteBoard(user.uid, boardId);
  }

  @Post(`:id/share`)
  shareBoard(
    @FirebaseUser() user: FirebaseUser,
    @Param('id') boardId: string,
    @Body() payload: any,
  ) {
    return this.boardService.shareBoard(user.uid, boardId, payload.emailList);
  }

  @Delete(`:boardId/user/:userUID`)
  removeUserFromBoard(
    @FirebaseUser() user: FirebaseUser,
    @Param('boardId') boardId: string,
    @Param('userUID') userUID: string,
  ) {
    return this.boardService.removeUserFromBoard(user.uid, boardId, userUID);
  }
}
