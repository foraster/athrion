import React, { useEffect, useState } from "react";
import { fetchAllOrders } from "../../http/orderAPI";
import { formatDate, formatOrderId, fromCents, getUpdatedSortConfig, renderSortArrow, sortArrayByKey } from "../../utils/helpers";
import { statusMap } from "../../utils/consts";

const OrderListAdmin = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "createdAt", direction: "desc" });
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAllOrders()
      .then((data) => setOrders(data))
      .catch((err) => {
        setError("Failed to load orders");
        console.error(err);
      });
  }, []);

  useEffect(() => {
    let result = [...orders];

    if (search.trim() !== "") {
      const term = search.toLowerCase().trim();
      result = result.filter(
        (o) =>
          o.id.toLowerCase().includes(term) ||
          o.user?.email?.toLowerCase().includes(term) ||
          statusMap[o.status]?.toLowerCase().includes(term)
      );
    }

    if (sortConfig) {
      result = sortArrayByKey(result, sortConfig.key, sortConfig.direction);
    }

    setFilteredOrders(result);
  }, [orders, search, sortConfig]);

  const handleSort = (key) => {
    setSortConfig(getUpdatedSortConfig(sortConfig, key));
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredOrders.map((o) => o.id));
    }
    setSelectAll(!selectAll);
  };

  const handleCheckbox = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };
  
  return (
    <div className="p-6 text-white">
      <h2 className="text-xl font-semibold mb-4">Order overview</h2>

      <div className="flex mb-4">
        <h2 className="text-xl font-semibold pr-4">Search:</h2>
        <input
          className="rounded-lg bg-neutral-800 px-4 border border-neutral-700"
          type="text"
          placeholder="Order ID, Email or Status"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {error && <p className="text-red-400 mb-4">{error}</p>}

      <div className="overflow-x-auto border border-gray-600 rounded-lg">
        <table className="min-w-full text-md text-left">
          <thead className="bg-neutral-800 text-gray-300 uppercase">
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
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3 cursor-pointer" onClick={() => handleSort("status")}>
                Status{renderSortArrow(sortConfig, "status")}
              </th>
              <th className="px-4 py-3 cursor-pointer" onClick={() => handleSort("total_price_cents")}>
                Total (€){renderSortArrow(sortConfig, "total_price_cents")}
              </th>
              <th className="px-4 py-3 cursor-pointer" onClick={() => handleSort("createdAt")}>
                Date{renderSortArrow(sortConfig, "createdAt")}
              </th>
            </tr>
          </thead>
          <tbody className="bg-neutral-900 divide-y divide-neutral-700">
            {filteredOrders.map((order) => (
              <tr key={order.id} className="hover:bg-neutral-800">
                <td className="px-2 py-2">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(order.id)}
                    onChange={() => handleCheckbox(order.id)}
                  />
                </td>
                <td className="px-4 py-2">{formatOrderId(order.id)}</td>
                <td className="px-4 py-2">{order.user?.email || "-"}</td>
                <td className="px-4 py-2">{statusMap[order.status]}</td>
                <td className="px-4 py-2">{fromCents(order.total_price_cents)} €</td>
                <td className="px-4 py-2">{formatDate(order.createdAt)}</td>
              </tr>
            ))}
            {filteredOrders.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-6 text-gray-400">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderListAdmin;