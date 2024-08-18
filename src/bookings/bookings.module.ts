// src/bookings/bookings.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingsController } from './bookings.controller';
import { BookingsService } from './bookings.service';
import { Booking } from './booking.entity';
import { Flight } from '../flights/flight.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Booking, Flight])],
  controllers: [BookingsController],
  providers: [BookingsService],
})
export class BookingsModule {}
