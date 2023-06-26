import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Competitation Project')
  .setVersion('1.0')
  .build();
