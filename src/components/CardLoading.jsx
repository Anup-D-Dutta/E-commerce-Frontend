import React from 'react';

const CardLoading = () => {
  return (
    <div className='grid gap-1 w-52 lg:w-72 rounded cursor-pointer animate-pulse'>

      {/* Image Placeholder */}
      <div className='h-[13rem] w-[10rem] lg:h-[22rem] lg:w-72 rounded overflow-hidden border bg-blue-50'></div>

      {/* Sub Category Placeholder */}
      <div className='px-2 h-4 bg-blue-50 rounded w-24'></div>
      <div className='h-[1px] lg:w-72 w-40 bg-neutral-300'></div>

      {/* Product Name and Wishlist Icon Placeholder */}
      <div className='px-2 lg:w-72 w-40 flex items-center justify-between'>
        <div className='h-4 bg-blue-50 rounded w-32'></div>
        <div className='h-4 bg-blue-50 rounded w-5'></div>
      </div>

      {/* Price Placeholder */}
      <div className='flex items-center px-2 gap-x-2 w-fit'>
        <div className='h-4 bg-blue-50 rounded w-16'></div>
        <div className='h-4 bg-blue-50 rounded w-12'></div>
        <div className='h-4 bg-blue-50 rounded w-10'></div>
      </div>

    </div>
  );
};

export default CardLoading;
