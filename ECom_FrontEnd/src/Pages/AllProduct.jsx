import React, { useEffect, useState } from 'react';
import { useAppContext } from '../Context/Context';
import ProductCart from '../Components/ProductCart';

const AllProduct = () => {
  const { products = [], searchQuery = '' } = useAppContext();
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (searchQuery.length > 0) {
      setFilteredProducts(
        products.filter(product =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredProducts(products);
    }
  }, [products, searchQuery]);

  return (
    <div className="mt-16 flex flex-col">
      {/* Title Section */}
      <div className="flex flex-col items-end w-max">
        <p className="text-2xl font-medium uppercase">All Products</p>
        <div className="w-16 h-0.5 bg-primary rounded-full"></div>
      </div>

      {/* Product List */}
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        {filteredProducts.length === 0 ? (
          <p>No products found.</p>
        ) : (
          filteredProducts
            .filter(product => product.inStock)
            .map(product => <ProductCart key={product.id} product={product} />)
        )}
      </div>
    </div>
  );
};

export default AllProduct;
