import { ApiProperty } from '@nestjs/swagger';
import { Groups } from 'src/entities/groups.entity';

export class ratingGroupDto {
  @ApiProperty({
    name: 'group',
    type: 'string',
    default: 'group.uuid......',
    required: true,
  })
  group: Groups;
}
