import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Tasks } from 'src/entities/task.entity';
import { Request } from 'express';

@Injectable()
export class TasksService {
  findAll(req: Request): Promise<Tasks> {
    if (!req.assistant) {
      throw new HttpException('You are not Assistant', HttpStatus.BAD_REQUEST);
    }
    const tasks: Tasks | any = Tasks.find();

    return tasks;
  }

  findOne(id: string, req: Request): Promise<Tasks> {
    if (!req.assistant) {
      throw new HttpException('You are not Assistant', HttpStatus.BAD_REQUEST);
    }
    const tasks: Tasks | any = Tasks.findOne({
      where: {
        id,
      },
    });

    return tasks;
  }
}
