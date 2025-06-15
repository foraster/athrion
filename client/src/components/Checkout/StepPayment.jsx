import { useOutletContext } from "react-router-dom";
import { useStepGuard } from "../../hooks/useStepGuard";
import { CHECKOUT_ADDRESS_ROUTE, CHECKOUT_ROUTE } from "../../utils/consts";

const StepPayment = () => {
  const { onNext, onBack, address, paymentMethod, setPaymentMethod } =
    useOutletContext();
  // Ensure the address is complete before proceeding
  useStepGuard(
    address?.firstName &&
      address?.lastName &&
      address?.addressLine1 &&
      address?.zip &&
      address?.city,
    CHECKOUT_ROUTE + "/" + CHECKOUT_ADDRESS_ROUTE
  );

  // Handle payment method selection
  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-semibold">Zahlungsart wählen</h2>
      <div className="space-y-3">
        <label className="block">
          <input
            type="radio"
            value="card"
            checked={paymentMethod === "card"}
            onChange={() => setPaymentMethod("card")}
            className="mr-2"
          />
          Kreditkarte
        </label>
        <label className="block">
          <input
            type="radio"
            value="paypal"
            checked={paymentMethod === "paypal"}
            onChange={() => setPaymentMethod("paypal")}
            className="mr-2"
          />
          PayPal
        </label>
        <label className="block">
          <input
            type="radio"
            value="cash"
            checked={paymentMethod === "cash"}
            onChange={() => setPaymentMethod("cash")}
            className="mr-2"
          />
          Barzahlung bei Lieferung
        </label>
      </div>

      <div className="flex justify-between pt-4">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-2 border border-white rounded hover:bg-white hover:text-black transition"
        >
          Zurück
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-white text-black rounded hover:bg-gray-200 font-semibold transition"
        >
          Weiter
        </button>
      </div>
    </form>
  );
};

export default StepPayment;
