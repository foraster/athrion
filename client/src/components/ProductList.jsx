import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Context } from '..'
import ProductItem from './ProductItem'

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const ProductList = observer(({selectedCategory}) => {
    const { product } = useContext(Context);
    const products = product.products;
  
    if (selectedCategory === "equipment") {
      const grouped = products.reduce((acc, item) => {
        const key = item.subcategory || "Sonstige";
        if (!acc[key]) acc[key] = [];
        acc[key].push(item);
        return acc;
      }, {});
  
      return (
        <div className="max-w-7xl mx-auto px-4 space-y-12">
        {Object.entries(grouped).map(([subcategory, items]) => (
          <div key={subcategory}>
            {/* <h2 className="text-2xl font-semibold text-white tracking-wide mb-4 border-b border-gray-700 pb-1">
              {capitalize(subcategory)}
            </h2> */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
              {items.map((item) => (
                <ProductItem key={item.id} product={item} />
              ))}
            </div>
          </div>
        ))}
      </div>
      );
    }
  
    // For other categories
    return (
        <div className="max-w-7xl mx-auto px-4 space-y-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
      </div>
    );
  });

export default ProductList