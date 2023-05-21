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
  getBoards(@FirebaseUser() user) {
    return this.boardService.getBoards(user.uid);
  }

  @Get(':id')
  getBoardById(@FirebaseUser() user, @Param('id') boardId: string) {
    return this.boardService.getBoardById(user.uid, boardId);
  }

  @Post()
  createBoard(@FirebaseUser() user, @Body() boardPayload) {
    return this.boardService.createBoard(user.uid, boardPayload);
  }

  @Patch(':id')
  updateBoard(
    @FirebaseUser() user,
    @Param('id') boardId: string,
    @Body() updateBoardPayload: any,
  ) {
    return this.boardService.updateBoard(user.uid, boardId, updateBoardPayload);
  }

  @Patch(`:id/reorder`)
  moveColumn(
    @FirebaseUser() user,
    @Param('id') boardId: string,
    @Body() reorderColumnPayload: any,
  ) {
    return this.boardService.reorderColumns(
      user,
      boardId,
      reorderColumnPayload,
    );
  }

  @Delete(':id')
  deleteBoard(@FirebaseUser() user, @Param('id') boardId: string) {
    return this.boardService.deleteBoard(user.uid, boardId);
  }
}
