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
import { loginAdminDto } from './dto/login-admin.dto';
import { UpdateGroupDto } from '../groups/dto/update-group.dto';

@Injectable()
export class AdminService {
  async registerAdmin(add: CreateAdminDto): Promise<Object> {
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

  async loginAdmin(body: loginAdminDto) {
    const findAdmin = await Admin.findOne({
      where: {
        username: body.username,
        password: body.password,
      },
    }).catch((e) => {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    });

    if (!findAdmin) {
      throw new HttpException(
        'Username or password wrong !',
        HttpStatus.NOT_FOUND,
      );
    }

    const token = jwt.sign({
      id: String(findAdmin?.id),
      password: String(findAdmin?.password),
    });

    return {
      status: HttpStatus.OK,
      token,
    };
  }

  async createAssistants(
    createAssistantsDto: CreateAssistantDto,
  ): Promise<object> {
    const findAssistant: Assistant | any = await Assistant.findOne({
      where: {
        username: createAssistantsDto.username,
      },
    }).catch((e) => {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    });

    if (findAssistant) {
      throw new HttpException(
        `Assistants already exists`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const bcrypt1 = await bcrypt.genSalt();
    const number = await bcrypt.hash(createAssistantsDto.tel_number, bcrypt1);

    const newUser: Assistant = await Assistant.create({
      first_name: createAssistantsDto.first_name,
      last_name: createAssistantsDto.last_name,
      age: createAssistantsDto.age,
      password: createAssistantsDto.password,
      gender: createAssistantsDto.gender,
      position: createAssistantsDto.position,
      img: createAssistantsDto.img,
      username: createAssistantsDto.username,
      tel_number: createAssistantsDto.tel_number,
    })
      .save()
      .catch((e) => {
        throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
      });

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

  async createGroup(createGroup: CreateGroupDto): Promise<Object> {
    const findGroup: Groups | any = await Groups.findOne({
      where: { group_number: createGroup.group_number },
    });

    if (findGroup) {
      throw new HttpException(`Group already exists`, HttpStatus.BAD_REQUEST);
    }

    const groups = await Groups.create({
      assistant: createGroup.assistant,
      group_number: createGroup.group_number,
      img: createGroup.img,
      lesson_time: createGroup.lesson_time,
      lesson_days: createGroup.lesson_days,
      position: createGroup.position,
      room_number: createGroup.room_number,
      teacher: createGroup.teacher,
      open_date: new Date(),
    })
      .save()
      .catch((e) => {
        throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
      });

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

    await Students.create({
      age: createStudent.age,
      first_name: createStudent.first_name,
      gender: createStudent.gender,
      group: createStudent.group,
      img: createStudent.img,
      last_name: createStudent.last_name,
      tel_number: createStudent.tel_number,
      username: createStudent.username,
    })
      .save()
      .catch((e) => {
        throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
      });

    return {
      status: HttpStatus.OK,
    };
  }

  async updateAdmin(
    id: string,
    updateAdminDto: UpdateAdminDto,
  ): Promise<object> {
    await Admin.update(id, updateAdminDto);

    return {
      message: 'The admin stuff has been changed',
      status: HttpStatus.OK,
    };
  }

  async updateGroup(id: string, updateGroup: UpdateGroupDto): Promise<object> {
    await Groups.update(id, updateGroup);

    return {
      message: 'Group items have been changed',
      status: HttpStatus.OK,
    };
  }

  async removeGroup(id: string): Promise<object> {
    await Groups.delete(id);

    return {
      message: 'The group has been deleted',
      status: HttpStatus.OK,
    };
  }

  async removeAssistant(id: string): Promise<object> {
    await Assistant.delete(id);

    return {
      message: 'Assistant teacher information has been deleted',
      status: HttpStatus.OK,
    };
  }
}
