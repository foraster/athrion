import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "..";
import { HOME_ROUTE } from "../utils/consts";

const RequireAdmin = observer(({ children }) => {
  const { user } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.isAuth || user.user.role !== "ADMIN") {
      navigate(HOME_ROUTE, { replace: true });
    }
  }, [user, navigate]);

  return <>{children}</>;
});

export default RequireAdmin;