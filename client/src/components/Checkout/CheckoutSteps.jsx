import React from "react";
import "../../styles/checkout.css";

const steps = ["Einloggen", "Adresse", "Zahlung", "Bestätigen", "Fertig"];

const CheckoutSteps = ({ step }) => {
  return (
    <div className="flex justify-between mb-2">
      {steps.map((label, index) => {
        const number = index + 1;
        const isActive = number === step;
        const isCompleted = number < step;

        return (
          <div
            className={`relative flex flex-col flex-1 items-center text-gray-600 text-xs sm:text-sm md:text-base
               stepper-item ${isCompleted ? "text-white completed" : ""}${
              isActive ? "text-white active" : ""
            }`}
          >
            <div
              className={`
                step-counter
                relative z-10 flex justify-center items-center w-10 h-10 mb-1
                rounded-full border-2 
                ${isCompleted ? "bg-white text-black border-white" : ""}
                ${
                  isActive
                    ? "bg-[#fff] border-white font-bold text-black"
                    : "bg-[#111] border-[#555] text-white"
                }
              `}
            >
              {number}
            </div>
            <p>{label}</p>
          </div>
        );
      })}
    </div>
  );
};

export default CheckoutSteps;
