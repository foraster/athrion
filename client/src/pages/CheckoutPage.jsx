import React, { useState } from "react";
import CheckoutSteps from "../components/Checkout/CheckoutSteps";
import { Outlet, useLocation, useNavigate } from "react-router-dom";


const CheckoutPage = () => { 
  
  const [address, setAddress] = useState({
      firstName: "",
      lastName: "",
      addressLine1: "",
      addressLine2: "",
      zip: "",
      city: "",
      country: "Deutschland",
      save: false,
    });
  const [paymentMethod, setPaymentMethod] = useState("card");
  const location = useLocation();
  const navigate = useNavigate();
  const stepMap = {
    login: 1,
    address: 2,
    payment: 3,
    confirmation: 4,
    done: 5,
  };
  const stepOrder = ["login", "address", "payment", "confirmation", "done"];
  const currentPath = location.pathname.split("/").pop();
  const step = stepMap[currentPath] || 1;
  const stepIndex = step - 1;

  const onNext = () => {
    if (stepIndex < stepOrder.length - 1) {
      navigate(`/checkout/${stepOrder[stepIndex + 1]}`, { replace: true });
    }
  };
  const onBack = () => {
    if (stepIndex > 0) {
      navigate(`/checkout/${stepOrder[stepIndex - 1]}`, { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <div className="max-w-4xl mx-auto space-y-10">
        <CheckoutSteps step={step} />
        <Outlet context={{ onNext, onBack, setAddress, address, paymentMethod, setPaymentMethod}} />
      </div>
    </div>
  );
};

export default CheckoutPage;
