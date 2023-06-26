import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateAdminDto } from './create-admin.dto';
import { IsString } from 'class-validator';

export class UpdateAdminDto extends PartialType(CreateAdminDto) {
  @IsString()
  @ApiProperty({
    name: 'username',
    type: 'string',
    default: 'Ali',
    required: true,
  })
  readonly username: string;

  @IsString()
  @ApiProperty({
    name: 'password',
    type: 'string',
    default: 'Ali1212',
    required: true,
  })
  readonly password: string;
}
