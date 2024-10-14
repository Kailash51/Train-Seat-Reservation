export interface Seat {
  id: number;
  row: number;
  isBooked: boolean;
}

export interface Coach {
  seats: Seat[];
  totalSeats: number;
  seatsPerRow: number;
  lastRowSeats: number;
}

export interface Passenger {
  name: string;
  age: string;
}

export interface Reservation {
  id: string;
  seatIds: number[];
  passengers: Passenger[];
  timestamp: Date;
}
