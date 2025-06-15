import { useEffect, useState } from "react";
import { fetchOneOrder } from "../../http/orderAPI";
import { formatOrderId, formatDate, fromCents } from "../../utils/helpers";

const OrderDetailsModal = ({ orderId, onClose, email, address }) => {
  const [order, setOrder] = useState(null);
  // Fetch order details when modal opens
  useEffect(() => {
    const loadOrder = async () => {
      try {
        const data = await fetchOneOrder(orderId);
        setOrder(data);
      } catch (error) {
        console.error("Fehler beim Laden der Bestellung", error);
      }
    };
    loadOrder();
  }, [orderId]);
  // If order is not found, return null to avoid rendering
  if (!order) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-neutral-900 p-6 rounded-lg w-full max-w-2xl text-white space-y-4 shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white text-xl hover:text-gray-300"
        >
          ×
        </button>

        <h2 className="text-xl font-semibold">Order Details</h2>

        <p>
          <span className="font-semibold">Order ID:</span>{" "}
          {formatOrderId(order.id)}
        </p>
        <p>
          <span className="font-semibold">Entire ID:</span> {order.id}
        </p>
        <p>
          <span className="font-semibold">Date:</span>{" "}
          {formatDate(order.createdAt)}
        </p>
        <p>
          <span className="font-semibold">Customer:</span> {email}
        </p>
        <p>
          <span className="font-semibold">Status:</span> {order.status}
        </p>

        <div>
          <h3 className="font-semibold mb-1">Shipping Address</h3>
          {address ? (
            <div className="text-sm space-y-1">
              <p>
                {address.firstName} {address.lastName}
              </p>
              <p>{address.addressLine1}</p>
              {address.addressLine2 && <p>{address.addressLine2}</p>}
              <p>
                {address.zip} {address.city}
              </p>
              <p>{address.country}</p>
            </div>
          ) : (
            <p className="text-sm text-gray-400">No address available</p>
          )}
        </div>

        <div>
          <h3 className="font-semibold mb-1">Items</h3>
          {order.items.length > 0 ? (
            <ul className="text-sm space-y-1">
              {order.items.map((item, i) => (
                <li key={i}>
                  {item.product?.title || "Unknown"} × {item.quantity} —{" "}
                  {fromCents(item.price_cents)} €
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-400">No items found</p>
          )}
        </div>
        <p className="font-semibold text-right pt-2">
          Total: {fromCents(order.total_price_cents)} €
        </p>
        <p className="text-sm text-gray-400">
          Payment Method: {order.paymentMethod || "Unknown"}
        </p>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
