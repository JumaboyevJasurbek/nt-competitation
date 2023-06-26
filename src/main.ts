import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { swaggerConfig } from './config/swagger';
import { ErrorHandler } from './filter/custom.exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule } from '@nestjs/swagger';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.enableCors({ credentials: true });
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new ErrorHandler());

  app.use(
    cors({
      origin: '*',
      credentials: true,
    }),
  );

  const config = app.get(ConfigService);
  const port = config.getOrThrow('app.port');
  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('api', app, document);

  await app.listen(port);
}
bootstrap();
