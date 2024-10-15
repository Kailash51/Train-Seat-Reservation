import { useState } from "react";
import SeatMap from "./components/SeatMap";
import BookingForm from "./components/BookingForm";
import PassengerForm from "./components/PassengerForm";
import ReservationSummary from "./components/ReservationSummary";
import {
  initializeCoach,
  findAvailableSeats,
  bookSeats,
} from "./utils/seatUtils";
import { Coach, Passenger } from "./types";
import { Train } from "lucide-react";

function App() {
  const [coach, setCoach] = useState<Coach>(initializeCoach());
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [passengers, setPassengers] = useState<Passenger[]>([]);
  const [step, setStep] = useState<
    "select" | "passenger" | "summary" | "confirmed"
  >("select");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleBookSeats = async (numSeats: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const availableSeats = await findAvailableSeats(coach, numSeats);
      if (availableSeats.length === numSeats) {
        setSelectedSeats(availableSeats);
        setPassengers(Array(numSeats).fill({ name: "", age: "" }));
        setStep("passenger");
      } else {
        setError(
          `Only ${availableSeats.length} seats are available. Please try booking fewer seats.`
        );
      }
    } catch (err) {
      setError(
        "An error occurred while finding available seats. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handlePassengerSubmit = (updatedPassengers: Passenger[]) => {
    setPassengers(updatedPassengers);
    setStep("summary");
  };

  const handleConfirmBooking = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const updatedCoach = await bookSeats(coach, selectedSeats);
      setCoach(updatedCoach);
      setStep("confirmed");
    } catch (err) {
      setError(
        "An error occurred while confirming your booking. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewBooking = () => {
    setStep("select");
    setSelectedSeats([]);
    setPassengers([]);
    setError(null);
  };

  const handleBack = () => {
    if (step === "passenger") {
      setStep("select");
    } else if (step === "summary") {
      setStep("passenger");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto w-full px-4 sm:px-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="flex items-center space-x-2 mb-6">
              <Train className="h-8 w-8 text-indigo-600" aria-hidden="true" />
              <h1 className="text-2xl font-semibold">Train Seat Reservation</h1>
            </div>
            {error && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
                role="alert"
              >
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            {isLoading ? (
              <div className="flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
              </div>
            ) : (
              <>
                {step === "select" && (
                  <>
                    <SeatMap coach={coach} selectedSeats={selectedSeats} />
                    <BookingForm onBookSeats={handleBookSeats} />
                  </>
                )}
                {step === "passenger" && (
                  <PassengerForm
                    passengers={passengers}
                    onSubmit={handlePassengerSubmit}
                    onBack={handleBack}
                  />
                )}
                {step === "summary" && (
                  <ReservationSummary
                    selectedSeats={selectedSeats}
                    passengers={passengers}
                    onConfirm={handleConfirmBooking}
                    onBack={handleBack}
                  />
                )}
                {step === "confirmed" && (
                  <div className="mt-6">
                    <h2 className="text-lg font-semibold mb-4">
                      Booking Confirmed!
                    </h2>
                    <p className="mb-4">
                      Your seats have been booked successfully.
                    </p>
                    <p className="mb-4">
                      Booked Seat Numbers: {selectedSeats.join(", ")}
                    </p>
                    <SeatMap coach={coach} selectedSeats={[]} />
                    <button
                      onClick={handleNewBooking}
                      className="mt-4 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Make Another Booking
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
