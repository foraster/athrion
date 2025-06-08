import React from "react";
import {
  ADD_PRODUCT_ROUTE,
  ADMIN_ROUTE,
  DASHBOARD_ROUTE,
  ORDERS_ROUTE,
  PRODUCTS_ROUTE,
  USERS_ROUTE,
  SETTINGS_ROUTE,
} from "../../utils/consts";
import { useLocation, NavLink } from "react-router-dom";


const sidebarMap = [
  {
    match: ADMIN_ROUTE + DASHBOARD_ROUTE,
    links: [
      { to: ADMIN_ROUTE + DASHBOARD_ROUTE, label: "Overview" },
      { to: ADMIN_ROUTE + USERS_ROUTE, label: "Users" },
    ],
  },
  {
    match: ADMIN_ROUTE + PRODUCTS_ROUTE,
    links: [
      { to: ADMIN_ROUTE + PRODUCTS_ROUTE, label: "See products" },
      { to: ADMIN_ROUTE + ADD_PRODUCT_ROUTE, label: "Add new product" },
    ],
  },
  {
    match: ADMIN_ROUTE + ORDERS_ROUTE,
    links: [
      { to: ADMIN_ROUTE + ORDERS_ROUTE, label: "Orders" },
    ],
  },
  {
    match: ADMIN_ROUTE + SETTINGS_ROUTE,
    links: [
      { to: ADMIN_ROUTE + SETTINGS_ROUTE, label: "Settings" },
    ],
  },
];
const Sidebar = () => {
  const location = useLocation();
  const path = location.pathname;

  const activeSection = sidebarMap.find((section) =>
    path.startsWith(section.match)
  );

  const links = activeSection?.links || [];
  return (
    <aside className="w-72 bg-[#1c1c1c] border-r border-gray-700">
      <nav className="flex flex-col">
      {links.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `px-4 py-4 text-left text-md text-gray-300 
               hover:bg-neutral-700 hover:text-white 
               border-b border-gray-700 transition duration-150 ${
                 isActive ? "bg-neutral-800 text-white font-semibold" : ""
               }`
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
