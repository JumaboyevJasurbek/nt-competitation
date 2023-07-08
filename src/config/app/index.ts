import { registerAs } from '@nestjs/config';

class AppConfig {
  readonly port: number;
}

export const appConfig = registerAs(
  'app',
  (): AppConfig => ({
    port: 1000,
  }),
);
