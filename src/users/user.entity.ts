import { Booking } from 'src/bookings/booking.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column('simple-array', { default: '', nullable: false })
  roles?: string[];

  @OneToMany(() => Booking, (booking) => booking.user)
  bookings: Booking[];

}
