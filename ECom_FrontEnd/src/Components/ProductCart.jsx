import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../Context/Context";

// Renamed from ProductCart to ProductCard to better reflect its purpose
const ProductCard = ({ product }) => {
  const {
    currency,
    removeFromCart,
    addToCart,
    cartItems,
    navigate,
  } = useAppContext();

  // Check if product exists before accessing its properties
  const productId = product?._id;
  const initialCount = productId && cartItems[productId] ? cartItems[productId] : 0;
  const [count, setCount] = useState(initialCount);

  useEffect(() => {
    // Sync local state with context cart items when they change
    if (product && productId) {
      const newCount = cartItems[productId] || 0;
      if (count !== newCount) {
        setCount(newCount);
      }
    }
  }, [cartItems, productId, product]);

  if (!product) return null;

  const isProductInCart = !!cartItems[productId];
  const productCategory = product.category?.toLowerCase() || "unknown";
  const productImage = product.image?.[0] || assets.placeholder_image;
  
  const handleProductClick = () => {
    navigate(`/products/${productCategory}/${productId}`);
    window.scrollTo(0, 0);
  };

  const handleCartAction = (e) => {
    e.stopPropagation();
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    // Just use context's addToCart - it will handle state updates and toast
    addToCart(productId);
  };

  const handleDecrement = (e) => {
    e.stopPropagation();
    // Use removeFromCart directly - it handles state updates and toast
    removeFromCart(productId);
  };

  const handleIncrement = (e) => {
    e.stopPropagation();
    // Use addToCart for increments too - consistent with context approach
    addToCart(productId);
  };

  return (
    <div
      onClick={handleProductClick}
      className="border border-gray-500/20 rounded-md md:px-4 px-3 py-2 bg-white min-w-56 max-w-56 w-full"
    >
      <div className="group cursor-pointer flex items-center justify-center px-2">
        <img
          className="group-hover:scale-105 transition max-w-26 md:max-w-36"
          src={productImage}
          alt={product.name}
          onError={(e) => {
            e.target.src = assets.placeholder_image;
          }}
        />
      </div>
      <div className="text-gray-500/60 text-sm">
        <p>{product.category}</p>
        <p className="text-gray-700 font-medium text-lg truncate w-full">
          {product.name}
        </p>
        <div className="flex items-center gap-0.5">
          {Array(5)
            .fill("")
            .map((_, i) => (
              <img
                key={i}
                className="md:w-3.5 w-3"
                src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                alt="rating star"
              />
            ))}
          <p>(4)</p>
        </div>
        <div className="flex items-end justify-between mt-3">
          <p className="md:text-xl text-base font-medium text-indigo-500">
            {currency}{product.offerPrice}{" "}
            <span className="text-gray-500/60 md:text-sm text-xs line-through">
              {product.price}
            </span>
          </p>
          <div
            onClick={handleCartAction}
            className="text-indigo-500"
          >
            {!isProductInCart ? (
              <button
                className="flex items-center justify-center gap-1 bg-primary border border-primary-300 md:w-20 w-16 h-8 rounded text-indigo-600 font-medium cursor-pointer"
                onClick={handleAddToCart}
              >
                <img src={assets.cart_icon} alt="cart" />
                Add
              </button>
            ) : (
              <div className="flex items-center justify-center gap-2 md:w-20 w-16 h-8 bg-indigo-500/25 rounded select-none">
                <button
                  onClick={handleDecrement}
                  className="cursor-pointer text-md px-2 h-full"
                >
                  -
                </button>
                <span className="w-5 text-center">{count}</span>
                <button
                  onClick={handleIncrement}
                  className="cursor-pointer text-md px-2 h-full"
                >
                  +
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;