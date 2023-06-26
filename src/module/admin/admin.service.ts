import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import jwt from 'src/utils/jwt';
import * as bcrypt from 'bcrypt';
import { Admin } from 'src/entities/admin.entity';
import { Assistant } from 'src/entities/assistant.entity';
import { CreateAssistantDto } from '../assistants/dto/create-assistant.dto';
import { CreateGroupDto } from '../groups/dto/create-group.dto';
import { Groups } from 'src/entities/groups.entity';
import { CreateStudentDto } from '../students/dto/create-student.dto';
import { Students } from 'src/entities/students.entity ';

@Injectable()
export class AdminService {
  async create(add: CreateAdminDto) {
    const findAdmin: Admin | any = await Admin.findOne({
      where: {
        username: add.username,
      },
    }).catch(() => null);

    if (findAdmin) {
      throw new HttpException(`Admin already exists`, HttpStatus.BAD_REQUEST);
    }

    const bcrypt1 = await bcrypt.genSalt();
    const password = await bcrypt.hash(add.password, bcrypt1);

    const newAdmin = await Admin.create({
      username: add.username,
      password: add.password,
    }).save();

    const token = jwt.sign({
      id: newAdmin?.id,
      password: password,
    });

    return {
      status: HttpStatus.OK,
      token,
    };
  }

  async createAssistants(createAssistantsDto: CreateAssistantDto) {
    const findAssistant: Assistant | any = await Assistant.findOne({
      where: {
        username: createAssistantsDto.username,
      },
    }).catch(() => null);

    if (findAssistant) {
      throw new HttpException(
        `Assistants already exists`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const bcrypt1 = await bcrypt.genSalt();
    const number = await bcrypt.hash(createAssistantsDto.tel_number, bcrypt1);

    const newUser = await Assistant.create({
      first_name: createAssistantsDto.first_name,
      last_name: createAssistantsDto.last_name,
      age: createAssistantsDto.age,
      gender: createAssistantsDto.gender,
      position: createAssistantsDto.position,
      img: createAssistantsDto.img,
      username: createAssistantsDto.username,
      tel_number: createAssistantsDto.tel_number,
    }).save();

    const token = jwt.sign({
      id: newUser?.id,
      username: newUser.username,
      number: number,
    });

    return {
      status: HttpStatus.OK,
      token: token,
    };
  }

  async createGroup(createGroup: CreateGroupDto) {
    const findGroup: Groups | any = await Groups.findOne({
      where: { group_number: createGroup.group_number },
    });

    if (findGroup) {
      throw new HttpException(`Group already exists`, HttpStatus.BAD_REQUEST);
    }

    const groups = await Groups.create({
      assistant: createGroup?.assistant,
      group_number: createGroup.group_number,
      img: createGroup.img,
      lesson_time: createGroup.lesson_time,
      lesson_days: createGroup.lesson_days,
      position: createGroup.position,
      room_number: createGroup.room_number,
      teacher: createGroup.teacher,
      open_date: new Date(),
    }).save();

    return {
      status: HttpStatus.OK,
    };
  }

  async createStudent(createStudent: CreateStudentDto) {
    const findStudent = await Students.findOne({
      where: { username: createStudent.username },
    });



    if (findStudent) {
      throw new HttpException(`Student already exists`, HttpStatus.BAD_REQUEST);
    }

    const newStudent = await Students.create({
      age: createStudent.age,
      first_name: createStudent.first_name,
      gender: createStudent.gender,
      group: createStudent.group,
      img: createStudent.img,
      last_name: createStudent.last_name,
      tel_number: createStudent.tel_number,
      username: createStudent.username,
    }).save()
    .catch((e)=> {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
    })

    return {
      status: HttpStatus.OK,
    };
  }

  findAll() {
    return `This action returns all admin`;
  }

  findOne(id: number) {
    return `This action returns a #${id} admin`;
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return `This action updates a #${id} admin`;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }
}
