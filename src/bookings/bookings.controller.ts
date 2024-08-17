import { Controller, Post, Body } from '@nestjs/common';
import { BookingsService, Booking } from './bookings.service';

interface CreateBookingDto {
  flightId: number;
  passengerName: string;
  email: string;
  paymentDetails: string;
}

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  createBooking(@Body() createBookingDto: CreateBookingDto): Booking {
    return this.bookingsService.createBooking(createBookingDto);
  }
}
