import { Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Groups } from 'src/entities/groups.entity';

@Injectable()
export class GroupsService {
  async create(createGroupDto: CreateGroupDto): Promise<Groups> {
    const groups: Groups[] | any = await Groups.createQueryBuilder()
      .insert()
      .into(Groups)
      .values({
        position: createGroupDto.position,
        teacher: createGroupDto.teacher,
        lesson_days: createGroupDto.lesson_days,
        img: createGroupDto.img,
        assistant: createGroupDto.assistant,
        group_number: createGroupDto.group_number,
      })
      .execute();

    return groups;
  }

  async findAll(): Promise<Groups> {
    const groups: Groups[] | any = await Groups.find({
      relations: {
        student: true,
        assistant: true,
      },
    });

    return groups;
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
