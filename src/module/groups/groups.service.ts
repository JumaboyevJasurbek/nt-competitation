import { Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Groups } from 'src/entities/groups.entity';

@Injectable()
export class GroupsService {
  async create(createGroupDto: CreateGroupDto) {
    return await Groups.createQueryBuilder().insert().into(Groups).values({
      position: createGroupDto.position,
      teacher: createGroupDto.teacher,
      lesson_days: createGroupDto.lesson_days,
      img: createGroupDto.img,
      assistant: createGroupDto.assistant,
      group_number: createGroupDto.group_number,
    });
  }

  async findAll(): Promise<Groups> {
    const group: any = await Groups.find();
    return group;
  }

  findOne(id: number) {
    return `This action returns a #${id} group`;
  }

  update(id: number, updateGroupDto: UpdateGroupDto) {
    return `This action updates a #${id} group`;
  }

  remove(id: number) {
    return `This action removes a #${id} group`;
  }
}
