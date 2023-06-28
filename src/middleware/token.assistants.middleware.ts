import {
  Injectable,
  NestMiddleware,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Assistant } from 'src/entities/assistant.entity';
import jwt from 'src/utils/jwt';

@Injectable()
export class TokenAssistantMiddleWare implements NestMiddleware {
  async use(req: Request, _: Response, next: NextFunction) {
    const { headers }: any = req;

    if (!headers.autharization) {
      console.log('assistant');

      throw new HttpException('Bad Request in Token', HttpStatus.BAD_REQUEST);
    }
    const findAssistant = jwt.verify(headers.autharization);

    if (!findAssistant || !findAssistant?.id) {
      throw new HttpException('Bad Request in Token', HttpStatus.BAD_REQUEST);
    }
    // const user = await Assistant.findOne({
    //   where: {
    //     id: findAssistant?.id,
    //     tel_number: findAssistant?.number,
    //     username: findAssistant?.username,
    //   },
    // });

    // if (!user?.tel_number) {
    //   throw new HttpException('Tel number not found', HttpStatus.BAD_REQUEST);
    // } else if (!user?.username) {
    //   throw new HttpException('Username not found', HttpStatus.BAD_REQUEST);
    // }

    // if (
    //   user?.id !== user?.id &&
    //   user?.tel_number !== user?.tel_number &&
    //   user?.username !== user?.username
    // ) {
    //   throw new HttpException(
    //     ' This is not admin token',
    //     HttpStatus.BAD_REQUEST,
    //   );
    // }

    // req.id = user.id;
    next();
  }
}
