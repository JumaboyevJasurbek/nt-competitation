import { Controller, Get, Post, Body, Param, Req } from '@nestjs/common';
import { StudentsService } from './students.service';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { ratingGroupDto } from '../groups/dto/rating-group.dto';
import { Request } from 'express';
import { v4 as uuidv4 } from 'uuid';

@Controller('students')
@ApiTags('Students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  // @Post()
  // create(@Body() createStudentDto: CreateStudentDto) {
  //   return this.studentsService.create(createStudentDto);
  // }

  @Get()
  findAll() {
    return this.studentsService.findAll();
  }

  @Post('mark')
  @ApiHeader({
    name: 'autharization',
    description: 'Assistants token',
    required: true,
  })
  async markRating(@Body() group: ratingGroupDto, @Req() req: Request) {
    return await this.studentsService.markRating(group, req);
  }

  @Get(':student')
  findStudent(@Param('student') student: string) {
    return this.studentsService.findStudents(student);
  }
  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentsService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
  //   return this.studentsService.update(+id, updateStudentDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.studentsService.remove(+id);
  // }
}
