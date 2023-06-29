import {
  Injectable,
  NestMiddleware,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import jwt from '../utils/jwt';
import { TokenRole, AdminTokenType, AssistantTokenType } from 'src/types';

@Injectable()
export class TokenMiddleWare implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const autharization: string | any = req.headers.autharization;
    if (!autharization || typeof autharization !== 'string') {
      throw new HttpException('Invalid Token', HttpStatus.BAD_REQUEST);
    }

    const adminVerifyToken: AdminTokenType | string = jwt.verify(autharization);

    const assistantVerifyToken: AssistantTokenType | string =
      jwt.verify(autharization);

    if (typeof adminVerifyToken == 'string') {
      throw new HttpException('Invalid Token', HttpStatus.BAD_REQUEST);
    }

    if (adminVerifyToken.role == TokenRole.admin) {
      req.admin = true;
      req.assistant = false;
    }

    if (typeof assistantVerifyToken == 'string') {
      throw new HttpException('Invalid Token', HttpStatus.BAD_REQUEST);
    }

    if (assistantVerifyToken.role == TokenRole.assistant) {
      req.admin = false;
      req.assistant = true;
    }
    next();
  }
}
