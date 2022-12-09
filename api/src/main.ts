import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get(ConfigService);

  if (configService.get('NODE_ENV') === 'dev') {
    const config = new DocumentBuilder()
      .setTitle('Scheduler API documentation')
      .setDescription(
        'All the available calls with responses and parameters will be overview'
      )
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(configService.get('API_DOCS'), app, document);
  }
  await app.listen(configService.get('port'));
}
bootstrap();
