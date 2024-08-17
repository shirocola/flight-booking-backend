import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FlightsModule } from './flights/flights.module';
import { BookingsModule } from './bookings/bookings.module';
import { AuthModule } from './auth/auth.module';
import { ProtectedController } from './protected/protected.controller';

@Module({
  imports: [FlightsModule, BookingsModule, AuthModule],
  controllers: [AppController, ProtectedController],
  providers: [AppService],
})
export class AppModule {}
