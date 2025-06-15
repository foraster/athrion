import {
  ADD_PRODUCT_ROUTE,
  ADMIN_ROUTE,
  DASHBOARD_ROUTE,
  ORDERS_ROUTE,
  PRODUCTS_ROUTE,
  USERS_ROUTE,
  SETTINGS_ROUTE,
} from "../utils/consts";

export const sidebarMap = [
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
      { to: "#EXPORT_PRODUCTS", label: "Export as CSV", isAction: true },
      { to: "#IMPORT_PRODUCTS", label: "Import from CSV", isAction: true },
    ],
  },
  {
    match: ADMIN_ROUTE + ORDERS_ROUTE,
    links: [
      { to: ADMIN_ROUTE + ORDERS_ROUTE, label: "Orders" },
      { to: "#EXPORT_ORDERS", label: "Export as CSV", isAction: true },
    ],
  },
  {
    match: ADMIN_ROUTE + SETTINGS_ROUTE,
    links: [
      { to: ADMIN_ROUTE + SETTINGS_ROUTE + "/profile", label: "Profile" },
      { to: ADMIN_ROUTE + SETTINGS_ROUTE + "/general", label: "General" },
      { to: ADMIN_ROUTE + SETTINGS_ROUTE + "/payments", label: "Payments" },
      { to: ADMIN_ROUTE + SETTINGS_ROUTE + "/shipping", label: "Shipping" },
      { to: ADMIN_ROUTE + SETTINGS_ROUTE + "/emails", label: "Emails" },
      { to: ADMIN_ROUTE + SETTINGS_ROUTE + "/security", label: "Security" },
    ],
  },
];