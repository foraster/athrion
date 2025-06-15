import { fromCents } from "../../utils/helpers";

const ProductDetailsModal = ({ product, onClose }) => {
  if (!product) return null;

  const desc = product.description?.de;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="bg-black rounded-lg shadow-lg p-6 w-full max-w-4xl text-white max-h-[90vh] overflow-y-auto relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-red-500 hover:text-white text-xl"
        >
          ✕
        </button>

        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start mb-10">
          <div>
            <img
              src={
                product.image?.startsWith("http") ||
                product.image?.startsWith("blob:")
                  ? product.image
                  : process.env.REACT_APP_API_URL + product.image
              }
              alt={product.title}
              className="max-w-72 max-h-72 object-contain bg-white rounded-xl p-4"
            />
          </div>
          <div className="flex flex-col justify-center gap-6">
            <h1 className="text-3xl font-bold">{product.title}</h1>
            <p className="text-2xl text-gray-300">
              {fromCents(product.price_cents)} €
            </p>
            {product.stock_quantity > 0 ? (
              <p>
                <span className="text-green-600">Verfügbar</span> noch{" "}
                {product.stock_quantity} Stück
              </p>
            ) : (
              <p className="text-red-400">Ausverkauft</p>
            )}
            <div>
              <span className="font-semibold">Status: </span>
              <span
                className={
                  product.isActive ? "text-green-400" : "text-gray-400"
                }
              >
                {product.isActive ? "Active" : "Inactive"}
              </span>
            </div>
          </div>
        </div>

        {/* Motivation block */}
        {desc?.introTitle && (
          <div className="text-center mb-10">
            <h2 className="text-2xl font-semibold mb-2">{desc.introTitle}</h2>
            <p className="text-gray-300">{desc.introText}</p>
          </div>
        )}

        {/* Features */}
        {desc?.features?.length > 0 && (
          <div className="bg-white text-black rounded-xl p-6 mb-10">
            <h3 className="text-xl font-semibold mb-4">Funktionen</h3>
            <ul className="list-disc list-inside space-y-2">
              {desc.features.map((feat, idx) => (
                <li key={idx}>{feat}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Highlights */}
        {desc?.highlights?.length > 0 && (
          <div className="flex flex-wrap gap-4 justify-center mb-10">
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

        {/* Closing text */}
        {desc?.closingText && (
          <div className="text-center text-lg italic text-gray-400">
            {desc.closingText.split("\n").map((line, i) => (
              <p key={i} className="mb-2">
                {line}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailsModal;
