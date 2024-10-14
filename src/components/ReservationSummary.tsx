import React from "react";
import { Passenger } from "../types";

interface ReservationSummaryProps {
  selectedSeats: number[];
  passengers: Passenger[];
  onConfirm: () => void;
  onBack: () => void;
}

const ReservationSummary: React.FC<ReservationSummaryProps> = ({
  selectedSeats,
  passengers,
  onConfirm,
  onBack,
}) => {
  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-4">Reservation Summary</h2>
      <div className="bg-gray-50 p-4 rounded-md mb-4">
        <h3 className="text-md font-medium mb-2">Selected Seats</h3>
        <p>{selectedSeats.join(", ")}</p>
      </div>
      <div className="bg-gray-50 p-4 rounded-md mb-4">
        <h3 className="text-md font-medium mb-2">Passenger Information</h3>
        {passengers.map((passenger, index) => (
          <div key={index} className="mb-2">
            <p>
              <span className="font-medium">Passenger {index + 1}:</span>{" "}
              {passenger.name}, Age: {passenger.age}
            </p>
          </div>
        ))}
      </div>
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
        <button
          onClick={onBack}
          className="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Back
        </button>
        <button
          onClick={onConfirm}
          className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
};

export default ReservationSummary;
