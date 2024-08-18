import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { UsersModule } from '../users/user.module';
import { FlightsModule } from '../flights/flights.module';
import { BookingsModule } from 'src/bookings/bookings.module';

@Module({
  imports: [UsersModule, FlightsModule, BookingsModule],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}
