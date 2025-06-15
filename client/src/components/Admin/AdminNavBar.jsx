import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  ADMIN_ROUTE,
  DASHBOARD_ROUTE,
  ORDERS_ROUTE,
  PRODUCTS_ROUTE,
  PROFILE_ROUTE,
  SETTINGS_ROUTE,
} from "../../utils/consts";
import { Context } from "../..";

const links = [
  { to: ADMIN_ROUTE + DASHBOARD_ROUTE, label: "DASHBOARD" },
  { to: ADMIN_ROUTE + PRODUCTS_ROUTE, label: "PRODUCTS" },
  { to: ADMIN_ROUTE + ORDERS_ROUTE, label: "ORDERS" },
  { to: ADMIN_ROUTE + SETTINGS_ROUTE + "/general", label: "SETTINGS" },
];

const AdminNavBar = () => {
  const { user } = useContext(Context);
  const navigate = useNavigate();

  return (
    <header className="bg-black text-white px-8 py-4">
      <div className="mx-auto flex items-center ">
        {/* logo */}
        <h2 className="text-xl font-bold w-64 flex-none block">
          <div className="flex items-baseline gap-1">
            <NavLink to={"/"}>Athrion</NavLink>
            <span className="text-red-700">Admin</span>
          </div>
        </h2>
        {/* Navigation */}
        <nav className="w-full hidden md:flex gap-6 uppercase flex items-center justify-between">
          <div>
            {links.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `relative px-4 py-2 text-sm tracking-wide uppercase transition duration-150
                    ${
                      isActive
                        ? "font-semibold text-white border-b-2 border-white"
                        : "text-gray-400 hover:text-white hover:border-b hover:border-neutral-600"
                    }`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>
          {/* Admin settings link */}
          <button
            onClick={() =>
              navigate(ADMIN_ROUTE + SETTINGS_ROUTE + PROFILE_ROUTE)
            }
            className="text-md text-gray-300 hover:text-white transition "
            title="Admin settings"
          >
            {user.user?.firstName || "Admin"} {user.user?.lastName || ""} &nbsp;
            <span className="text-gray-500">({user.user?.email || "-"})</span>
          </button>
        </nav>
      </div>
    </header>
  );
};

export default AdminNavBar;
