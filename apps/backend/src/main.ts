import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useLogger(app.get(Logger));
  /**
   * apply pipe for every single route
   * whitelist: ensure to not allow any extra properties into incoming request object
   *            that are not defined in dto
   **/
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  /**
   * apply middleware for every route and run before every request
   * in this case: parse cookie
   */
  app.use(cookieParser());
  /**
   * getOrThrow: get if exists, otherwise throw error
   */
  await app.listen(app.get(ConfigService).getOrThrow('PORT'));
}
bootstrap();
