import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';

@Controller('groups')
@ApiTags('Groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post()
  @ApiHeader({
    name: 'autharization',
    description: 'Admin token',
    required: true,
  })
  create(@Body() createGroupDto: CreateGroupDto) {
    return this.groupsService.create(createGroupDto);
  }

  @Get()
  @ApiHeader({
    name: 'autharization',
    description: 'Admin token',
    required: true,
  })
  findAll() {
    return this.groupsService.findAll();
  }

  @Get('rating/:columnName/:columnValue?')
  // @ApiHeader({
  //   name: 'autharization',
  //   description: 'Admin token',
  //   required: true,
  // })
  ratingGroup(
    @Param('columnName') columnName: UUID,
    @Param('columnValue') columnValue?: any,
  ) {
    return this.groupsService.ratingGroup(columnName, columnValue);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
    return this.groupsService.update(+id, updateGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupsService.remove(+id);
  }
}
