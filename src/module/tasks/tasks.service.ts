import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Tasks } from 'src/entities/task.entity';

@Injectable()
export class TasksService {
  findAll(): Promise<Tasks> {
    const tasks: Tasks | any = Tasks.find();

    return tasks;
  }

  findOne(id: string): Promise<Tasks> {
    const tasks: Tasks | any = Tasks.findOne({
      where: {
        id,
      },
    });

    return tasks;
  }
}
