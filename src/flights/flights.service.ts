import { Injectable } from "@nestjs/common";

export interface Flight {
    id: number;
    origin: string;
    destination: string;
    date: string;
    price: number;
  }
  
  @Injectable()
  export class FlightsService {
    private flights: Flight[] = [
      { id: 1, origin: 'NYC', destination: 'LAX', date: '2024-08-20', price: 300 },
      { id: 2, origin: 'LAX', destination: 'NYC', date: '2024-08-21', price: 320 },
    ];
  
    searchFlights(origin: string, destination: string, date: string): Flight[] {
      return this.flights.filter(
        flight =>
          flight.origin === origin &&
          flight.destination === destination &&
          flight.date === date,
      );
    }
  }
  