import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PRODUCT_ROUTE } from "../../utils/consts";
import { Context } from "../..";
import { fromCents } from "../../utils/helpers";
import { ReactComponent as CartIcon } from "../../assets/icons/shopping-cart.svg";

const ProductItem = ({ product }) => {
  const navigate = useNavigate();
  const { cart } = useContext(Context);

  return (
    <div className="rounded-2xl overflow-hidden shadow-md bg-[#1a1a1a] text-white transition hover:shadow-xl">
      {/* Image */}
      <div
        className="bg-white cursor-pointer"
        onClick={() => navigate(PRODUCT_ROUTE + "/" + product.id)}
      >
        <img
          src={process.env.REACT_APP_API_URL + product.image}
          alt={product.title}
          className="w-full h-56 object-contain p-4"
        />
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col gap-3">
        {/* Title + Price */}
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-1">
            <h3
              className="text-base font-semibold cursor-pointer hover:underline"
              onClick={() => navigate(PRODUCT_ROUTE + "/" + product.id)}
            >
              <p className="text-base font-semibold text-white line-clamp-1">
                {product.title}
              </p>
            </h3>
            <span className="text-sm text-gray-400">
              {fromCents(product.price_cents)} €
            </span>
          </div>
          <button
            onClick={() => cart.addProduct(product)}
            className="px-3 py-1 border border-gray-400 rounded hover:bg-white hover:text-black text-sm transition"
          >
            <CartIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
