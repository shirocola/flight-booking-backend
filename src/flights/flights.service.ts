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
  ) { }

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

  async searchFlights(originCode: string, destinationCode: string, departureDate: string, returnDate?: string): Promise<Flight[]> {
    console.log('originCode', originCode, 'destinationCode', destinationCode, 'departureDate', departureDate, 'returnDate', returnDate);
    const query = this.flightRepository.createQueryBuilder('flight')
      .where('flight.originCode = :originCode', { originCode })
      .andWhere('flight.destinationCode = :destinationCode', { destinationCode })
      .andWhere('flight.departureDate = :departureDate', { departureDate });

    if (returnDate) {
      query.andWhere('flight.returnDate = :returnDate', { returnDate });
    }

    return query.getMany();

  }

  async create(createFlightDto: CreateFlightDto): Promise<Flight> {
    const flight = this.flightRepository.create(createFlightDto);
    return this.flightRepository.save(flight);
  }
}
