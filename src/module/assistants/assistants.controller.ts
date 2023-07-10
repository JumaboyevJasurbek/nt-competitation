import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Req,
} from '@nestjs/common';
import { AssistantsService } from './assistants.service';
import { UpdateAssistantDto } from './dto/update-assistant.dto';
import {
  ApiBadRequestResponse,
  ApiHeader,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LoginAssistantDto } from './dto/login-assistants.dto';
import { CreateTaskDto } from '../tasks/dto/create-task.dto';
import { UpdateTaskDto } from '../tasks/dto/update-task.dto';
import { Request } from 'express';
import { Assistant } from 'src/entities/assistant.entity';

@Controller('assistants')
@ApiTags('Assistants')
export class AssistantsController {
  constructor(private readonly assistantsService: AssistantsService) {}

  @Get()
  findAll() {
    return this.assistantsService.findAll();
  }

  // @Get('/group-pagination/:skip/:take')
  // @ApiHeader({
  //   name: 'autharization',
  //   description: 'Assistants token',
  //   required: true,
  // })
  // paginationGroups(
  //   @Param('skip') skip: number,
  //   @Param('take') take: number,
  //   @Req() req: Request,
  // ) {
  //   return this.assistantsService.paginationGroups(+skip, +take, req);
  // }

  @Get('/group-pagination')
  @ApiHeader({
    name: 'autharization',
    description: 'Assistants token',
    required: true,
  })
  async getPaginateGroup(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
    @Req() req: Request,
  ) {
    return this.assistantsService.paginationGroups(+page, +pageSize, req);
  }

  @Get('/student-pagination')
  @ApiHeader({
    name: 'autharization',
    description: 'Assistants token',
    required: true,
  })
  async getPaginateStudent(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
    @Req() req: Request,
  ) {
    return this.assistantsService.paginationStudents(+page, +pageSize, req);
  }

  @Post('/login')
  @ApiBadRequestResponse()
  @ApiOkResponse()
  @ApiNotFoundResponse()
  login(@Body() body: LoginAssistantDto) {
    return this.assistantsService.loginAssistant(body);
  }

  @Post('/create-task/:assistantId')
  @ApiBadRequestResponse()
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiHeader({
    name: 'autharization',
    description: 'Assistants token',
    required: true,
  })
  async createTask(
    @Body() body: CreateTaskDto,
    @Param('assistantId') assistant: string,
    @Req() req: Request,
  ) {
    return await this.assistantsService.createTask(body, assistant, req);
  }

  @Patch(':id')
  @ApiBadRequestResponse()
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiHeader({
    name: 'autharization',
    description: 'Assistants token',
    required: true,
  })
  updateTasks(
    @Param('id') id: string,
    @Body() updateTasks: UpdateTaskDto,
    @Req() req: Request,
  ) {
    return this.assistantsService.updateTask(id, updateTasks, req);
  }

  @Patch(':id')
  @ApiBadRequestResponse()
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiHeader({
    name: 'autharization',
    description: 'Assistants token',
    required: true,
  })
  update(
    @Param('id') id: string,
    @Body() updateAssistantDto: UpdateAssistantDto,
    @Req() req: Request,
  ) {
    return this.assistantsService.update(id, updateAssistantDto, req);
  }
}
