import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { ExcludeNullInterceptor } from './utils/excludeNull.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.enableCors();
  // Validation
  app.useGlobalPipes(new ValidationPipe({ skipMissingProperties: true }));
  // Serializing

  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector)),
    new ExcludeNullInterceptor(),
  );
  app.use(cookieParser());

  // Swagger config
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Study Corner Project API')
    .setDescription('API developed throughout the API with NestJS course')
    .setVersion('alpha')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  });

  await app.listen(8080);
}
bootstrap();
