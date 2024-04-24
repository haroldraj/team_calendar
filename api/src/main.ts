import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as process from 'node:process';
import { seedRole } from './seeder/role.seeder';
import { seedUser } from './seeder/user.seeder';
import { RoleService } from './role/role.service';
import { UserService } from './user/user.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 3000;
  const config = new DocumentBuilder()
    .setTitle('TeamCalendar API')
    .setDescription('The TeamCalendar app API description')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'access-token',
    )
    .addSecurityRequirements('access-token')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(new ValidationPipe());
  //app.use(cors());
  app.enableCors();
  await app.listen(PORT, () => {
    console.log(
      `Running Team-Calendar-API in MODE: ${process.env.NODE_ENV} on PORT: ${PORT}`,
    );
  });
  const roleSeeder = app.get(RoleService, { strict: false });
  await seedRole(roleSeeder);
  const userSeeder = app.get(UserService);
  await seedUser(userSeeder);
}
bootstrap();
