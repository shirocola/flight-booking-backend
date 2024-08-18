// src/flights/flights.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Flight } from './flight.entity';
import { CreateFlightDto } from './dto/create-flight.dto';

@Injectable()
export class FlightsService {
  constructor(
    @InjectRepository(Flight)
    private readonly flightRepository: Repository<Flight>,
  ) {}

  async getAirports() {
    const flights = await this.flightRepository.find();

    // Extract unique airport codes and related information
    const airports = flights.map(flight => ({
      code: flight.originCode,
      city: flight.origin,
      country: flight.originCountry,
    }));

    // Remove duplicates
    const uniqueAirports = Array.from(new Set(airports.map(a => a.code)))
      .map(code => airports.find(a => a.code === code));

    return uniqueAirports;
  }

  async searchFlights(origin: string, destination: string, departureDate: string, returnDate?: string): Promise<Flight[]> {
    const whereClause: any = {
      origin,
      destination,
      departureDate,
    };

    if (returnDate) {
      whereClause.returnDate = returnDate;
    }

    return this.flightRepository.find({
      where: whereClause,
    });
  }

  async create(createFlightDto: CreateFlightDto): Promise<Flight> {
    const flight = this.flightRepository.create(createFlightDto);
    return this.flightRepository.save(flight);
  }
}
