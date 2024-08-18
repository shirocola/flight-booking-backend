// src/bookings/bookings.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './booking.entity';
import { Flight } from '../flights/flight.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import * as crypto from 'crypto';

@Injectable()
export class BookingsService {
  private readonly encryptionKey = 'your-encryption-key'; // Store securely in environment variables

  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
    @InjectRepository(Flight)
    private readonly flightRepository: Repository<Flight>,
  ) {}

  async createBooking(createBookingDto: CreateBookingDto): Promise<Booking> {
    const flight = await this.flightRepository.findOneBy({ id: createBookingDto.flightId });
    if (!flight) {
      throw new Error('Flight not found');
    }

    const encryptedPaymentDetails = this.encrypt(createBookingDto.paymentDetails);

    const booking = this.bookingRepository.create({
      flight,
      passengerName: createBookingDto.passengerName,
      email: createBookingDto.email,
      paymentDetails: encryptedPaymentDetails,
    });

    return this.bookingRepository.save(booking);
  }

  private encrypt(text: string): string {
    const cipher = crypto.createCipheriv('aes-256-ctr', this.encryptionKey, Buffer.alloc(16, 0));
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
    return encrypted.toString('hex');
  }
}
