import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './filters/global-exception.filter';
import * as fs from 'fs';
import { createServer } from 'http';
import * as express from 'express';

async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert'),
  }
  const app = await NestFactory.create(AppModule, { httpsOptions });
  app.useGlobalFilters(new GlobalExceptionFilter());
  
  // Enable CORS
  app.enableCors({
    origin: 'http://localhost:5173', // Allow requests from your frontend origin
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  });

  await app.listen(3000);

  const httpApp = express();
  httpApp.all('*', (req, res) => res.redirect(307, 'https://localhost:3000'));

  createServer(httpApp).listen(8080);
}
bootstrap();
