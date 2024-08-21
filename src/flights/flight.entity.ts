import { Booking } from '../bookings/booking.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Flight {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  originCode: string;

  @Column({ nullable: false })
  origin: string;

  @Column({ nullable: false })
  originCountry: string;

  @Column({ nullable: false })
  destinationCode: string;

  @Column({ nullable: false })
  destination: string;

  @Column({ nullable: false })
  destinationCountry: string;

  @Column({ nullable: false })
  departureDate: string;

  @Column({ nullable: true })
  returnDate?: string;

  @Column('decimal', { nullable: false })
  price: number;

  @OneToMany(() => Booking, (booking) => booking.flight)
  bookings: Booking[];
}
