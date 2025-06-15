import { useNavigate } from "react-router-dom";
import {
  CHECKOUT_CONFIRMATION_ROUTE,
  CHECKOUT_ROUTE,
  PROFILE_ROUTE,
} from "../../utils/consts";
import { useStepGuard } from "../../hooks/useStepGuard";

const StepDone = () => {
  const orderId = true;
  // Ensure the order ID is valid before proceeding
  useStepGuard(orderId, CHECKOUT_ROUTE + "/" + CHECKOUT_CONFIRMATION_ROUTE);
  const navigate = useNavigate();

  return (
    <div className="text-center space-y-6">
      <h2 className="text-3xl font-semibold text-white">
        Vielen Dank für Ihre Bestellung!
      </h2>
      <p className="text-gray-400 text-lg">
        Ihre Bestellung wurde erfolgreich aufgegeben. Sie erhalten in Kürze eine
        Bestätigung per E-Mail.
      </p>

      <div className="pt-6">
        <button
          onClick={() => navigate(PROFILE_ROUTE)}
          className="px-6 py-3 bg-white text-black rounded font-semibold hover:bg-gray-200 transition"
        >
          Zum Profil
        </button>
      </div>
    </div>
  );
};

export default StepDone;
