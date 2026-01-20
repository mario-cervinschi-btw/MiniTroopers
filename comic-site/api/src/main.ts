import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ComicsModule } from './comics/comics.module';

async function bootstrap() {
  const app = await NestFactory.create(ComicsModule);

  app.enableCors({
    origin: /^http:\/\/localhost:\d+$/,
  });

  const config = new DocumentBuilder()
    .setTitle('XKCD Clone Mock API')
    .setDescription('Mock REST API for an xkcd.com-like frontend')
    .setVersion('1.0.0')
    .addTag('comics')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
