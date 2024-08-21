import { Controller, Post, Body, UseGuards, BadRequestException, Req, Delete, Param, Put } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('bookings')
@UseGuards(JwtAuthGuard)  // Ensure only authenticated users can create bookings
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) { }

  @Post()
  async createBooking(@Req() req, @Body() createBookingDto: CreateBookingDto) {
    const userId = req.user.userId; // Get the userId from the authenticated user
    return this.bookingsService.createBooking(createBookingDto, userId);
  }

  @Put(':id/cancel')
  @UseGuards(JwtAuthGuard)
  async cancelBooking(@Param('id') bookingId: number, @Req() req): Promise<void> {
    await this.bookingsService.cancelBooking(bookingId, req.user.userId);
  }

}
