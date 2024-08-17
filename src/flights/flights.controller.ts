import { Controller, Get, Query } from '@nestjs/common';
import { FlightsService, Flight } from './flights.service';

@Controller('flights')
export class FlightsController {
  constructor(private readonly flightsService: FlightsService) {}

  @Get('search')
  searchFlights(
    @Query('origin') origin: string,
    @Query('destination') destination: string,
    @Query('date') date: string,
  ): Flight[] {
    return this.flightsService.searchFlights(origin, destination, date);
  }
}
