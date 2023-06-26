import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginAssistantDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'password',
    type: 'string',
    default: 'aasasas1212',
    required: true,
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'username',
    type: 'string',
    default: '@valijon',
    required: true,
  })
  username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'tel_number',
    type: 'string',
    default: '99 876 54 32',
    required: true,
  })
  tel_number: string;
}
