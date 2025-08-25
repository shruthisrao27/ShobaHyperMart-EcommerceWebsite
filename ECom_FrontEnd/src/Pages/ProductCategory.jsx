import React from 'react';
import { useParams } from 'react-router-dom';
import { useAppContext } from '../Context/Context';
import { categories } from '../assets/assets';
import ProductCard from '../Components/ProductCart'; // ✅ Make sure the path is correct

const ProductCategory = () => {
  const { products } = useAppContext();
  const { category } = useParams();

  // ✅ Normalize category comparison to avoid case sensitivity issues
  const normalizedCategory = category?.toLowerCase();

  // ✅ Find category details from assets
  const searchCategory = categories.find(
    (item) => item.path.toLowerCase() === normalizedCategory
  );

  // ✅ Filter products matching the category
  const filteredProducts = products?.filter(
    (product) => product.category.toLowerCase() === normalizedCategory
  ) || [];

  return (
    <div className='mt-16'>
      {searchCategory && (
        <div className='flex flex-col items-center mx-auto'>
          <p className='text-2xl font-medium'>
            {searchCategory.text.toUpperCase()}
          </p>
          <div className='w-16 h-0.5 bg-primary rounded-full'></div>
        </div>
      )}

      {/* ✅ Conditionally render filtered products */}
      {filteredProducts.length > 0 ? (
        <div className='flex flex-col items-center sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-6'>
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className='flex items-center justify-center h-[60vh]'>
          <p className='text-2xl font-medium text-primary'>
            No products found in this category.
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductCategory;
