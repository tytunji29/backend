import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppDataSource } from './config/database';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   await app.listen(process.env.PORT ?? 3000);
// }
// bootstrap();


async function bootstrap() {
  await AppDataSource.initialize()
    .then(() => console.log('Database connected successfully'))
    .catch((err) => console.error('Database connection failed', err));

  const app = await NestFactory.create(AppModule); // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Users API')
    .setDescription('API documentation for NestJS Users + Auth')
    .setVersion('1.0')
    .addBearerAuth() // JWT auth
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
