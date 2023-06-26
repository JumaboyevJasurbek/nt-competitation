import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { Students } from 'src/entities/students.entity ';

@Injectable()
export class StudentsService {
  create(createStudentDto: CreateStudentDto) {
    return 'This action adds a new student';
  }

  async findAll(): Promise<Students> {
    const students: Students[] | any = await Students.find();

    return students;
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} student`;
  // }

  // update(id: number, updateStudentDto: UpdateStudentDto) {
  //   return `This action updates a #${id} student`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} student`;
  // }
}
