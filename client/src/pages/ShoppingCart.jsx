import React, { useContext, useState } from "react";
import { Context } from "..";
import { NavLink } from "react-router-dom";
import { CHECKOUT_ROUTE, SHOP_ROUTE } from "../utils/consts";
import { observer } from "mobx-react-lite";
import { fromCents } from "../utils/helpers";
import QuantityInput from '../components/Common/QuantityInput'

const ShoppingCart = observer(() => {
  const { cart } = useContext(Context);
  const CartItems = cart.products;
  const totalPriceCents = cart.totalPriceCents;
  const [removedIds, setRemovedIds] = useState([]);

  const handleRemoveProduct = (id) => {
    setRemovedIds((prev) => [...prev, id]);
    setTimeout(() => {
      cart.removeProduct(id);
    }, 300);
  };

  return (
    <div className="bg-black text-white min-h-screen py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Warenkorb</h1>

        {/* Products */}
        <div className="space-y-6">
          {CartItems.map((item) => (
            <div
              key={item.id}
              className={`flex items-center bg-[#1a1a1a] rounded-lg p-4 border border-gray-700 transition-all duration-300 ease-in-out overflow-hidden
              ${
                removedIds.includes(item.id)
                  ? "opacity-0 scale-95 h-0 py-0 my-0"
                  : "opacity-100 scale-100"
              }
            `}
            >
              <img
                src={process.env.REACT_APP_API_URL + item.image}
                alt={item.title}
                className="w-20 h-20 object-contain mr-6 rounded-lg hidden md:block"
              />
              <div className="flex-grow">
                <p className="text-lg font-semibold">{item.title}</p>
                <p className="text-gray-400">
                  {fromCents(item.price_cents * item.quantity)} €
                </p>
              </div>

              {/* Counter */}
              <div className="flex items-center gap-3">
                <QuantityInput
                value={item.quantity}
  onChange={(newQty) => cart.setQuantity(item.id, newQty)}
                />
                <div className="flex flex-col items-center gap-1 mr-8">
                  <button
                    onClick={() => cart.increaseProduct(item.id)}
                    className="w-8 h-8 border border-white rounded hover:bg-white hover:text-black transition"
                  >
                    +
                  </button>
                  <button
                    onClick={() => cart.decreaseProduct(item.id)}
                    className="w-8 h-8 border border-white rounded hover:bg-white hover:text-black transition"
                  >
                    −
                  </button>
                </div>
              </div>
              <button
                className="text-red-500 hover:text-red-700 text-md"
                onClick={() => {
                  handleRemoveProduct(item.id);
                }}
              >
                Entfernen
              </button>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="mt-10 flex justify-between items-center border-t border-gray-700 pt-6">
          <p className="text-xl font-semibold">Gesamt:</p>
          <p className="text-xl">{fromCents(totalPriceCents)} €</p>
        </div>

        {/* Checkout or to shop button */}
        <div className="mt-6 flex justify-end">
          {totalPriceCents > 0 ? (
            <NavLink
              to={CHECKOUT_ROUTE}
              className="px-6 py-2 border border-white rounded hover:bg-white hover:text-black transition"
            >
              Zur Kasse
            </NavLink>
          ) : (
            <NavLink
              to={SHOP_ROUTE}
              className="px-6 py-2 border border-white rounded hover:bg-white hover:text-black transition"
            >
              Zum Shop
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
});

export default ShoppingCart;
