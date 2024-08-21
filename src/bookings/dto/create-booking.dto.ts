import { IsString, IsEmail, IsNotEmpty, Length, IsCreditCard, IsNumber } from 'class-validator';

export class CreateBookingDto {
  @IsString()
  @IsNotEmpty()
  passengerName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsCreditCard()
  @IsNotEmpty()
  cardNumber: string;

  @IsString()
  @Length(3, 4)
  cardCVV: string;

  @IsString()
  @Length(5, 5)
  cardExpiry: string; // Format: MM/YY

  @IsNumber()
  @IsNotEmpty()
  flightId: number;
}
