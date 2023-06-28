import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { ApiHeader, ApiTags } from '@nestjs/swagger';

@Controller('tasks')
@ApiTags("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  @ApiHeader({
    name: 'autharization',
    description: 'Assistant token',
    required: true,
  })
  findAll() {
    return this.tasksService.findAll();
  }

  @Get(':id')
  @ApiHeader({
    name: 'autharization',
    description: 'Assistant token',
    required: true,
  })
  findOne(@Param('id') id: string) {
    this.tasksService.findOne(id);
  }
}
