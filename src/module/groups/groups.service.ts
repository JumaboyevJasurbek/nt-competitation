import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Groups } from 'src/entities/groups.entity';

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

  async findOne(id: string) {
    return await Groups.findOne({
      where: {
        id: id,
      },
    }).catch((e) => {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    });
  }

  // async ratingGroup() {
  //   const groups: Groups[] | any = await Groups.find({
  //     relations: {
  //       student: true,
  //       assistant: true,
  //     },
  //   });
  //   const count = await Students.createQueryBuilder('students')
  //     .innerJoin('students.group', 'group')
  //     .select('*, COUNT(students.group)', 'count')
  //     // .groupBy('students.id')
  //     .getRawMany();

  //   return count;
  // }

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
