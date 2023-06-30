import { Controller, Get } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('groups')
@ApiTags('Groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Get()
  findAll() {
    return this.groupsService.findAll();
  }

  @Get('rating')
  ratingGroup() {
    return this.groupsService.ratingGroup();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.groupsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
  //   return this.groupsService.update(+id, updateGroupDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.groupsService.remove(+id);
  // }
}
