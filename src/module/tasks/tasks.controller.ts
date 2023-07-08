import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

@Controller('tasks')
@ApiTags('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  @ApiHeader({
    name: 'autharization',
    description: 'Assistant token',
    required: true,
  })
  findAll(@Req() req: Request) {
    return this.tasksService.findAll(req);
  }

  @Get(':id')
  @ApiHeader({
    name: 'autharization',
    description: 'Assistant token',
    required: true,
  })
  findOne(@Param('id') id: string, @Req() req: Request) {
    this.tasksService.findOne(id, req);
  }
}
