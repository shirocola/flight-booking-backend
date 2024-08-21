import { Booking } from '../bookings/booking.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, Index } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @Index()
  username: string;

  @Column()
  password: string;

  @Column('simple-array', { default: 'user' }) // Default role set to 'user'
  roles: string[];

  @OneToMany(() => Booking, (booking) => booking.user)
  bookings: Booking[];
}
