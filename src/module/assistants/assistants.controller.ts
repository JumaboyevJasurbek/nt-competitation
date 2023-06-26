import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
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

@Controller('assistants')
@ApiTags('Assistants')
export class AssistantsController {
  constructor(private readonly assistantsService: AssistantsService) {}

  @Get()
  findAll() {
    return this.assistantsService.findAll();
  }

  @Post('/login')
  @ApiBadRequestResponse()
  @ApiOkResponse()
  @ApiNotFoundResponse()
  login(@Body() body: LoginAssistantDto) {
    return this.assistantsService.loginAssistant(body);
  }

  @Patch(':id')
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
