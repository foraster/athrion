import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchOneOrder } from "../http/orderAPI";
import { formatDate, formatOrderId, fromCents  } from "../utils/helpers";
import { statusMap } from "../utils/consts";

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const loadOrder = async () => {
      try {
        const data = await fetchOneOrder(id);
        setOrder(data);
      } catch (error) {
        console.error("Fehler beim Laden der Bestellung", error);
      }
    };
    loadOrder();
  }, [id]);

  if (!order) {
    return <div className="text-white p-6">Lade Bestellung...</div>;
  }

  return (
    <div className="bg-black text-white min-h-screen px-6 py-16">
      <div className="max-w-3xl mx-auto space-y-8">
        <button
          onClick={() => navigate("/profile")}
          className="text-sm text-gray-400 hover:underline"
        >
          ← Zurück zum Profil
        </button>

        <h1 className="text-3xl font-bold">Bestellung {formatOrderId(order.id)}</h1>

        <div className="bg-[#1a1a1a] rounded-xl p-6 space-y-2 border border-gray-700">
          <p>
            <span className="text-gray-400">Datum:</span>{" "}
            {formatDate(order.createdAt)}
          </p>
          <p>
            <span className="text-gray-400">Status:</span>{" "}
            {statusMap[order.status] || "Unbekannt"}
          </p>
          <p>
            <span className="text-gray-400">Gesamtsumme:</span>{" "}
            <span className="font-bold">{fromCents(order.total_price_cents)} €</span>
          </p>
        </div>

        <section>
          <h2 className="text-xl font-semibold mb-2">Produkte</h2>
          <div className="space-y-4">
            {order.items?.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center bg-[#1a1a1a] p-4 rounded border border-gray-700 cursor-pointer"
                onClick={() => navigate(`/device/${item.product.id}`)}
              >
                <div>
                  <p className="font-semibold">{item.product.title}</p>
                  <p className="text-sm text-gray-400">
                    Menge: {item.quantity}
                  </p>
                </div>
                <div className="text-sm text-right">
                  <p className="text-white font-bold">{fromCents(item.price_cents)} €</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default OrderDetails;
