import { useEffect, useState, useMemo } from "react";
import {
  fetchProducts,
  deleteProduct,
  updateProductIsActive,
} from "../../http/productAPI";
import ProductRow from "./ProductRow";
import ProductDetailsModal from "../Modals/ProductDetailsModal";
import { getUpdatedSortConfig, sortArrayByKey } from "../../utils/helpers";
import AdminTable from "./AdminTable";

const ProductListAdmin = () => {
  const [products, setProducts] = useState([]);
  const [visibilityFilter, setVisibilityFilter] = useState("all");
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectAll, setSelectAll] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: "id", direction: "asc" });
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  // Load products from API on mount
  useEffect(() => {
    fetchProducts()
      .then((data) => setProducts(data))
      .catch((err) => {
        setError("Failed to load products");
        console.error(err);
      });
  }, []);

  // Filter products based on search and visibility
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search by title
    if (search.trim() !== "") {
      const term = search.toLowerCase().trim();
      result = result.filter((p) => p.title.toLowerCase().includes(term));
    }

    // Filter by visibility
    if (visibilityFilter === "active") {
      result = result.filter((p) => p.isActive);
    } else if (visibilityFilter === "inactive") {
      result = result.filter((p) => !p.isActive);
    }

    // Apply sorting
    if (sortConfig) {
      result = sortArrayByKey(result, sortConfig.key, sortConfig.direction);
    }

    return result;
  }, [products, search, sortConfig, visibilityFilter]);

  // Change sort direction to opposite when clicking the same column
  const handleSort = (key) => {
    setSortConfig(getUpdatedSortConfig(sortConfig, key));
  };


  // Select or deselect all orders
  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setSelectedIds(selectAll ? [] : filteredProducts.map((o) => o.id));
  };


  // Toggle a single product checkbox
  const handleCheckbox = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  // Delete selected products
  const handleDeleteSelected = async () => {
    if (!window.confirm("Confirm deletion of selected products?")) return;
    try {
      // Delete products in parallel
      await Promise.all(selectedIds.map((id) => deleteProduct(id)));
      setProducts(products.filter((p) => !selectedIds.includes(p.id)));
      setSelectedIds([]);
      setSelectAll(false);
    } catch (err) {
      setError("Failed to delete selected products");
      console.error(err);
    }
  };

  // Hide selected products
  const handleHideSelected = async () => {
    if (!window.confirm("Hide selected products?")) return;
    try {
      for (const id of selectedIds) {
        await updateProductIsActive(id, { isActive: false });
      }
      setProducts((prev) =>
        prev.map((p) =>
          selectedIds.includes(p.id) ? { ...p, isActive: false } : p
        )
      );
      setSelectedIds([]);
      setSelectAll(false);
    } catch (err) {
      setError("Failed to hide selected products");
      console.error(err);
    }
  };

  // Reset selection when filtered products change
  useEffect(() => {
    setSelectAll(false);
    setSelectedIds([]);
  }, [filteredProducts]);

  // Define table columns
  const columns = [
    { label: "ID", key: "id", sortable: true },
    { label: "Image", key: "image", sortable: false },
    { label: "Title", key: "title", sortable: true },
    { label: "Category", key: "category", sortable: true },
    { label: "Price (€)", key: "price", sortable: true },
    { label: "Actions", key: "actions" },
  ];

  return (
    <div className="p-6 text-white">
      {/* Error and Modal */}
      {error && <p className="text-red-400 mb-4">{error}</p>}
      {selectedProduct && (
        <ProductDetailsModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
      <h2 className="text-xl font-semibold mb-4">Product overview</h2>

      {/* Search products */}
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

      {/* Status filters */}
      <div className="flex items-center gap-4 mb-4">
        <label className="font-semibold">Visibility:</label>
        <select
          value={visibilityFilter}
          onChange={(e) => setVisibilityFilter(e.target.value)}
          className="bg-neutral-800 border border-neutral-700 rounded px-2 py-1 text-sm"
        >
          <option value="all">All</option>
          <option value="active">Active only</option>
          <option value="inactive">Inactive only</option>
        </select>
      </div>

      {/* Product table */}
      <div className="overflow-x-auto border border-gray-600 outline-none rounded-lg">
        <AdminTable
          columns={columns}
          data={filteredProducts}
          selectedIds={selectedIds}
          selectAllChecked={selectAll}
          onCheckboxToggle={handleCheckbox}
          onSelectAllToggle={handleSelectAll}
          onSort={handleSort}
          sortConfig={sortConfig}
          emptyText="No products found."
          renderRow={(product) => (
            <ProductRow
              key={product.id}
              product={product}
              selectedIds={selectedIds}
              handleCheckbox={handleCheckbox}
              onView={() => setSelectedProduct(product)}
            />
          )}
        />

        {/* Bulk actions for selected products */}
        <div className="px-2 py-2">
          {selectedIds.length > 0 && (
            <div className="flex gap-4">
              <button
                onClick={handleHideSelected}
                className="bg-yellow-600 hover:bg-yellow-500 text-sm font-semibold px-4 py-2 rounded"
              >
                Hide selected ({selectedIds.length})
              </button>
              <button
                onClick={handleDeleteSelected}
                className="bg-red-700 hover:bg-red-600 text-sm font-semibold px-4 py-2 rounded"
              >
                Delete selected ({selectedIds.length})
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductListAdmin;
