import { Injectable } from '@nestjs/common';
import { CreateAssistantDto } from './dto/create-assistant.dto';
import { UpdateAssistantDto } from './dto/update-assistant.dto';
import { Assistant } from 'src/entities/assistant.entity';

@Injectable()
export class AssistantsService {
  create(createAssistantDto: CreateAssistantDto) {
    return 'This action adds a new assistant';
  }

  async findAll(): Promise<Assistant> {
    const assist: any = await Assistant.find();

    return assist;
  }

  findOne(id: number) {
    return `This action returns a #${id} assistant`;
  }

  update(id: number, updateAssistantDto: UpdateAssistantDto) {
    return `This action updates a #${id} assistant`;
  }

  remove(id: number) {
    return `This action removes a #${id} assistant`;
  }
}
