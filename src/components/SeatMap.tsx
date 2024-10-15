import React from "react";
import { Coach } from "../types";

interface SeatMapProps {
  coach: Coach;
  selectedSeats: number[];
}

const SeatMap: React.FC<SeatMapProps> = ({ coach, selectedSeats }) => {
  const { seats, seatsPerRow, lastRowSeats } = coach;

  const getSeatColor = (seat: { id: number; isBooked: boolean }) => {
    if (seat.isBooked) return "bg-red-500";
    if (selectedSeats.includes(seat.id)) return "bg-indigo-600";
    return "bg-green-500";
  };

  return (
    <div className="my-8">
      <h2 className="text-lg font-semibold mb-4">Seat Map</h2>
      <div
        className="grid grid-cols-4 sm:grid-cols-7 gap-2 p-4 bg-gray-100 rounded-lg"
        role="group"
        aria-label="Seat selection"
      >
        {seats.map((seat) => (
          <div
            key={seat.id}
            className={`w-10 h-10 flex items-center justify-center rounded-md text-white ${getSeatColor(
              seat
            )}`}
            role="button"
            aria-pressed={selectedSeats.includes(seat.id)}
            aria-label={`Seat ${seat.id} ${
              seat.isBooked ? "booked" : "available"
            }`}
            tabIndex={0}
          >
            {seat.id}
          </div>
        ))}
        {Array.from({ length: seatsPerRow - lastRowSeats }).map((_, index) => (
          <div
            key={`empty-${index}`}
            className="w-10 h-10"
            aria-hidden="true"
          />
        ))}
      </div>
      <div className="mt-4 flex flex-wrap justify-between text-sm">
        <div className="flex items-center mr-4 mb-2">
          <div
            className="w-4 h-4 bg-green-500 rounded-sm mr-2"
            aria-hidden="true"
          ></div>
          <span>Available</span>
        </div>
        <div className="flex items-center mr-4 mb-2">
          <div
            className="w-4 h-4 bg-indigo-600 rounded-sm mr-2"
            aria-hidden="true"
          ></div>
          <span>Selected</span>
        </div>
        <div className="flex items-center mb-2">
          <div
            className="w-4 h-4 bg-red-500 rounded-sm mr-2"
            aria-hidden="true"
          ></div>
          <span>Booked</span>
        </div>
      </div>
    </div>
  );
};

export default SeatMap;
