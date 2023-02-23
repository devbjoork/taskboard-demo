import { Module } from '@nestjs/common';
import { AuthMiddleware } from './auth.middleware';
import { FirebaseService } from './firebase.service';

@Module({
  providers: [FirebaseService, AuthMiddleware],
  exports: [FirebaseService, AuthMiddleware],
})
export class FirebaseModule {}
