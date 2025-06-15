import { useContext, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useStepGuard } from "../../hooks/useStepGuard";
import { CHECKOUT_LOGIN_ROUTE, CHECKOUT_ROUTE } from "../../utils/consts";
import { Context } from "../..";

const StepAddress = () => {
  const { user } = useContext(Context)
  const { onNext, onBack, setAddress, address } = useOutletContext();
  useStepGuard(user.isAuth, CHECKOUT_ROUTE + '/' + CHECKOUT_LOGIN_ROUTE)
  const [error, setError] = useState("");

  // Handle input changes for address fields
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAddress((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Validate and submit address
  const handleSubmit = () => {
    const required = ["firstName", "lastName", "addressLine1", "zip", "city"];
    for (let field of required) {
      if (!address[field].trim()) {
        setError("Bitte fülle alle Pflichtfelder aus.");
        return;
      }
    }
    setError("");
    onNext();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Lieferadresse</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          name="firstName"
          placeholder="Vorname *"
          value={address.firstName}
          onChange={handleChange}
          className="bg-neutral-800 text-white px-4 py-2 rounded border border-neutral-700"
        />
        <input
          name="lastName"
          placeholder="Nachname *"
          value={address.lastName}
          onChange={handleChange}
          className="bg-neutral-800 text-white px-4 py-2 rounded border border-neutral-700"
        />
        <input
          name="addressLine1"
          placeholder="Adresszeile 1 *"
          value={address.addressLine1}
          onChange={handleChange}
          className="bg-neutral-800 text-white px-4 py-2 rounded border border-neutral-700 col-span-full"
        />
        <input
          name="addressLine2"
          placeholder="Adresszusatz"
          value={address.addressLine2}
          onChange={handleChange}
          className="bg-neutral-800 text-white px-4 py-2 rounded border border-neutral-700 col-span-full"
        />
        <input
          name="zip"
          placeholder="Postleitzahl *"
          value={address.zip}
          onChange={handleChange}
          className="bg-neutral-800 text-white px-4 py-2 rounded border border-neutral-700"
        />
        <input
          name="city"
          placeholder="Stadt *"
          value={address.city}
          onChange={handleChange}
          className="bg-neutral-800 text-white px-4 py-2 rounded border border-neutral-700"
        />
        <input
          name="country"
          value={address.country}
          disabled
          className="bg-neutral-700 text-white px-4 py-2 rounded border border-neutral-700 col-span-full opacity-70"
        />
      </div>

      <label className="flex items-center gap-3 text-sm text-gray-300">
        <input
          type="checkbox"
          name="save"
          checked={address.save}
          onChange={handleChange}
          className="w-4 h-4"
        />
        Adresse für zukünftige Bestellungen speichern
      </label>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="flex justify-between pt-4">
        <button
          onClick={onBack}
          className="px-4 py-2 border border-white rounded hover:bg-white hover:text-black transition"
        >
          Zurück
        </button>
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-white text-black rounded hover:bg-gray-200 font-semibold"
        >
          Weiter
        </button>
      </div>
    </div>
  );
};

export default StepAddress;