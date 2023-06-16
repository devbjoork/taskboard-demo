import { Controller, Get } from '@nestjs/common';
import { BoardService } from './board.service';

@Controller('theme')
export class ThemeController {
  constructor(private boardService: BoardService) {}

  @Get()
  getAllThemes() {
    return this.boardService.getAllThemes();
  }
}
