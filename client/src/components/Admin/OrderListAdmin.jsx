import { useEffect, useState, useMemo } from "react";
import { fetchAllOrders, updateOrderStatus } from "../../http/orderAPI";
import {
  formatDate,
  formatOrderId,
  fromCents,
  getUpdatedSortConfig,
  sortArrayByKey,
} from "../../utils/helpers";
import { statusMap } from "../../utils/consts";
import OrderDetailsModal from "../Modals/OrderDetailsModal";
import AdminTable from "../Admin/AdminTable";

const OrderListAdmin = () => {
  const [orders, setOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState({});
  const [selectAll, setSelectAll] = useState(false);
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "createdAt",
    direction: "desc",
  });
  const [error, setError] = useState("");

  // Load orders from API on mount
  useEffect(() => {
    fetchAllOrders()
      .then((data) => setOrders(data))
      .catch((err) => {
        setError("Failed to load orders");
        console.error(err);
      });
  }, []);

  const filteredOrders = useMemo(() => {
    let result = [...orders];

    // Search by order ID, customer email or status
    if (search.trim() !== "") {
      const term = search.toLowerCase().trim();
      result = result.filter(
        (o) =>
          formatOrderId(o.id).toLowerCase().includes(term) ||
          o.user?.email?.toLowerCase().includes(term) ||
          statusMap[o.status]?.toLowerCase().includes(term)
      );
    }
    // Filter by status
    if (statusFilter) {
      result = result.filter((o) => o.status === statusFilter);
    }
    // Apply sorting
    if (sortConfig) {
      result = sortArrayByKey(result, sortConfig.key, sortConfig.direction);
    }
    return result;
  }, [orders, search, statusFilter, sortConfig]);

  const handleSort = (key) => {
    setSortConfig(getUpdatedSortConfig(sortConfig, key));
  };

  // Select or deselect all orders
  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setSelectedIds(selectAll ? [] : filteredOrders.map((o) => o.id));
  };

  // Toggle a single product checkbox
  const handleCheckbox = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  // Change bulk order status
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      if (!window.confirm(`Change order status to ${newStatus}?`)) return;
      await updateOrderStatus(orderId, newStatus);
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
      );
    } catch (err) {
      console.error("Failed to update order status", err);
      alert("Status konnte nicht aktualisiert werden.");
    }
  };

  // Reset selection when filtered orders change
  useEffect(() => {
    setSelectAll(false);
    setSelectedIds([]);
  }, [filteredOrders]);
  
  // Define table columns
  const columns = [
    { label: "ID", key: "id", sortable: true },
    { label: "Customer", key: "customer" },
    { label: "Status", key: "status", sortable: true },
    { label: "Total (€)", key: "total_price_cents", sortable: true },
    { label: "Date", key: "createdAt", sortable: true },
    { label: "Address", key: "address" },
    { label: "Details", key: "actions" },
  ];

  return (
    <div className="p-6 text-white">
      {selectedOrder.id && (
        <OrderDetailsModal
          orderId={selectedOrder.id}
          email={selectedOrder.email}
          address={selectedOrder.shipping_address}
          onClose={() => setSelectedOrder({})}
        />
      )}
      <h2 className="text-xl font-semibold mb-4">Order overview</h2>

      {/* Filters */}
      <div className="flex mb-4 gap-6 flex-wrap">
        <div className="flex items-center gap-2">
          <label className="text-md text-gray-300">Search:</label>
          <input
            className="rounded bg-neutral-800 px-3 border border-neutral-700"
            type="text"
            placeholder="Order ID, Email or Status"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="text-md text-gray-300">Status:</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded bg-neutral-800 px-3 border border-neutral-700"
          >
            <option value="">Alle</option>
            <option value="in_progress">In Bearbeitung</option>
            <option value="in_delivery">In Lieferung</option>
            <option value="delivered">Zugestellt</option>
            <option value="cancelled">Storniert</option>
          </select>
        </div>
      </div>

      {error && <p className="text-red-400 mb-4">{error}</p>}

      {/* Table */}
      <AdminTable
        columns={columns}
        data={filteredOrders}
        sortConfig={sortConfig}
        onSort={handleSort}
        selectAllChecked={selectAll}
        onSelectAllToggle={handleSelectAll}
        renderRow={(order) => (
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
            <td className="px-4 py-2">
              <select
                value={order.status}
                onChange={(e) =>
                  handleStatusChange(order.id, e.target.value)
                }
                className="bg-neutral-800 border border-gray-600 rounded text-sm px-2 py-1"
              >
                <option value="in_progress">In Bearbeitung</option>
                <option value="in_delivery">In Lieferung</option>
                <option value="delivered">Zugestellt</option>
                <option value="cancelled">Storniert</option>
              </select>
            </td>
            <td className="px-4 py-2">{fromCents(order.total_price_cents)} €</td>
            <td className="px-4 py-2">{formatDate(order.createdAt)}</td>
            <td className="px-4 py-2">
              {order.shipping_address
                ? `${order.shipping_address.firstName} ${order.shipping_address.lastName}, ${order.shipping_address.zip} ${order.shipping_address.city}`
                : "-"}
            </td>
            <td className="px-4 py-2">
              <button
                onClick={() =>
                  setSelectedOrder({
                    id: order.id,
                    email: order.user?.email,
                    shipping_address: order.shipping_address,
                  })
                }
                className="px-4 text-gray-400 hover:text-gray-200 text-md border-2 border-solid border-gray-400 rounded-md hover:border-gray-200"
              >
                View
              </button>
            </td>
          </tr>
        )}
        emptyText="No orders found."
      />
    </div>
  );
};

export default OrderListAdmin;