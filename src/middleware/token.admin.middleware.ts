import {
  Injectable,
  NestMiddleware,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Admin } from 'src/entities/admin.entity';
import jwt from 'src/utils/jwt';

@Injectable()
export class TokenAdminMiddleWare implements NestMiddleware {
  async use(req: Request, _: Response, next: NextFunction) {
    const { headers }: any = req;

    if (!headers.autharization) {
      console.log('admin');

      throw new HttpException('Bad Request in Token', HttpStatus.BAD_REQUEST);
    }
    const findAdmin = jwt.verify(headers.autharization);

    if (!findAdmin || !findAdmin?.id) {
      throw new HttpException('Bad Request in Token', HttpStatus.BAD_REQUEST);
    }
    // const admin = await Admin.findOne({
    //   where: {
    //     id: findAdmin?.id,
    //     password: findAdmin?.password,
    //   },
    // });

    // if (!user?.password) {
    //   throw new HttpException('Password not found', HttpStatus.BAD_REQUEST);
    // } else if (!user?.username) {
    //   throw new HttpException('Username not found', HttpStatus.BAD_REQUEST);
    // }

    // if (
    //   admin?.id !== admin?.id &&
    //   admin?.password !== admin?.password
    // ) {
    //   throw new HttpException(' This is not admin token', HttpStatus.BAD_REQUEST);
    // }

    // req.id = user.id;
    next();
  }
}
