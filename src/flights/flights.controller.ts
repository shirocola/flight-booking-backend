// src/flights/flights.controller.ts
import { Controller, Get, Query, Post, Body } from '@nestjs/common';
import { FlightsService } from './flights.service';
import { Flight } from './flight.entity';
import { CreateFlightDto } from './dto/create-flight.dto';

@Controller('flights')
export class FlightsController {
  constructor(private readonly flightsService: FlightsService) {}

  @Get('airports')
  async getAirports() {
    return this.flightsService.getAirports();
  }

  @Get('search')
  async searchFlights(
    @Query('origin') origin: string,
    @Query('destination') destination: string,
    @Query('departureDate') departureDate: string,
    @Query('returnDate') returnDate?: string,
  ): Promise<Flight[]> {
    return this.flightsService.searchFlights(origin, destination, departureDate, returnDate);
  }

  @Post()
  async createFlight(@Body() createFlightDto: CreateFlightDto): Promise<Flight> {
    return this.flightsService.create(createFlightDto);
  }
}
