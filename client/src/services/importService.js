import { ADMIN_ROUTE, IMPORT_ROUTE, PRODUCTS_ROUTE } from "../utils/consts";
import Papa from "papaparse";

/*
 * Handle CSV import from file input.
 * Parses the selected CSV file and stores the result in localStorage
 * for preview on the import confirmation page.
 */
export const importCSV = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  Papa.parse(file, {
    header: true,
    skipEmptyLines: true,
    delimiter: ";",
    complete: function (results) {
      // Store parsed CSV data temporarily for preview
      localStorage.setItem(
        "IMPORT_PRODUCTS_PREVIEW",
        JSON.stringify(results.data)
      );
      // Navigate to import preview page
      window.location.href = ADMIN_ROUTE + PRODUCTS_ROUTE + IMPORT_ROUTE;
    },
    error: function (err) {
      alert("Failed to read CSV: " + err.message);
    },
  });
};
