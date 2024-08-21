import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './booking.entity';
import { Flight } from '../flights/flight.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import * as crypto from 'crypto';

@Injectable()
export class BookingsService {
  private readonly encryptionKey: Buffer;

  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
    @InjectRepository(Flight)
    private readonly flightRepository: Repository<Flight>,
  ) {
    const key = process.env.ENCRYPTION_KEY || 'default_encryption_key_32_bytes_long';
    this.encryptionKey = Buffer.from(key, 'utf-8').slice(0, 32);
  }

  async createBooking(createBookingDto: CreateBookingDto, userId: number): Promise<Booking> {
    const flight = await this.flightRepository.findOneBy({ id: createBookingDto.flightId });
    if (!flight) {
      throw new NotFoundException('Flight not found');
    }

    const encryptedCardNumber = this.encrypt(createBookingDto.cardNumber);
    const encryptedCardCVV = this.encrypt(createBookingDto.cardCVV);
    const encryptedCardExpiry = this.encrypt(createBookingDto.cardExpiry);

    const booking = this.bookingRepository.create({
      flight,
      passengerName: createBookingDto.passengerName,
      email: createBookingDto.email,
      encryptedCardNumber,
      encryptedCardCVV,
      encryptedCardExpiry,
      user: { id: userId },
    });

    return this.bookingRepository.save(booking);
  }

  async cancelBooking(bookingId: number, userId: number): Promise<void> {
    const booking = await this.bookingRepository.findOne({ where: { id: bookingId, user: { id: userId } } });
    if (!booking) {
      throw new NotFoundException('Booking not found');
    }
    booking.active = false;
    await this.bookingRepository.save(booking);
  }

  private encrypt(text: string): string {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-ctr', this.encryptionKey, iv);
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
  }

}