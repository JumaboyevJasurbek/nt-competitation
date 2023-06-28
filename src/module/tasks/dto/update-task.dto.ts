import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateTaskDto } from './create-task.dto';
import { IsNumber, IsString } from 'class-validator';
import { Assistant } from 'src/entities/assistant.entity';
import { Groups } from 'src/entities/groups.entity';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @IsString()
  @ApiProperty({
    name: 'task_name',
    type: 'string',
    default: '1-Homework',
    required: true,
  })
  task_name: string;

  @IsNumber()
  @ApiProperty({
    name: 'mark',
    type: 'number',
    default: 4,
    required: true,
  })
  mark: number;

  @IsString()
  @ApiProperty({
    name: 'comment',
    type: 'string',
    default: 'nest js typeorm da crud application qilib kelish',
  })
  comment: string;

  @IsString()
  @ApiProperty({
    name: 'submitted_time',
    type: 'string',
    default: '22:05:2023',
  })
  submitted_time: string;

  @IsString()
  @ApiProperty({
    name: 'assistant',
    type: 'string',
    default: 'assistant.uuid......',
  })
  assistant: Assistant;

  @IsString()
  @ApiProperty({
    name: 'group',
    type: 'string',
    default: 'group.uuid......',
  })
  group: Groups;
}
