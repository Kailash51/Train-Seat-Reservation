import { v4 as uuidv4 } from "uuid";
class Database {
    constructor() {
        Object.defineProperty(this, "coach", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "reservations", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.coach = {
            seats: [],
            totalSeats: 80,
            seatsPerRow: 7,
            lastRowSeats: 3,
        };
        this.reservations = [];
    }
    initializeDatabase() {
        this.coach.seats = Array.from({ length: this.coach.totalSeats }, (_, i) => ({
            id: i + 1,
            row: Math.floor(i / this.coach.seatsPerRow),
            isBooked: false,
        }));
    }
    getCoach() {
        return this.coach;
    }
    updateCoach(updatedCoach) {
        this.coach = updatedCoach;
    }
    addReservation(seatIds, passengers) {
        const reservation = {
            id: uuidv4(),
            seatIds,
            passengers,
            timestamp: new Date(),
        };
        this.reservations.push(reservation);
        return reservation;
    }
    getReservations() {
        return this.reservations;
    }
    getReservationById(id) {
        return this.reservations.find((reservation) => reservation.id === id);
    }
    updateSeatStatus(seatIds, isBooked) {
        this.coach.seats = this.coach.seats.map((seat) => seatIds.includes(seat.id) ? { ...seat, isBooked } : seat);
    }
}
const database = new Database();
export const initializeDatabase = () => database.initializeDatabase();
export const getCoach = () => database.getCoach();
export const updateCoach = (coach) => database.updateCoach(coach);
export const addReservation = (seatIds, passengers) => database.addReservation(seatIds, passengers);
export const getReservations = () => database.getReservations();
export const getReservationById = (id) => database.getReservationById(id);
export const updateSeatStatus = (seatIds, isBooked) => database.updateSeatStatus(seatIds, isBooked);
export default database;
