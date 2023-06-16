import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { FirebaseUser } from 'src/firebase/firebaseUser.decorator';
import { ColumnService } from './column.service';

@Controller('column')
export class ColumnController {
  constructor(private columnService: ColumnService) {}

  @Get(':id')
  findColumnById(
    @FirebaseUser() user: FirebaseUser,
    @Param('id') columnId: string,
  ) {
    return this.columnService.findColumnById(user.uid, columnId);
  }

  @Get()
  findColumnsByBoard(
    @FirebaseUser() user: FirebaseUser,
    @Query('boardId') boardId: string,
  ) {
    return this.columnService.findColumnsByBoardId(user.uid, boardId);
  }

  @Post()
  createColumn(@FirebaseUser() user: FirebaseUser, @Body() columnPayload: any) {
    return this.columnService.createColumn(user.uid, columnPayload);
  }

  @Patch(':id')
  modifyColumn(
    @FirebaseUser() user: FirebaseUser,
    @Param('id') columnId: string,
    @Body() updatedColumnPayload: any,
  ) {
    return this.columnService.updateColumn(
      user.uid,
      columnId,
      updatedColumnPayload,
    );
  }

  @Delete(':id')
  deleteColumn(@FirebaseUser() user: FirebaseUser, @Param('id') columnId) {
    return this.columnService.deleteColumn(user.uid, columnId);
  }
}
