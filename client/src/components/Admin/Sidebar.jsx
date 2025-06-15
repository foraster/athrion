import { sidebarMap } from "../../config/sideBarConfig";
import {
  exportProductsToCSV,
  exportOrdersToCSV,
} from "../../services/csvService";
import { useLocation, NavLink } from "react-router-dom";
import { importCSV } from "../../services/importService";

/*
 * Handles special sidebar actions like export/import.
 * Recognized by `isAction: true` in sidebarMap.
 */
const handleSidebarAction = (to) => {
  switch (to) {
    case "#EXPORT_PRODUCTS":
      return exportProductsToCSV();
    case "#EXPORT_ORDERS":
      return exportOrdersToCSV();
    case "#IMPORT_PRODUCTS":
      // Triggers hidden file input for CSV import
      document.getElementById("csv-import-input").click();
      return;
    default:
      return;
  }
};

const Sidebar = () => {
  const location = useLocation();
  const path = location.pathname;

  // Determine which section of the sidebar is active based on route
  const activeSection = sidebarMap.find((section) =>
    path.startsWith(section.match)
  );

  const links = activeSection?.links || [];

  return (
    <aside className="w-72 bg-[#1c1c1c] border-r border-gray-700">
      <nav className="flex flex-col">
        {/* Hidden file input for CSV import */}
        <input
          type="file"
          id="csv-import-input"
          accept=".csv"
          style={{ display: "none" }}
          onChange={importCSV}
        />

        {/* Render navigation links and action buttons based on the active section */}
        {links.map(({ to, label, isAction }) =>
          isAction ? (
            <button
              key={label}
              onClick={() => {
                handleSidebarAction(to);
              }}
              className="text-left w-full px-4 py-4 text-md text-gray-300 
                 hover:bg-neutral-700 hover:text-white 
                 border-b border-gray-700 transition duration-150"
            >
              {label}
            </button>
          ) : (
            <NavLink
              key={to}
              to={to}
              end
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
          )
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
