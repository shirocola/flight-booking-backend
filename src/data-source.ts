import { DataSource } from 'typeorm';
import { Flight } from './flights/flight.entity';
import { Booking } from './bookings/booking.entity';
import { User } from './users/user.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  username: process.env.DATABASE_USERNAME || 'myuser',
  password: process.env.DATABASE_PASSWORD || 'mypassword',
  database: process.env.DATABASE_NAME || 'mydatabase',
  entities: [Flight, Booking, User],
  migrations: ['dist/migrations/*.js'], // Use JavaScript files for migrations
  synchronize: false,
  logging: true,
});
