import { Coach, Reservation, Passenger } from "../types";
import { v4 as uuidv4 } from "uuid";

class Database {
  private coach: Coach;
  private reservations: Reservation[];

  constructor() {
    this.coach = {
      seats: [],
      totalSeats: 80,
      seatsPerRow: 7,
      lastRowSeats: 3,
    };
    this.reservations = [];
  }

  initializeDatabase(): void {
    this.coach.seats = Array.from(
      { length: this.coach.totalSeats },
      (_, i) => ({
        id: i + 1,
        row: Math.floor(i / this.coach.seatsPerRow),
        isBooked: false,
      })
    );
  }

  getCoach(): Coach {
    return this.coach;
  }

  updateCoach(updatedCoach: Coach): void {
    this.coach = updatedCoach;
  }

  addReservation(seatIds: number[], passengers: Passenger[]): Reservation {
    const reservation: Reservation = {
      id: uuidv4(),
      seatIds,
      passengers,
      timestamp: new Date(),
    };
    this.reservations.push(reservation);
    return reservation;
  }

  getReservations(): Reservation[] {
    return this.reservations;
  }

  getReservationById(id: string): Reservation | undefined {
    return this.reservations.find((reservation) => reservation.id === id);
  }

  updateSeatStatus(seatIds: number[], isBooked: boolean): void {
    this.coach.seats = this.coach.seats.map((seat) =>
      seatIds.includes(seat.id) ? { ...seat, isBooked } : seat
    );
  }
}

const database = new Database();

export const initializeDatabase = () => database.initializeDatabase();
export const getCoach = () => database.getCoach();
export const updateCoach = (coach: Coach) => database.updateCoach(coach);
export const addReservation = (seatIds: number[], passengers: Passenger[]) =>
  database.addReservation(seatIds, passengers);
export const getReservations = () => database.getReservations();
export const getReservationById = (id: string) =>
  database.getReservationById(id);
export const updateSeatStatus = (seatIds: number[], isBooked: boolean) =>
  database.updateSeatStatus(seatIds, isBooked);

export default database;
