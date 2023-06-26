import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAssistantDto } from './dto/create-assistant.dto';
import { UpdateAssistantDto } from './dto/update-assistant.dto';
import { Assistant } from 'src/entities/assistant.entity';
import jwt from 'src/utils/jwt';
import * as bcrypt from 'bcrypt';
import { LoginAssistantDto } from './dto/login-assistants.dto';

@Injectable()
export class AssistantsService {
  async findAll(): Promise<Assistant> {
    const assist: any = await Assistant.find();

    return assist;
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} assistant`;
  // }

  async loginAssistant(body: LoginAssistantDto) {
    const findAssistant = await Assistant.findOne({
      where: {
        username: body.username,
        tel_number: body.tel_number,
        password: body.password,
      },
    }).catch((e) => {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    });

    if (!findAssistant) {
      throw new HttpException(
        'Username, password or tel number wrong',
        HttpStatus.NOT_FOUND,
      );
    }

    const bcrypt1 = await bcrypt.genSalt();
    const number = await bcrypt.hash(body.tel_number, bcrypt1);

    const token = jwt.sign({
      id: findAssistant.id,
      username: findAssistant.username,
      number: number,
    });

    return {
      status: HttpStatus.OK,
      token,
    };
  }

   async update(
    id: string,
    updateAssistantDto: UpdateAssistantDto,
  ): Promise<Assistant> {
    const assistant: Assistant | any = await Assistant.update(
      id,
      updateAssistantDto,
    ).catch((e) => {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    });
    return assistant;
  }
}
