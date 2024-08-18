import { IsString, IsDateString, IsNumber, IsOptional } from 'class-validator';

export class CreateFlightDto {
  @IsString()
  originCode: string;

  @IsString()
  origin: string;

  @IsString()
  originCountry: string;

  @IsString()
  destinationCode: string;

  @IsString()
  destination: string;

  @IsString()
  destinationCountry: string;

  @IsDateString()
  departureDate: string;

  @IsDateString()
  @IsOptional()
  returnDate?: string;

  @IsNumber()
  price: number;
}
