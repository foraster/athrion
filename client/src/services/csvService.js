import { fromCents, formatOrderId, formatDate } from "../utils/helpers";
import { fetchProducts } from "../http/productAPI";
import { fetchAllOrders } from "../http/orderAPI";

/**
 * Export all products to a CSV file with predefined fields and format.
 */
export const exportProductsToCSV = async () => {
  try {
    const products = await fetchProducts();

    const headers = [
      "ID",
      "Title",
      "Category",
      "Subcategory",
      "Price",
      "Active",
      "IntroTitle (DE)",
      "IntroText (DE)",
      "Features (DE)",
      "Highlights (DE)",
      "ClosingText (DE)",
    ];

    const rows = products.map((p) => [
      p.id,
      p.title,
      p.category,
      p.subcategory || "",
      fromCents(p.price_cents),
      p.isActive ? "true" : "false",
      p.description?.de?.introTitle || "",
      p.description?.de?.introText || "",
      (p.description?.de?.features || []).join(" | "),
      (p.description?.de?.highlights || []).join(" | "),
      p.description?.de?.closingText || "",
    ]);

    downloadCSV("products.csv", headers, rows);
  } catch (error) {
    console.error("Product export failed:", error);
    alert("Export fehlgeschlagen.");
  }
};

/**
 * Export all orders to a CSV file with key customer and order info.
 */
export const exportOrdersToCSV = async () => {
  try {
    const orders = await fetchAllOrders();

    const headers = [
      "Order ID",
      "Customer",
      "Total",
      "Address",
      "Date",
      "Status",
    ];

    const rows = orders.map((o) => [
      formatOrderId(o.id),
      o.user?.email || "-",
      fromCents(o.total_price_cents),
      o.shipping_address
        ? `${o.shipping_address.firstName} ${o.shipping_address.lastName}, ${o.shipping_address.addressLine1}, ${o.shipping_address.zip} ${o.shipping_address.city}`
        : "-",
      formatDate(o.createdAt),
      o.status,
    ]);

    downloadCSV("orders.csv", headers, rows);
  } catch (error) {
    console.error("Order export failed:", error);
    alert("Export fehlgeschlagen.");
  }
};

/**
 * Create a downloadable CSV file from headers and rows.
 * Automatically triggers file download in the browser.
 */
function downloadCSV(filename, headers, rows) {
  const csv = [headers, ...rows].map((row) => row.join(";")).join("\n");

  // Create blob from CSV string
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  // Programmatically trigger download
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Release memory
  URL.revokeObjectURL(url);
}