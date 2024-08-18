// src/bookings/dto/create-booking.dto.ts
import { IsNotEmpty, IsEmail, IsString, IsNumber } from 'class-validator';

export class CreateBookingDto {
  @IsNumber()
  @IsNotEmpty()
  flightId: number;

  @IsString()
  @IsNotEmpty()
  passengerName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  paymentDetails: string; // Consider tokenization or encryption in production
}
