import React, { useContext } from "react";
import { useOutletContext } from "react-router-dom";
import { Context } from "../../index";
import { CHECKOUT_ADDRESS_ROUTE, CHECKOUT_ROUTE } from "../../utils/consts";
import { useStepGuard } from "../../hooks/useStepGuard";
import { createOrder } from "../../http/orderAPI";
import { fromCents } from "../../utils/helpers";

const StepConfirmation = () => {
  const { user } = useContext(Context);
  const { onBack, onNext, address, paymentMethod } = useOutletContext();
  const { cart } = useContext(Context);
  useStepGuard(
    user.user.id &&
      address?.firstName &&
      address?.lastName &&
      address?.addressLine1 &&
      address?.zip &&
      address?.city &&
      paymentMethod,
    CHECKOUT_ROUTE + "/" + CHECKOUT_ADDRESS_ROUTE
  );



  const handleConfirm = async () => {
    try {
      await createOrder(user.user.id, cart.totalPriceCents, cart.products);
      cart.clear();
      onNext();
    } catch (error) {
      console.error("Failed to confirm order:", error);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Bestellübersicht</h2>
      <div>
        <h3 className="text-lg font-medium mb-2">Lieferadresse</h3>
        <div className="bg-neutral-800 p-4 rounded text-sm">
          <div className="bg-neutral-800 p-4 rounded text-sm space-y-1">
            <div>
              {address.firstName} {address.lastName}
            </div>
            <div>{address.addressLine1}</div>
            {address.addressLine2 && <div>{address.addressLine2}</div>}
            <div>
              {address.zip} {address.city}
            </div>
            <div>{address.country}</div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-2">Warenkorb</h3>
        <div className="bg-neutral-800 p-4 rounded text-sm space-y-2">
          {cart.products.map((item) => (
            <div key={item.id} className="flex justify-between">
              <span>
                {item.title} x {item.quantity}
              </span>
              <span>{fromCents(item.price_cents * item.quantity)} €</span>
            </div>
          ))}
        </div>
      </div>

      <div className="text-right font-semibold text-lg pt-2">
        Gesamt: {fromCents(cart.totalPriceCents)} €
      </div>
      <h3 className="text-lg font-medium mb-2">Bezahlen mit {paymentMethod}</h3>

      <div className="flex justify-between pt-4">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-2 border border-white rounded hover:bg-white hover:text-black transition"
        >
          Zurück
        </button>
        <button
          type="button"
          onClick={handleConfirm}
          className="px-6 py-2 bg-white text-black rounded hover:bg-gray-200 font-semibold transition"
        >
          Kostenpflichtig fortsetzen
        </button>
      </div>
    </div>
  );
};

export default StepConfirmation;
