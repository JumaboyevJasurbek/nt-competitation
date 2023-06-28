import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
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

@Controller('assistants')
@ApiTags('Assistants')
export class AssistantsController {
  constructor(private readonly assistantsService: AssistantsService) {}

  @Get()
  findAll() {
    return this.assistantsService.findAll();
  }

  @Get('/group-pagination/:skip/:take')
  @ApiHeader({
    name: 'autharization',
    description: 'Assistants token',
    required: true,
  })
  paginationGroups(@Param('skip') skip: number, @Param('take') take: number) {
    return this.assistantsService.paginationGroups(+skip, +take);
  }

  @Get('/group-pagination')
  @ApiHeader({
    name: 'autharization',
    description: 'Assistants token',
    required: true,
  })
  async getPaginatedResults(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ) {
    return this.assistantsService.paginate(+page, +pageSize);
  }

  @Post('/login')
  @ApiBadRequestResponse()
  @ApiOkResponse()
  @ApiNotFoundResponse()
  login(@Body() body: LoginAssistantDto) {
    return this.assistantsService.loginAssistant(body);
  }

  @Post('/create-task')
  @ApiBadRequestResponse()
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiHeader({
    name: 'autharization',
    description: 'Assistants token',
    required: true,
  })
  async createTask(@Body() body: CreateTaskDto) {
    return await this.assistantsService.createTask(body);
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
  ) {
    return this.assistantsService.updateTask(id, updateTasks);
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
  ) {
    return this.assistantsService.update(id, updateAssistantDto);
  }
}
