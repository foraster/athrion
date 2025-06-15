import { useState, useEffect } from "react";

// This component is a controlled input for quantity selection in cart
const QuantityInput = ({ value, onChange }) => {
  const [inputValue, setInputValue] = useState(String(value));
  // Initialize input value from prop
  useEffect(() => {
    setInputValue(String(value));
  }, [value]);

  const handleChange = (e) => {
    const val = e.target.value;
    // Allow empty input to reset
    if (val === "") {
      setInputValue("");
      return;
    }

    // Validate input: must be a number between 1 and 99
    const num = parseInt(val);
    if (!isNaN(num) && num > 0 && num <= 99) {
      setInputValue(val);
      onChange(num);
    }
  };

  return (
    <input
      type="number"
      className="no-spinner w-10 text-center bg-neutral-900 border border-neutral-700 rounded px-2 py-1 text-white"
      value={inputValue}
      onChange={handleChange}
    />
  );
};

export default QuantityInput;
