import React from "react";
import { NavLink } from "react-router-dom";
import { ADD_PRODUCT_ROUTE, ADMIN_ROUTE, DASHBOARD_ROUTE, EDIT_PRODUCT_ROUTE, ORDERS_ROUTE, PRODUCTS_ROUTE, SETTINGS_ROUTE } from "../../utils/consts";

const links = [
    { to: ADMIN_ROUTE + DASHBOARD_ROUTE, label: "DASHBOARD" },
    { to: ADMIN_ROUTE + PRODUCTS_ROUTE, label: "SEE PRODUCTS" },
    { to: ADMIN_ROUTE + ORDERS_ROUTE, label: "ORDERS" },
    { to: ADMIN_ROUTE + SETTINGS_ROUTE, label: "SETTINGS" },
  ];

const AdminNavBar = () => {
  return (
    <header className="bg-black text-white px-6 py-4">
      <div className="mx-auto flex items-center ">
        {/* logo */}
        <h2 className="text-xl font-bold w-72">Athrion <span className="text-red-700">Admin</span></h2>
        {/* Navigation */}
        <nav className="hidden md:flex gap-6 text-sm uppercase flex items-center">
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
        </nav>
      </div>
    </header>
  );
};

export default AdminNavBar;
