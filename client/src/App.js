import { useLocation } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/Common/NavBar";
import Footer from "./components/Common/Footer";
import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { Context } from ".";
import { check } from "./http/userAPI";
import AdminNavBar from "./components/Admin/AdminNavBar";
import { adminRoutes, authRoutes } from "./routes";
const App = observer(() => {
  const { user } = useContext(Context);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const isAuthPage = authRoutes.includes(location.pathname);
  const isAdminPage = adminRoutes.some(route => location.pathname.startsWith(route.path));
  const showAdminNav = isAdminPage && user.isAuth && user.user?.role === 'ADMIN';
  const showNavBar = !isAuthPage && !showAdminNav;
  const showFooter = !isAuthPage && (!isAdminPage || user.user?.role !== 'ADMIN');

  useEffect(() => {
    check()
      .then((data) => {
        if (data) {
          user.setUser(data);
          user.setIsAuth(true);
          user.setEmail(data.email);
          user.setName(data.firstName, data.lastName);
        } else {
          user.setUser({});
          user.setIsAuth(false);
        }
      })
      .finally(() => setLoading(false));
  }, [user]);

  if (loading) {
    return <div/>;
  }

  return (
  <>
    {showAdminNav && <AdminNavBar />}
    {showNavBar && <NavBar />}
    <AppRouter />
    {showFooter && <Footer />}
  </>
  );
});

export default App;
