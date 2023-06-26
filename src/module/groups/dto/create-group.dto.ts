import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsArray } from 'class-validator';
import { Assistant } from 'src/entities/assistant.entity';

export class CreateGroupDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'position',
    type: 'string',
    default: 'Fullstack',
    required: true,
  })
  position: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    name: 'group_number',
    type: 'number',
    default: 1,
    required: true,
  })  
  group_number: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'teacher',
    type: 'string',
    default: 'Shokir',
    required: true,
  })
  teacher: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'assistant',
    type: 'string',
    default: 'assistant_uuid....',
    required: true,
  })
  assistant: Assistant;

  @IsArray()
  @IsNotEmpty()
  @ApiProperty({
    name: 'lesson_days',
    type: 'Array',
    default: ['dush', 'chor', 'jum'],
    required: true,
  })
  lesson_days: string[];

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'lesson_time',
    type: 'string',
    default: '12',
    required: true,
  })
  lesson_time: string;


  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'img',
    type: 'string',
    default:
      'data:image/png;base64,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',
    required: true,
  })
  img: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    name: 'room_number',
    type: 'number',
    default: 1,
    required: true,
  })
  room_number: number;
}
