import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const SeatMap = ({ coach, selectedSeats }) => {
    const { seats, seatsPerRow, lastRowSeats } = coach;
    const getSeatColor = (seat) => {
        if (seat.isBooked)
            return "bg-red-500";
        if (selectedSeats.includes(seat.id))
            return "bg-indigo-600";
        return "bg-green-500";
    };
    return (_jsxs("div", { className: "my-8", children: [_jsx("h2", { className: "text-lg font-semibold mb-4", children: "Seat Map" }), _jsxs("div", { className: "grid grid-cols-7 gap-2 p-4 bg-gray-100 rounded-lg", role: "group", "aria-label": "Seat selection", children: [seats.map((seat) => (_jsx("div", { className: `w-10 h-10 flex items-center justify-center rounded-md text-white ${getSeatColor(seat)}`, role: "button", "aria-pressed": selectedSeats.includes(seat.id), "aria-label": `Seat ${seat.id} ${seat.isBooked ? "booked" : "available"}`, tabIndex: 0, children: seat.id }, seat.id))), Array.from({ length: seatsPerRow - lastRowSeats }).map((_, index) => (_jsx("div", { className: "w-10 h-10", "aria-hidden": "true" }, `empty-${index}`)))] }), _jsxs("div", { className: "mt-4 flex flex-wrap justify-between text-sm", children: [_jsxs("div", { className: "flex items-center mr-4 mb-2", children: [_jsx("div", { className: "w-4 h-4 bg-green-500 rounded-sm mr-2", "aria-hidden": "true" }), _jsx("span", { children: "Available" })] }), _jsxs("div", { className: "flex items-center mr-4 mb-2", children: [_jsx("div", { className: "w-4 h-4 bg-indigo-600 rounded-sm mr-2", "aria-hidden": "true" }), _jsx("span", { children: "Selected" })] }), _jsxs("div", { className: "flex items-center mb-2", children: [_jsx("div", { className: "w-4 h-4 bg-red-500 rounded-sm mr-2", "aria-hidden": "true" }), _jsx("span", { children: "Booked" })] })] })] }));
};
export default SeatMap;
