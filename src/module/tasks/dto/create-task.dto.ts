import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { type } from 'os';
import { Assistant } from 'src/entities/assistant.entity';
import { Groups } from 'src/entities/groups.entity';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'task_name',
    type: 'string',
    default: '1-Homework',
    required: true,
  })
  task_name: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    name: 'mark',
    type: 'number',
    default: 4,
    required: true,
  })
  mark: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'comment',
    type: 'string',
    default: 'nest js typeorm da crud application qilib kelish',
  })
  comment: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'submitted_time',
    type: 'string',
    default: '22:05:2023',
  })
  submitted_time: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'assistant',
    type: 'string',
    default: 'assistant.uuid......',
  })
  assistant: Assistant;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'group',
    type: 'string',
    default: 'group.uuid......',
  })
  group: Groups;
}
