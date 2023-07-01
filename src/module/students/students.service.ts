import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { Students } from 'src/entities/students.entity ';
import { Tasks } from 'src/entities/task.entity';
import { ratingGroupDto } from '../groups/dto/rating-group.dto';
import { Request } from 'express';

@Injectable()
export class StudentsService {
  create(createStudentDto: CreateStudentDto) {
    return 'This action adds a new student';
  }

  async findAll(): Promise<Students> {
    const students: Students[] | any = await Students.find();

    return students;
  }

  async markRating(group: ratingGroupDto, req: Request) {
    if (!req.assistant) {
      throw new HttpException('You are not Assistant', HttpStatus.BAD_REQUEST);
    }

    const groupId = group.group;

    console.log(groupId);

    const rating = await Tasks.createQueryBuilder('tasks')
      .innerJoin('tasks.student', 's')
      .select('s.first_name, s.last_name, s.username, tasks.mark')
      // .groupBy('tasks.id, s.id')
      .orderBy({ 'tasks.mark': 'ASC' })
      .where('s.group = :groupId', { groupId })
      .getRawMany();

    console.log(rating);

    return rating;
  }
  async findOne(id: string): Promise<Students> {
    const student = await Students.findOne({
      where: { id: id },
    });

    return student;
  }

  // update(id: number, updateStudentDto: UpdateStudentDto) {
  //   return `This action updates a #${id} student`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} student`;
  // }
}
