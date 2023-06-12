import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface FirebaseUser {
  name: string;
  picture: string;
  iss: string;
  aud: string;
  auth_time: number;
  user_id: string;
  sub: string;
  iat: number;
  exp: number;
  email: string;
  email_verified: boolean;
  firebase: { identities: any; sign_in_provider: string };
  uid: string;
}

export const FirebaseUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request['firebaseUser'];
  },
);
