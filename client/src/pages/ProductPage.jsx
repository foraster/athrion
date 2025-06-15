import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchOneProduct } from "../http/productAPI";
import { Context } from "..";
import { fromCents } from "../utils/helpers";
import NotifyModal from "../components/Modals/NotifyModal";

const ProductPage = () => {
  const [product, setProduct] = useState({});
  const [showModal, setShowModal] = useState(false)
  const [message, setMessage] = useState("")
  const [type, setType] = useState("")
  const { cart } = useContext(Context);
  const { id } = useParams();

  useEffect(() => {
    fetchOneProduct(id).then((data) => setProduct(data));
  }, [id]);

  const desc = product.description?.de;

  const handleEmailNotify = () => {
    try {
      setMessage("Email-Alarm wurde erflogreich eingerichtet!")
      setType("success")
      setShowModal(true)
    } catch (e) {
      setMessage("Fehler beim Einrichtung von Email-Alarm: ", e.message)
      setType("error")
      setShowModal(true)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      {showModal && <NotifyModal message={message} setShowModal={setShowModal} type={type}/>}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* Image */}
        <div>
          <img
            src={process.env.REACT_APP_API_URL + product.image}
            alt={product.title}
            className="max-w-72 max-h-72 object-contain bg-white rounded-xl p-4"
          />
        </div>

        {/* Name and price */}
        <div className="flex flex-col justify-center gap-6">
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-2xl text-gray-300">
            {fromCents(product.price_cents)} €
          </p>
          {product.stock_quantity > 0 ? 
            <p>
              <span className="text-green-400">Verfügbar</span> noch{" "}
              {product.stock_quantity} Stück
            </p>
           : 
            <p className="text-red-400">Ausverkauft</p>
          }
          {product.stock_quantity > 0 ?
          <button
            onClick={() => cart.addProduct(product)}
            className="w-fit px-6 py-3 border border-white rounded hover:bg-white hover:text-black transition"
          >
            In den Warenkorb
          </button>
          : <button
            onClick={handleEmailNotify}
            className="w-fit px-6 py-3 border border-white rounded hover:bg-white hover:text-black transition"
          >
            Melden um Ankunft der Ware
          </button>
}
        </div>
      </div>

      {/* Motivation */}
      {desc && (
        <div className="mt-12 max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-semibold mb-2">{desc.introTitle}</h2>
          <p className="text-gray-300">{desc.introText}</p>
        </div>
      )}

      {/* Features */}
      {desc?.features?.length > 0 && (
        <div className="mt-12 max-w-4xl mx-auto bg-white text-black rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-4">Funktionen</h3>
          <ul className="space-y-2 list-disc list-inside">
            {desc.features.map((feat, idx) => (
              <li key={idx}>{feat}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Closing block */}
      {desc?.closingText && (
        <div className="mt-12 max-w-3xl mx-auto text-center text-lg italic text-gray-400">
          {desc.closingText.split("\n").map((line, i) => (
            <p key={i} className="mb-2">
              {line}
            </p>
          ))}
        </div>
      )}

      {/* Highlights */}
      {desc?.highlights?.length > 0 && (
        <div className="mt-12 max-w-4xl mx-auto flex flex-wrap gap-4 justify-center">
          {desc.highlights.map((point, idx) => (
            <div
              key={idx}
              className="border border-white px-4 py-2 rounded text-sm"
            >
              ✅ {point}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductPage;
