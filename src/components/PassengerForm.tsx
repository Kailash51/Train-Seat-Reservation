import React, { useState } from "react";
import { Passenger } from "../types";

interface PassengerFormProps {
  passengers: Passenger[];
  onSubmit: (passengers: Passenger[]) => void;
  onBack: () => void;
}

const PassengerForm: React.FC<PassengerFormProps> = ({
  passengers,
  onSubmit,
  onBack,
}) => {
  const [formPassengers, setFormPassengers] = useState<Passenger[]>(passengers);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (
    index: number,
    field: keyof Passenger,
    value: string
  ) => {
    const updatedPassengers = [...formPassengers];
    updatedPassengers[index] = { ...updatedPassengers[index], [field]: value };
    setFormPassengers(updatedPassengers);
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    formPassengers.forEach((passenger, index) => {
      if (!passenger.name.trim()) {
        newErrors[`name-${index}`] = "Name is required";
      }
      if (!passenger.age.trim()) {
        newErrors[`age-${index}`] = "Age is required";
      } else if (
        isNaN(Number(passenger.age)) ||
        Number(passenger.age) < 0 ||
        Number(passenger.age) > 120
      ) {
        newErrors[`age-${index}`] =
          "Please enter a valid age between 0 and 120";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formPassengers);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6">
      <h2 className="text-lg font-semibold mb-4">Passenger Information</h2>
      {formPassengers.map((passenger, index) => (
        <div key={index} className="mb-4 p-4 bg-gray-50 rounded-md">
          <h3 className="text-md font-medium mb-2">Passenger {index + 1}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor={`name-${index}`}
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id={`name-${index}`}
                value={passenger.name}
                onChange={(e) =>
                  handleInputChange(index, "name", e.target.value)
                }
                required
                className={`mt-1 block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-50 ${
                  errors[`name-${index}`]
                    ? "border-red-300 focus:border-red-300 focus:ring-red-200"
                    : "border-gray-300 focus:border-indigo-300 focus:ring-indigo-200"
                }`}
                aria-invalid={errors[`name-${index}`] ? "true" : "false"}
                aria-describedby={`name-error-${index}`}
              />
              {errors[`name-${index}`] && (
                <p
                  id={`name-error-${index}`}
                  className="mt-1 text-sm text-red-600"
                >
                  {errors[`name-${index}`]}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor={`age-${index}`}
                className="block text-sm font-medium text-gray-700"
              >
                Age
              </label>
              <input
                type="number"
                id={`age-${index}`}
                value={passenger.age}
                onChange={(e) =>
                  handleInputChange(index, "age", e.target.value)
                }
                required
                min="0"
                max="120"
                className={`mt-1 block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-50 ${
                  errors[`age-${index}`]
                    ? "border-red-300 focus:border-red-300 focus:ring-red-200"
                    : "border-gray-300 focus:border-indigo-300 focus:ring-indigo-200"
                }`}
                aria-invalid={errors[`age-${index}`] ? "true" : "false"}
                aria-describedby={`age-error-${index}`}
              />
              {errors[`age-${index}`] && (
                <p
                  id={`age-error-${index}`}
                  className="mt-1 text-sm text-red-600"
                >
                  {errors[`age-${index}`]}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Back
        </button>
        <button
          type="submit"
          className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Review Reservation
        </button>
      </div>
    </form>
  );
};

export default PassengerForm;
