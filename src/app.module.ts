import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FlightsModule } from './flights/flights.module';
import { BookingsModule } from './bookings/bookings.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/user.module';
import { ProtectedController } from './protected/protected.controller';
import { SeedModule } from './seed/seed.module';
import { HttpsRedirectMiddleware } from './middleware/https-redirect.middleware';
import { AppDataSource } from './data-source'; // Import the data source

@Module({
  imports: [
    TypeOrmModule.forRoot(AppDataSource.options), // Use the data source options
    FlightsModule,
    BookingsModule,
    AuthModule,
    UsersModule,
    SeedModule
  ],
  controllers: [AppController, ProtectedController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpsRedirectMiddleware).forRoutes('*');
  }
}
