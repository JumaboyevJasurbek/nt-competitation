import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { Admin } from 'src/entities/admin.entity';
import { Assistant } from 'src/entities/assistant.entity';
import { Groups } from 'src/entities/groups.entity';
import { Students } from 'src/entities/students.entity ';
import { Tasks } from 'src/entities/task.entity';
dotenv.config();

export const connectDb: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  password: String(process.env.DB_PASSWORD),
  username: process.env.DB_USERNAME,
  database: process.env.DATABASE,
  entities: [Assistant, Groups, Students, Admin, Tasks],
  autoLoadEntities: true,
  synchronize: true,
};
