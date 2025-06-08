import React, { useContext, useEffect, useState } from 'react'
import ProductList from '../components/ProductList'
import { Context } from '../index'
import { fetchProductsByCategory } from '../http/productAPI'
import { observer } from 'mobx-react-lite'

const categories = [
  { label: 'Alle', value: 'all' },
  { label: 'Ausrüstung', value: 'equipment' },
  { label: 'Sets', value: 'set' },
  { label: 'Kleidung', value: 'clothing' },
];

const Shop = observer(() => {
  const {product} = useContext(Context)
  const [selectedCategory, setSelectedCategory] = useState('all');

useEffect(() => {
  const category = selectedCategory !== 'all' ? selectedCategory : null;

  fetchProductsByCategory(category).then(data => {
    product.setProducts(data.rows)
    product.setTotalCount(data.count)
  })
}, [product.page, selectedCategory])

  return (
    <div className="w-full min-h-screen bg-black px-6 py-10 text-white">
      <h1 className="text-3xl font-bold mb-6 text-center">Shop</h1>

      {/* Categories */}
      <div className="flex justify-center gap-4 mb-8">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setSelectedCategory(cat.value)}
            className={`px-4 py-2 border rounded-md transition ${
              selectedCategory === cat.value
                ? 'bg-white text-black font-semibold'
                : 'border-white text-white hover:bg-white hover:text-black'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <ProductList selectedCategory={selectedCategory}/>
      {/* <Pages/> */}
      </div>
  )
})

export default Shop