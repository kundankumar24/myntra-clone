import React from 'react';

const ProductCard = ({ product, onAddToCart }) => {
  const handleAddToCart = () => {
    if (onAddToCart) onAddToCart(product);
  };

  return (
    <div className="group border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all duration-300 bg-white">
      {/* Product Image Container with Pink Background */}
      <div className="overflow-hidden rounded-md mb-3 bg-pink-100 p-2"> {/* Added bg-pink-100 */}
        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-48 w-full object-cover rounded-md group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>

      {/* Rest of your product info remains the same */}
      <div className="flex flex-col h-full">
        <h3 className="font-semibold text-gray-800 text-sm line-clamp-2 min-h-[40px]">
          {product.title}
        </h3>

        <div className="mt-2 flex items-center">
          <p className="text-pink-600 font-bold text-lg">₹{product.price}</p>
          {product.originalPrice && (
            <p className="text-gray-400 text-sm line-through ml-2">
              ₹{product.originalPrice}
            </p>
          )}
        </div>

        {product.rating && (
          <div className="flex items-center mt-1">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <span key={i}>
                  {i < Math.floor(product.rating) ? '★' : '☆'}
                </span>
              ))}
            </div>
            <span className="text-gray-500 text-xs ml-1">
              ({product.ratingCount || 0})
            </span>
          </div>
        )}

        {/* Fixed Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="mt-4 w-full bg-pink-600 hover:bg-pink-700 text-black font-bold py-2 px-4 rounded-md transition-colors duration-200"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;