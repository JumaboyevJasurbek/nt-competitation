import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Groups } from 'src/entities/groups.entity';

export class ratingGroupDto {
  @IsString()
  @ApiProperty({
    name: 'group',
    type: 'string',
    default: 'group.uuid......',
  })
  group: Groups;
}
