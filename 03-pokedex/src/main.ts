import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
//app es la instacia que se crea de la aplicacion
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //Con este codigo establecemos un perfil global para la URL
  app.setGlobalPrefix('api/v2');
  //Validacion global   
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion:true,
      }
  })
    );
  await app.listen(3000);
}
bootstrap();
