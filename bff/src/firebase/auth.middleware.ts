import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { FirebaseService } from './firebase.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private firebaseService: FirebaseService) {}

  use(req, res, next) {
    const token = req.headers.authorization;
    if (token != null && token != '' && token) {
      this.firebaseService.auth
        .verifyIdToken(token.replace('Bearer ', ''))
        .then(async (decodedToken: any) => {
          req['firebaseUser'] = decodedToken;
          next();
        })
        .catch((error) => {
          console.error(error.errorInfo);
          this.accessDenied(req.url, res, error.errorInfo);
        });
    } else {
      throw new UnauthorizedException('Bearer token is missing!');
    }
  }

  private accessDenied(url: string, res, errorInfo: any) {
    res.status(403).json({
      statusCode: 403,
      timestamp: new Date().toISOString(),
      path: url,
      code: errorInfo.code,
      message: errorInfo.message,
    });
  }
}
