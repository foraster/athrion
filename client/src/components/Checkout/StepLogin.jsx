import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../index";
import { ADDRESS_ROUTE, CHECKOUT_ADDRESS_ROUTE, CHECKOUT_ROUTE, LOGIN_ROUTE } from "../../utils/consts";

const StepLogin = () => {
  const { user } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.isAuth) {
      navigate(CHECKOUT_ROUTE + '/' + CHECKOUT_ADDRESS_ROUTE);
    } else {
      navigate(LOGIN_ROUTE + "?redirect=checkout");
    }
  }, [user.isAuth, navigate]);

  return null;
};

export default StepLogin;