import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { Admin } from 'src/entities/admin.entity';
import { Assistant } from 'src/entities/assistant.entity';
import { Groups } from 'src/entities/groups.entity';
import { Students } from 'src/entities/students.entity ';
dotenv.config();

export const connectDb: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'tiny.db.elephantsql.com',
  port: 5432,
  password: 'QqjMYGge3fpt9NZgfBJNyKrUlPT1fv7d',
  username: 'jqadiugi',
  database: 'jqadiugi',
  entities: [Assistant, Groups, Students, Admin],
  autoLoadEntities: true,
  synchronize: true,
};
