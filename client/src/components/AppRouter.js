import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { authRoutes, publicRoutes } from "../routes";
import { ADMIN_ROUTE, CHECKOUT_ADDRESS_ROUTE, CHECKOUT_CONFIRMATION_ROUTE, CHECKOUT_DONE_ROUTE, CHECKOUT_LOGIN_ROUTE, CHECKOUT_PAYMENT_ROUTE, CHECKOUT_ROUTE } from "../utils/consts";
import NotFound from "../pages/NotFound";
import { Context } from "../index";
import Admin from "../pages/Admin";
import StepLogin from "./Checkout/StepLogin";
import StepAddress from "./Checkout/StepAddress";
import StepPayment from "./Checkout/StepPayment";
import StepConfirmation from "./Checkout/StepConfirmation";
import StepDone from "./Checkout/StepDone";
import CheckoutPage from "../pages/CheckoutPage";

const AppRouter = () => {
  const { user } = useContext(Context);
  return (
    <Routes>

      {user.isAuth && user.user?.role === 'ADMIN' && <Route path={ADMIN_ROUTE + "/*"} element={<Admin />} />}

      {user.isAuth && (
        <Route path={CHECKOUT_ROUTE} element={<CheckoutPage />}>
          <Route index element={<StepLogin />} />
          <Route path={CHECKOUT_LOGIN_ROUTE} element={<StepLogin />} />
          <Route path={CHECKOUT_ADDRESS_ROUTE} element={<StepAddress />} />
          <Route path={CHECKOUT_PAYMENT_ROUTE} element={<StepPayment />} />
          <Route
            path={CHECKOUT_CONFIRMATION_ROUTE}
            element={<StepConfirmation />}
          />
          <Route path={CHECKOUT_DONE_ROUTE} element={<StepDone />} />
        </Route>
      )}
      
      {user.isAuth &&
        authRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} exact />
        ))}
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} exact />
      ))}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
