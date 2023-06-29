import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { CreateAssistantDto } from '../assistants/dto/create-assistant.dto';
import { CreateGroupDto } from '../groups/dto/create-group.dto';
import { CreateStudentDto } from '../students/dto/create-student.dto';
import { loginAdminDto } from './dto/login-admin.dto';
import { Request } from 'express';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  registerAdmin(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.registerAdmin(createAdminDto);
  }

  @Post('/login')
  loginAdmin(@Body() loginAdmin: loginAdminDto) {
    return this.adminService.loginAdmin(loginAdmin);
  }

  @Post('/assistant')
  @ApiHeader({
    name: 'autharization',
    description: 'Admin token',
    required: true,
  })
  createAssistant(
    @Body() createAssistantsDto: CreateAssistantDto,
    @Req() req: Request,
  ) {
    return this.adminService.createAssistants(createAssistantsDto, req);
  }

  @Post('/group')
  @ApiHeader({
    name: 'autharization',
    description: 'Admin token',
    required: true,
  })
  createGroups(@Body() createGroups: CreateGroupDto, @Req() req: Request) {
    return this.adminService.createGroup(createGroups, req);
  }

  @Post('/student')
  @ApiHeader({
    name: 'autharization',
    description: 'Admin token',
    required: true,
  })
  createStudent(@Body() createStudent: CreateStudentDto, @Req() req: Request) {
    return this.adminService.createStudent(createStudent, req);
  }

  @Patch(':id')
  @ApiHeader({
    name: 'autharization',
    description: 'Admin token',
    required: true,
  })
  updateAdmin(
    @Param('id') id: string,
    @Body() updateAdminDto: UpdateAdminDto,
    @Req() req: Request,
  ) {
    return this.adminService.updateAdmin(id, updateAdminDto, req);
  }

  @Delete('/group/:id')
  @ApiHeader({
    name: 'autharization',
    description: 'Admin token',
    required: true,
  })
  removeGroup(@Param('id') id: string, @Req() req: Request) {
    return this.adminService.removeGroup(id, req);
  }

  @Delete('/assistant/:id')
  @ApiHeader({
    name: 'autharization',
    description: 'Admin token',
    required: true,
  })
  removeAssistant(@Param('id') id: string, @Req() req: Request) {
    return this.adminService.removeAssistant(id, req);
  }
}
