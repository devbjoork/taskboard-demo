import { Body, Controller, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { FirebaseUser } from 'src/firebase/firebaseUser.decorator';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Patch('star')
  starBoard(@FirebaseUser() user, @Body() starPayload) {
    return this.userService.starBoard(
      user.uid,
      starPayload.boardId,
      starPayload.action,
    );
  }

  @Post('signin')
  saveUserData(@FirebaseUser() user) {
    return this.userService.saveUserData(user);
  }
}
