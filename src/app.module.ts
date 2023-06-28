import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { connectDb } from './ormconfig/typeorm.config';
import { config } from './config';
import { AssistantsModule } from './module/assistants/assistants.module';
import { TokenAssistantMiddleWare } from './middleware/token.assistants.middleware';
import { TokenAdminMiddleWare } from './middleware/token.admin.middleware';
import { StudentsModule } from './module/students/students.module';
import { GroupsModule } from './module/groups/groups.module';
import { AdminModule } from './module/admin/admin.module';
import { JwtModule } from '@nestjs/jwt';
import { TasksModule } from './module/tasks/tasks.module';

@Module({
  imports: [
    ConfigModule.forRoot(config),
    TypeOrmModule.forRoot(connectDb),
    JwtModule.register({
      secret: process.env.SECRET_KEY,
    }),
    AssistantsModule,
    StudentsModule,
    GroupsModule,
    AdminModule,
    TasksModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Admin
    consumer
      .apply(TokenAdminMiddleWare)
      .exclude(
        { path: '/students', method: RequestMethod.GET },
        { path: '/admin', method: RequestMethod.POST },
        { path: '/groups', method: RequestMethod.GET },
        { path: '/assistants/login', method: RequestMethod.POST },
        { path: '/assistants/:id', method: RequestMethod.POST },
        { path: '/assistants/login', method: RequestMethod.POST },
        { path: '/group-pagination', method: RequestMethod.GET },
        { path: '/pagination', method: RequestMethod.GET },
        { path: '/create-task', method: RequestMethod.POST },
        { path: '/tasks', method: RequestMethod.GET },
        { path: '/tasks/:id', method: RequestMethod.GET },
        {
          path: '/groups/rating/:columnName/:columnValue',
          method: RequestMethod.GET,
        },
      )

      .forRoutes({ path: '/**', method: RequestMethod.ALL });
    // Assistant
    consumer
      .apply(TokenAssistantMiddleWare)
      .exclude(
        { path: '/students', method: RequestMethod.GET },
        { path: '/students', method: RequestMethod.POST },
        { path: '/groups', method: RequestMethod.GET },
        { path: '/groups', method: RequestMethod.POST },
        { path: '/admin', method: RequestMethod.POST },
        { path: '/admin/assistant', method: RequestMethod.POST },
        { path: '/admin/group', method: RequestMethod.POST },
        { path: '/assistants/login', method: RequestMethod.POST },
        {
          path: '/groups/rating/:columnName/:columnValue',
          method: RequestMethod.GET,
        },
      )
      .forRoutes({ path: '/**', method: RequestMethod.ALL });
  }
}
