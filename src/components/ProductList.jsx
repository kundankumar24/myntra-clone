import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=16")
      .then(res => res.json())
      .then(data => setProducts(data.products));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 mt-8">
      <h2 className="text-lg font-semibold mb-4">Featured Products</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;