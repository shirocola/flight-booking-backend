// src/bookings/booking.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Flight } from '../flights/flight.entity';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  passengerName: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  encryptedCardNumber: string;

  @Column({ nullable: false })
  encryptedCardCVV: string;

  @Column({ nullable: false })
  encryptedCardExpiry: string;

  @ManyToOne(() => Flight, (flight) => flight.id)
  flight: Flight;
}
