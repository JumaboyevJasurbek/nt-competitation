import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAssistantDto } from './dto/create-assistant.dto';
import { UpdateAssistantDto } from './dto/update-assistant.dto';
import { Assistant } from 'src/entities/assistant.entity';
import jwt from 'src/utils/jwt';
import * as bcrypt from 'bcrypt';
import { LoginAssistantDto } from './dto/login-assistants.dto';
import { Groups } from 'src/entities/groups.entity';
import { Tasks } from 'src/entities/task.entity';
import { CreateTaskDto } from '../tasks/dto/create-task.dto';
import { group } from 'console';
import { UpdateTaskDto } from '../tasks/dto/update-task.dto';
import { Request } from 'express';
import { Roles } from 'src/types';
import { Students } from 'src/entities/students.entity ';

@Injectable()
export class AssistantsService {
  async findAll(): Promise<Assistant> {
    const assist: any = await Assistant.find();

    return assist;
  }

  // async paginationGroups(skip: number, take: number, req: Request) {
  //   if (!req.assistant) {
  //     throw new HttpException('You are not Assistant', HttpStatus.BAD_REQUEST);
  //   }
  //   return Groups.getRepository()
  //     .createQueryBuilder('groups')
  //     .skip(skip)
  //     .take(take)
  //     .getMany();
  // }

  async paginationGroups(page: number, pageSize: number, req: Request) {
    if (!req.assistant) {
      throw new HttpException('You are not Assistant', HttpStatus.BAD_REQUEST);
    }
    const skip = (page - 1) * pageSize;
    const queryBuilder = Groups.createQueryBuilder();
    queryBuilder.skip(skip).take(pageSize);
    return queryBuilder.getMany();
  }

  async paginationStudents(page: number, pageSize: number, req: Request) {
    if (!req.assistant) {
      throw new HttpException('You are not Assistant', HttpStatus.BAD_REQUEST);
    }
    const skip = (page - 1) * pageSize;
    const queryBuilder = Students.createQueryBuilder();
    queryBuilder.skip(skip).take(pageSize);
    return queryBuilder.getMany();
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
      role: Roles.ASSISTANT,
    });

    return {
      status: HttpStatus.OK,
      token,
    };
  }

  async createTask(tasks: CreateTaskDto, req: Request) {
    if (!req.assistant) {
      throw new HttpException('You are not Assistant', HttpStatus.BAD_REQUEST);
    }
    const findTask = await Tasks.findOne({
      where: {},
      relations: { assistant: true },
    }).catch((e) => {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    });

    const task_name: any = tasks.task_name;

    if (findTask?.task_name === task_name) {
      throw new HttpException('You have already created a task!', 409);
    }

    const assistants = await Assistant.find().catch((e) => {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    });

    const assistantId = assistants.find((e) => e.id == e.id);

    const assistantId1 = assistantId.id;

    const taskAssistant: any = tasks.assistant;

    if (assistantId1 != taskAssistant) {
      throw new HttpException('Your student not valid', HttpStatus.NOT_FOUND);
    }

    await Tasks.create({
      assistant: tasks.assistant,
      task_name: tasks.task_name,
      comment: tasks.comment,
      date: new Date(),
      submitted_time: tasks.submitted_time,
      student: tasks.student,
      mark: tasks.mark,
    })
      .save()
      .catch((e) => {
        throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
      });

    return {
      message: 'success',
      status: HttpStatus.OK,
    };
  }

  async updateTask(id: string, updateTasks: UpdateTaskDto, req: Request) {
    if (!req.assistant) {
      throw new HttpException('You are not Assistant', HttpStatus.BAD_REQUEST);
    }

    const assistant: any = updateTasks.assistant;

    const findAssistant = await Assistant.findOne({
      where: { id: assistant },
    });

    const updateTask = Tasks.update(id, updateTasks);
  }

  async update(
    id: string,
    updateAssistantDto: UpdateAssistantDto,
    req: Request,
  ) {
    if (!req.assistant) {
      throw new HttpException('You are not Assistant', HttpStatus.BAD_REQUEST);
    }
    const assistant: Assistant | any = await Assistant.update(
      id,
      updateAssistantDto,
    ).catch((e) => {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    });
    return assistant;
  }
}
