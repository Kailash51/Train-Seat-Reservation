import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import SeatMap from "./components/SeatMap";
import BookingForm from "./components/BookingForm";
import PassengerForm from "./components/PassengerForm";
import ReservationSummary from "./components/ReservationSummary";
import { initializeCoach, findAvailableSeats, bookSeats, } from "./utils/seatUtils";
import { Train, ArrowLeft } from "lucide-react";
function App() {
    const [coach, setCoach] = useState(initializeCoach());
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [passengers, setPassengers] = useState([]);
    const [step, setStep] = useState("select");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const handleBookSeats = async (numSeats) => {
        setIsLoading(true);
        setError(null);
        try {
            const availableSeats = await findAvailableSeats(coach, numSeats);
            if (availableSeats.length === numSeats) {
                setSelectedSeats(availableSeats);
                setPassengers(Array(numSeats).fill({ name: "", age: "" }));
                setStep("passenger");
            }
            else {
                setError(`Only ${availableSeats.length} seats are available. Please try booking fewer seats.`);
            }
        }
        catch (err) {
            setError("An error occurred while finding available seats. Please try again.");
        }
        finally {
            setIsLoading(false);
        }
    };
    const handlePassengerSubmit = (updatedPassengers) => {
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
        }
        catch (err) {
            setError("An error occurred while confirming your booking. Please try again.");
        }
        finally {
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
        switch (step) {
            case "passenger":
                setStep("select");
                setSelectedSeats([]);
                break;
            case "summary":
                setStep("passenger");
                break;
            default:
                break;
        }
    };
    const renderBackButton = () => {
        if (step === "passenger" || step === "summary") {
            return (_jsxs("button", { onClick: handleBack, className: "mb-4 flex items-center text-indigo-600 hover:text-indigo-800", children: [_jsx(ArrowLeft, { className: "h-4 w-4 mr-1" }), "Back"] }));
        }
        return null;
    };
    return (_jsx("div", { className: "min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12", children: _jsxs("div", { className: "relative py-3 sm:max-w-xl sm:mx-auto w-full px-4 sm:px-0", children: [_jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl" }), _jsx("div", { className: "relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20", children: _jsxs("div", { className: "max-w-md mx-auto", children: [_jsxs("div", { className: "flex items-center space-x-2 mb-6", children: [_jsx(Train, { className: "h-8 w-8 text-indigo-600", "aria-hidden": "true" }), _jsx("h1", { className: "text-2xl font-semibold", children: "Train Seat Reservation" })] }), renderBackButton(), error && (_jsx("div", { className: "bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4", role: "alert", children: _jsx("span", { className: "block sm:inline", children: error }) })), isLoading ? (_jsx("div", { className: "flex justify-center items-center", children: _jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" }) })) : (_jsxs(_Fragment, { children: [step === "select" && (_jsxs(_Fragment, { children: [_jsx(SeatMap, { coach: coach, selectedSeats: selectedSeats }), _jsx(BookingForm, { onBookSeats: handleBookSeats })] })), step === "passenger" && (_jsx(PassengerForm, { passengers: passengers, onSubmit: handlePassengerSubmit })), step === "summary" && (_jsx(ReservationSummary, { selectedSeats: selectedSeats, passengers: passengers, onConfirm: handleConfirmBooking, onCancel: handleBack })), step === "confirmed" && (_jsxs("div", { className: "mt-6", children: [_jsx("h2", { className: "text-lg font-semibold mb-4", children: "Booking Confirmed!" }), _jsx("p", { className: "mb-4", children: "Your seats have been booked successfully." }), _jsxs("p", { className: "mb-4", children: ["Booked Seat Numbers: ", selectedSeats.join(", ")] }), _jsx(SeatMap, { coach: coach, selectedSeats: [] }), _jsx("button", { onClick: handleNewBooking, className: "mt-4 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500", children: "Make Another Booking" })] }))] }))] }) })] }) }));
}
export default App;
