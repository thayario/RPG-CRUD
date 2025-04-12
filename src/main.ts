import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('RPG API')
    .setDescription('Descrição da API')
    .setVersion('1.0')
    .build(); 

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/swagger/api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
