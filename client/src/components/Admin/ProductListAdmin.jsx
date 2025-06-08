import React, { useEffect, useState } from "react";
import { fetchProducts, deleteProduct } from "../../http/productAPI";
import ProductRow from "./ProductRow";
import {
  getUpdatedSortConfig,
  renderSortArrow,
  sortArrayByKey,
} from "../../utils/helpers";

const ProductListAdmin = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: "id", direction: "asc" });
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProducts()
      .then((data) => setProducts(data))
      .catch((err) => {
        setError("Failed to load products");
        console.error(err);
      });
  }, []);

  useEffect(() => {
    let result = [...products];

    if (search.trim() !== "") {
      const term = search.toLowerCase().trim();
      result = result.filter((p) =>
        p.title.toLowerCase().includes(term)
      );
    }

    if (sortConfig) {
      result = sortArrayByKey(result, sortConfig.key, sortConfig.direction);
    }

    setFilteredProducts(result);
  }, [products, search, sortConfig]);

  const handleSort = (key) => {
    setSortConfig(getUpdatedSortConfig(sortConfig, key));
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredProducts.map((p) => p.id));
    }
    setSelectAll(!selectAll);
  };

  const handleCheckbox = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleDeleteSelected = async () => {
    if (!window.confirm("Confirm deletion of selected products?")) return;
    try {
      for (const id of selectedIds) {
        await deleteProduct(id);
      }
      setProducts(products.filter((p) => !selectedIds.includes(p.id)));
      setSelectedIds([]);
      setSelectAll(false);
    } catch (err) {
      setError("Failed to delete selected products");
      console.error(err);
    }
  };

  return (
    <div className="p-6 text-white">
      <h2 className="text-xl font-semibold mb-4">Product overview</h2>

      <div className="flex mb-4">
        <h2 className="text-xl font-semibold pr-4">Product search:</h2>
        <input
          className="rounded-lg bg-neutral-800 px-4 border border-neutral-700"
          type="text"
          placeholder="Product name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {error && <p className="text-red-400 mb-4">{error}</p>}

      <div className="overflow-x-auto border border-gray-600 outline-none rounded-lg">
        <table className="min-w-full text-md text-left border-none outline-none">
          <thead className="bg-neutral-800 text-gray-300 uppercase border-none outline-none">
            <tr>
              <th className="px-2 py-3">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                  className="w-4 h-4"
                />
              </th>
              <th className="px-4 py-3 cursor-pointer" onClick={() => handleSort("id")}>
                ID{renderSortArrow(sortConfig, "id")}
              </th>
              <th className="px-4 py-3">Image</th>
              <th className="px-4 py-3 cursor-pointer" onClick={() => handleSort("title")}>
                Title{renderSortArrow(sortConfig, "title")}
              </th>
              <th className="px-4 py-3 cursor-pointer" onClick={() => handleSort("category")}>
                Category{renderSortArrow(sortConfig, "category")}
              </th>
              <th className="px-4 py-3 cursor-pointer" onClick={() => handleSort("price")}>
                Price (€){renderSortArrow(sortConfig, "price")}
              </th>
              <th className="px-2 py-3"></th>
            </tr>
          </thead>
          <tbody className="bg-neutral-900 divide-y-2 divide-neutral-700">
            {filteredProducts.map((p) => (
              <ProductRow
                key={p.id}
                product={p}
                handleCheckbox={handleCheckbox}
                selectedIds={selectedIds}
              />
            ))}

            {filteredProducts.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-6 text-gray-400">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="px-2 py-2">
          {selectedIds.length > 0 && (
            <button
              onClick={handleDeleteSelected}
              className="bg-red-700 hover:bg-red-600 text-sm font-semibold px-4 py-2 rounded"
            >
              Delete selected ({selectedIds.length})
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductListAdmin;