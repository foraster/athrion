import { useEffect, useState } from "react";
import { createProduct } from "../../http/productAPI";
import { useNavigate } from "react-router-dom";
import { toCents } from "../../utils/helpers";
import { ADMIN_ROUTE, PRODUCTS_ROUTE } from "../../utils/consts";

// Required headers to check CSV file validity
const REQUIRED_HEADERS = [
  "Title",
  "Category",
  "Price",
  "Active",
  "IntroTitle (DE)",
  "IntroText (DE)",
  "Features (DE)",
  "Highlights (DE)",
  "ClosingText (DE)",
];

const ProductImportPreview = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const data = localStorage.getItem("IMPORT_PRODUCTS_PREVIEW");
    if (!data) return;

    // Parse the CSV data
    const parsed = JSON.parse(data);
    const headers = Object.keys(parsed[0] || {});
    const missingHeaders = REQUIRED_HEADERS.filter((h) => !headers.includes(h));

    // Check for required headers
    if (missingHeaders.length > 0) {
      setError(`Missing required headers: ${missingHeaders.join(", ")}`);
      return;
    }

    // Validate each row for required fields
    for (const p of parsed) {
      if (!p["Title"] || !p["Category"] || !p["Price"] || !p["Active"]) {
        setError("One or more rows have missing required fields.");
        return;
      }
    }

    setProducts(parsed);
  }, []);
  const handleImport = async () => {
    try {
      // Save each product to the database
      for (const p of products) {
        const formData = new FormData();
        formData.append("title", p["Title"]);
        formData.append("category", p["Category"]);
        formData.append("subcategory", p["Subcategory"] || "");
        formData.append("price_cents", toCents(p["Price"]));
        formData.append("isActive", p["Active"] === "true");

        const desc = {
          de: {
            introTitle: p["IntroTitle (DE)"],
            introText: p["IntroText (DE)"],
            features: p["Features (DE)"]?.split("|").map((f) => f.trim()),
            highlights: p["Highlights (DE)"]?.split("|").map((f) => f.trim()),
            closingText: p["ClosingText (DE)"],
          },
          en: {
            introTitle: "",
            introText: "",
            features: [],
            highlights: [],
            closingText: "",
          },
        };
        formData.append("description", JSON.stringify(desc));
        await createProduct(formData);
      }
    } catch (e) {
      console.error(e);
      return setError(
        `An error occurred while importing products: ${e.message}: ${e.response.data.message}`
      );
    }

    alert("Imported successfully.");
    // Clear local storage and navigate back to products page
    localStorage.removeItem("IMPORT_PRODUCTS_PREVIEW");
    navigate("/admin/products");
  };

  return (
    <div className="p-6 text-white max-w-6xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">
        Preview products for import
      </h2>

      {error ? (
        <div className="bg-red-800 text-white p-4 rounded mb-6">
          <p className="font-semibold mb-2">Invalid CSV file:</p>
          <p>{error}</p>
          <p>Required template:</p>
          <pre className="mt-4 bg-black text-white p-2 text-sm rounded">
            Title;Category;Subcategory;Price;Active;IntroTitleDE);IntroText
            (DE);Features (DE);Highlights (DE);ClosingText (DE)
            <br />
            Fitnessband;equipment;band;19.99;true;Dein Start;leicht | stark |
            vielseitig;kompakt | mobil;Bereit für dein Training
          </pre>
        </div>
      ) : (
        <>
          <table className="w-full text-sm text-left border border-gray-600 mb-6">
            <thead>
              <tr>
                {Object.keys(products[0] || {}).map((key) => (
                  <th key={key} className="border px-2 py-1">
                    {key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {products.map((row, idx) => (
                <tr key={idx}>
                  {Object.values(row).map((val, i) => (
                    <td key={i} className="border px-2 py-1 text-neutral-200">
                      {val}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex gap-4">
            <button
              onClick={() => navigate(ADMIN_ROUTE + PRODUCTS_ROUTE)}
              className="px-4 py-2 rounded bg-gray-700 text-white hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              onClick={handleImport}
              className="px-4 py-2 rounded bg-white text-black font-semibold hover:bg-gray-100"
            >
              Import now
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductImportPreview;
