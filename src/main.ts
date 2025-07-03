import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['verbose'],
  });
  app.enableVersioning({
    type: VersioningType.MEDIA_TYPE,
    key: 'v=',
  });
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        // 클래스에 적혀있는 타입을 기반으로 바꿔라
        enableImplicitConversion: true,
      },
    }),
  );
  await app.listen(3000);
}

bootstrap();
