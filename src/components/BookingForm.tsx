import React, { useState } from "react";

interface BookingFormProps {
  onBookSeats: (numSeats: number) => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ onBookSeats }) => {
  const [numSeats, setNumSeats] = useState<number>(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onBookSeats(numSeats);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6">
      <div className="mb-4">
        <label
          htmlFor="numSeats"
          className="block text-sm font-medium text-gray-700"
        >
          Number of Seats
        </label>
        <input
          type="number"
          id="numSeats"
          value={numSeats}
          onChange={(e) =>
            setNumSeats(Math.max(1, Math.min(7, parseInt(e.target.value) || 1)))
          }
          min="1"
          max="7"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          aria-describedby="numSeatsHelp"
        />
        <p id="numSeatsHelp" className="mt-1 text-sm text-gray-500">
          You can book up to 7 seats at a time.
        </p>
      </div>
      <button
        type="submit"
        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Book Seats
      </button>
    </form>
  );
};

export default BookingForm;
