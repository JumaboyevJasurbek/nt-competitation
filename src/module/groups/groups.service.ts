import { Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Groups } from 'src/entities/groups.entity';
import { ratingGroupDto } from './dto/rating-group.dto';
import { group } from 'console';
import { Students } from 'src/entities/students.entity ';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';

@Injectable()
export class GroupsService {
  async findAll(): Promise<Groups> {
    const groups: Groups[] | any = await Groups.find({
      relations: {
        student: true,
        assistant: true,
      },
    });

    return groups;
  }

  async ratingGroup() {
    const groups: Groups[] | any = await Groups.find({
      relations: {
        student: true,
        assistant: true,
      },
    });
    const count = await Students.createQueryBuilder('students')
      .innerJoin('students.group', 'group')
      .select('*, COUNT(students.group)', 'count')
      // .groupBy('students.id')
      .getRawMany();

    return count;
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} group`;
  // }

  // update(id: number, updateGroupDto: UpdateGroupDto) {
  //   return `This action updates a #${id} group`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} group`;
  // }
}
