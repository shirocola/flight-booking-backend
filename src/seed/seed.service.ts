import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/user.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { FlightsService } from '../flights/flights.service';
import { CreateFlightDto } from '../flights/dto/create-flight.dto';
import { BookingsService } from 'src/bookings/bookings.service';
import { CreateBookingDto } from 'src/bookings/dto/create-booking.dto';

@Injectable()
export class SeedService {
  constructor(
    private readonly usersService: UsersService,
    private readonly flightsService: FlightsService,
    private readonly bookingsService: BookingsService,
  ) {}

  async run() {
    await this.seedUsers();
    await this.seedFlights();
  }

  private async seedUsers() {
    const users: CreateUserDto[] = [
      {
        username: 'admin',
        password: 'adminpassword',
        roles: ['admin'],
      },
      {
        username: 'user',
        password: 'userpassword',
        roles: ['user'],
      },
    ];

    for (const user of users) {
      const existingUser = await this.usersService.findOne(user.username);
      if (!existingUser) {
        await this.usersService.create(user);
      }
    }
  }

  private async seedFlights() {
    const flights: CreateFlightDto[] = [
      {
        originCode: 'JFK',
        origin: 'New York',
        originCountry: 'United States',
        destinationCode: 'LHR',
        destination: 'London',
        destinationCountry: 'United Kingdom',
        departureDate: '2024-09-01',
        returnDate: '2024-09-10',
        price: 750,
      },
      {
        originCode: 'LHR',
        origin: 'London',
        originCountry: 'United Kingdom',
        destinationCode: 'JFK',
        destination: 'New York',
        destinationCountry: 'United States',
        departureDate: '2024-09-02',
        price: 770,
      },
      {
        originCode: 'NRT',
        origin: 'Tokyo',
        originCountry: 'Japan',
        destinationCode: 'LAX',
        destination: 'Los Angeles',
        destinationCountry: 'United States',
        departureDate: '2024-09-03',
        returnDate: '2024-09-12',
        price: 680,
      },
      {
        originCode: 'LAX',
        origin: 'Los Angeles',
        originCountry: 'United States',
        destinationCode: 'NRT',
        destination: 'Tokyo',
        destinationCountry: 'Japan',
        departureDate: '2024-09-04',
        price: 690,
      },
      {
        originCode: 'SYD',
        origin: 'Sydney',
        originCountry: 'Australia',
        destinationCode: 'SIN',
        destination: 'Singapore',
        destinationCountry: 'Singapore',
        departureDate: '2024-09-05',
        returnDate: '2024-09-15',
        price: 500,
      },
      {
        originCode: 'SIN',
        origin: 'Singapore',
        originCountry: 'Singapore',
        destinationCode: 'SYD',
        destination: 'Sydney',
        destinationCountry: 'Australia',
        departureDate: '2024-09-06',
        price: 510,
      },
      {
        originCode: 'DXB',
        origin: 'Dubai',
        originCountry: 'United Arab Emirates',
        destinationCode: 'CDG',
        destination: 'Paris',
        destinationCountry: 'France',
        departureDate: '2024-09-07',
        returnDate: '2024-09-14',
        price: 620,
      },
      {
        originCode: 'CDG',
        origin: 'Paris',
        originCountry: 'France',
        destinationCode: 'DXB',
        destination: 'Dubai',
        destinationCountry: 'United Arab Emirates',
        departureDate: '2024-09-08',
        price: 630,
      },
      {
        originCode: 'HND',
        origin: 'Tokyo',
        originCountry: 'Japan',
        destinationCode: 'ICN',
        destination: 'Seoul',
        destinationCountry: 'South Korea',
        departureDate: '2024-09-09',
        price: 450,
      },
      {
        originCode: 'ICN',
        origin: 'Seoul',
        originCountry: 'South Korea',
        destinationCode: 'HND',
        destination: 'Tokyo',
        destinationCountry: 'Japan',
        departureDate: '2024-09-10',
        price: 460,
      },
      {
        originCode: 'JNB',
        origin: 'Johannesburg',
        originCountry: 'South Africa',
        destinationCode: 'GRU',
        destination: 'São Paulo',
        destinationCountry: 'Brazil',
        departureDate: '2024-09-11',
        returnDate: '2024-09-20',
        price: 900,
      },
      {
        originCode: 'GRU',
        origin: 'São Paulo',
        originCountry: 'Brazil',
        destinationCode: 'JNB',
        destination: 'Johannesburg',
        destinationCountry: 'South Africa',
        departureDate: '2024-09-12',
        price: 920,
      },
      {
        originCode: 'FCO',
        origin: 'Rome',
        originCountry: 'Italy',
        destinationCode: 'CAI',
        destination: 'Cairo',
        destinationCountry: 'Egypt',
        departureDate: '2024-09-13',
        returnDate: '2024-09-18',
        price: 600,
      },
      {
        originCode: 'CAI',
        origin: 'Cairo',
        originCountry: 'Egypt',
        destinationCode: 'FCO',
        destination: 'Rome',
        destinationCountry: 'Italy',
        departureDate: '2024-09-14',
        price: 620,
      },
      {
        originCode: 'BOM',
        origin: 'Mumbai',
        originCountry: 'India',
        destinationCode: 'DEL',
        destination: 'New Delhi',
        destinationCountry: 'India',
        departureDate: '2024-09-15',
        price: 150,
      },
      {
        originCode: 'DEL',
        origin: 'New Delhi',
        originCountry: 'India',
        destinationCode: 'BOM',
        destination: 'Mumbai',
        destinationCountry: 'India',
        departureDate: '2024-09-16',
        returnDate: '2024-09-20',
        price: 160,
      },
      {
        originCode: 'MEX',
        origin: 'Mexico City',
        originCountry: 'Mexico',
        destinationCode: 'YYZ',
        destination: 'Toronto',
        destinationCountry: 'Canada',
        departureDate: '2024-09-17',
        returnDate: '2024-09-24',
        price: 550,
      },
      {
        originCode: 'YYZ',
        origin: 'Toronto',
        originCountry: 'Canada',
        destinationCode: 'MEX',
        destination: 'Mexico City',
        destinationCountry: 'Mexico',
        departureDate: '2024-09-18',
        price: 570,
      },
      {
        originCode: 'SVO',
        origin: 'Moscow',
        originCountry: 'Russia',
        destinationCode: 'IST',
        destination: 'Istanbul',
        destinationCountry: 'Turkey',
        departureDate: '2024-09-19',
        returnDate: '2024-09-25',
        price: 450,
      },
      {
        originCode: 'IST',
        origin: 'Istanbul',
        originCountry: 'Turkey',
        destinationCode: 'SVO',
        destination: 'Moscow',
        destinationCountry: 'Russia',
        departureDate: '2024-09-20',
        price: 470,
      },
    ];

    for (const flight of flights) {
      await this.flightsService.create(flight);
      console.log('Flight created');
    }
  }

  private async seedBookings() {
    const bookings: CreateBookingDto[] = [
      {
        flightId: 1, // Assuming this flight ID exists in the database
        passengerName: 'John Doe',
        email: 'john.doe@example.com',
        cardNumber: '4111111111111111', // Mock Visa card number
        cardCVV: '123',
        cardExpiry: '12/24',
      },
      {
        flightId: 2, // Assuming this flight ID exists in the database
        passengerName: 'Jane Smith',
        email: 'jane.smith@example.com',
        cardNumber: '5500000000000004', // Mock MasterCard number
        cardCVV: '456',
        cardExpiry: '11/25',
      },
      // More bookings...
    ];

    for (const booking of bookings) {
      await this.bookingsService.createBooking(booking);
      console.log('Booking created');
    }
  }
}
