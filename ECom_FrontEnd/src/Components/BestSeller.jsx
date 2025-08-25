// BestSeller.jsx
import React from 'react';
import ProductCart from './ProductCart';
import { useAppContext } from '../Context/Context';

const BestSeller = () => {
  const { products } = useAppContext();

  
  return (
    <div className='mt-16'>
      <p className='text-2xl md:text-3xl font-medium'>Best Seller</p>
      <div className='flex flex-col items-center sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-6'>
        {products.filter((product) => product.inStock)
          .slice(0, 5)
          .map((product, index) => (
            <ProductCart key={index} product={product} />
          ))}
      </div>
    </div>
  );
};

export default BestSeller;