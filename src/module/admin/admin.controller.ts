import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { CreateAssistantDto } from '../assistants/dto/create-assistant.dto';
import { CreateGroupDto } from '../groups/dto/create-group.dto';
import { CreateStudentDto } from '../students/dto/create-student.dto';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @Post('/assistant')
  @ApiHeader({
    name: 'autharization',
    description: 'Admin token',
    required: true,
  })
  createAssistant(@Body() createAssistantsDto: CreateAssistantDto) {
    return this.adminService.createAssistants(createAssistantsDto);
  }

  @Post('/group')
  @ApiHeader({
    name: 'autharization',
    description: 'Admin token',
    required: true,
  })
  createGroups(@Body() createGroups: CreateGroupDto) {
    return this.adminService.createGroup(createGroups);
  }

  @Post('/student')
  @ApiHeader({
    name: 'autharization',
    description: 'Admin token',
    required: true,
  })
  createStudent(@Body() createStudent: CreateStudentDto) {
    return this.adminService.createStudent(createStudent);
  }

  @Get()
  @ApiHeader({
    name: 'autharization',
    description: 'Admin token',
    required: true,
  })
  findAll() {
    return this.adminService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}
