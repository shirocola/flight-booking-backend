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

  async createBooking(createBookingDto: CreateBookingDto): Promise<Booking> {
    const flight = await this.flightRepository.findOneBy({ id: createBookingDto.flightId });
    if (!flight) {
      throw new Error('Flight not found');
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
    });

    return this.bookingRepository.save(booking);
  }

  private encrypt(text: string): string {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-ctr', this.encryptionKey, iv);
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
  }

  private decrypt(encryptedText: string): string {
    const [iv, content] = encryptedText.split(':').map(part => Buffer.from(part, 'hex'));
    const decipher = crypto.createDecipheriv('aes-256-ctr', this.encryptionKey, iv);
    const decrypted = Buffer.concat([decipher.update(content), decipher.final()]);
    return decrypted.toString();
  }
}
