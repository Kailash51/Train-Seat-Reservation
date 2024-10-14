const database = {
    coach: {
        seats: [],
        totalSeats: 80,
        seatsPerRow: 7,
        lastRowSeats: 3,
    },
    reservations: [],
};
export const initializeDatabase = () => {
    database.coach.seats = Array.from({ length: database.coach.totalSeats }, (_, i) => ({
        id: i + 1,
        row: Math.floor(i / database.coach.seatsPerRow),
        isBooked: false,
    }));
};
export const getCoach = () => {
    return database.coach;
};
export const updateCoach = (updatedCoach) => {
    database.coach = updatedCoach;
};
export const addReservation = (reservation) => {
    database.reservations.push(reservation);
};
export const getReservations = () => {
    return database.reservations;
};
export default database;
