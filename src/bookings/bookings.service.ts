import { Injectable } from "@nestjs/common";

export interface Booking {
    id: number;
    flightId: number;
    passengerName: string;
    email: string;
    paymentDetails: string;
  }
  
  @Injectable()
  export class BookingsService {
    private bookings: Booking[] = [];
    private idCounter = 1;
  
    createBooking(booking: Omit<Booking, 'id'>): Booking {
      const newBooking = { ...booking, id: this.idCounter++ };
      this.bookings.push(newBooking);
      return newBooking;
    }
  
    getBookings(): Booking[] {
      return this.bookings;
    }
  }
  