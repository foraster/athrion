import React from "react";
import { useNavigate } from "react-router-dom";
import { ADMIN_ROUTE, EDIT_PRODUCT_ROUTE } from "../../utils/consts";
import { fromCents } from "../../utils/helpers";

const ProductRow = ({product, handleCheckbox, selectedIds}) => {
      const navigate = useNavigate();
  return (
    <tr key={product.id}>
      <td className="pl-2 py-2">
        <input
          type="checkbox"
          checked={selectedIds.includes(product.id)}
          onChange={() => handleCheckbox(product.id)}
          className="w-4 h-4"
        />
      </td>
      <td className="px-4 py-3">{product.id}</td>
      <td className="px-4 py-3">
        <img
          src={process.env.REACT_APP_API_URL + product.image}
          alt={product.title}
          className="w-14 h-14 object-cover rounded"
        />
      </td>
      <td className="px-4 py-3">{product.title}</td>
      <td className="px-4 py-3 capitalize">
        {product.category}
        {product.subcategory ? ` / ${product.subcategory}` : ""}
      </td>
      <td className="px-4 py-2">{fromCents(product.price_cents)}</td>
      <td className=" py-3">
        <button
          onClick={() => navigate(ADMIN_ROUTE + "/products/edit/" + product.id)}
          className="px-3 py-1 bg-neutral-700 hover:bg-neutral-600 rounded text-sm"
        >
          Edit
        </button>
      </td>
    </tr>
  );
};

export default ProductRow;
