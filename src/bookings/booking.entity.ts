import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, Index } from 'typeorm';
import { User } from '../users/user.entity';
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

  @Column({ default: true })
  active: boolean;

  @ManyToOne(() => Flight, (flight) => flight.bookings)
  flight: Flight;

  @ManyToOne(() => User, (user) => user.bookings, { onDelete: 'CASCADE' })
  user: User;
}

