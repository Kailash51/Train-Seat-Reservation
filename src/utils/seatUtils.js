export const initializeCoach = () => {
    const totalSeats = 80;
    const seatsPerRow = 7;
    const lastRowSeats = 3;
    const seats = [];
    for (let i = 0; i < totalSeats; i++) {
        const row = Math.floor(i / seatsPerRow);
        seats.push({
            id: i + 1,
            row,
            isBooked: false, // All seats start as available
        });
    }
    return { seats, totalSeats, seatsPerRow, lastRowSeats };
};
export const findAvailableSeats = (coach, numSeats) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const { seats, seatsPerRow } = coach;
            const availableSeats = [];
            // Try to book seats in the same row
            for (let row = 0; row < seats.length / seatsPerRow; row++) {
                const rowSeats = seats.slice(row * seatsPerRow, (row + 1) * seatsPerRow);
                const availableInRow = rowSeats.filter((seat) => !seat.isBooked);
                if (availableInRow.length >= numSeats) {
                    resolve(availableInRow.slice(0, numSeats).map((seat) => seat.id));
                    return;
                }
            }
            // If not possible in the same row, book nearby seats
            for (const seat of seats) {
                if (!seat.isBooked) {
                    availableSeats.push(seat.id);
                    if (availableSeats.length === numSeats) {
                        resolve(availableSeats);
                        return;
                    }
                }
            }
            resolve(availableSeats);
        }, 1000); // Simulate a 1-second delay
    });
};
export const bookSeats = (coach, seatIds) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const updatedSeats = coach.seats.map((seat) => seatIds.includes(seat.id) ? { ...seat, isBooked: true } : seat);
            resolve({ ...coach, seats: updatedSeats });
        }, 1000); // Simulate a 1-second delay
    });
};
