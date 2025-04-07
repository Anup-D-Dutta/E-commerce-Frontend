import React from 'react'
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees'
import { Link } from 'react-router-dom'
import { valideURLConvert } from '../utils/valideURLConvert'
import { pricewithDiscount } from '../utils/PriceWithDiscount'
import SummaryApi from '../common/SummaryApi'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import toast from 'react-hot-toast'
import { useState } from 'react'
import { useGlobalContext } from '../provider/GlobalProvider'
import { useSelector } from 'react-redux';
import AddToCartButton from './AddToCartButton'
import AddWishList from './AddWishList'


const CardProduct = ({ data }) => {
  if (!data) return <p>No product data available</p>; // Handle missing data

  const categoryData = useSelector(state => state.product.allCategory);
  const subCategoryData = useSelector(state => state.product.allSubCategory);

  // Ensure subCategoryData is available before calling find()
  const subCategory = subCategoryData?.find(sub => data.subCategory?.includes(sub._id));

  return (
    // <Link to={`/product/${valideURLConvert(data.name)}-${data._id}`} className=' border-black grid gap-1 lg:gap-3 w-52 lg:w-72 rounded cursor-pointer'>

    //   {/* Product Image */}
    //   <div className='h-40 w-40 shadow-md rounded overflow-hidden  lg:h-64 lg:w-72 border-black'>
    //     {data.image && data.image.length > 0 ? (
    //       // <img src={data.image[0]} alt={data.name} className='w-full h-full object-scale-down lg:scale-100' />
    //       <img src={data.image[0]} alt={data.name} className='w-full h-full  object-contain lg:scale-100' />

    //     ) : (
    //       <p className="text-red-500 text-xs text-center">No image available</p>
    //     )}
    //   </div>

    //   {/* Display Sub Category Name */}
    //   {subCategory ? (
    //     <div className='rounded text-sm w-fit px-2 text-black font-bold'>{subCategory.name}</div>
    //   ) : (
    //     <p className="text-xs text-red-500">No category</p>
    //   )}

    //   {/* Product Name */}
    //   <div className='px-2 font-medium text-ellipsis text-sm lg:text-base line-clamp-2'>
    //     {data.name || "No name available"}
    //   </div>

    //   {/* Product Price */}
    //   <div className='px-2 flex items-center justify-between gap-1 lg:gap-3 text-sm lg:text-base'>
    //     <div className='font-semibold'>
    //       {data.price ? `₹${data.price}` : <span className="text-red-500">No price available</span>}
    //     </div>
    //     {/* <div>
    //       {data.stock === 0 ? (
    //         <p className='text-red-500 text-sm text-center'>Out of stock</p>
    //       ) : (
    //         <AddToCartButton data={data} />
    //       )}
    //     </div> */}
    //   </div>
    // </Link>
    <Link
      to={`/product/${valideURLConvert(data.name)}-${data._id}`}
      className='grid gap-1 w-52 lg:w-72 rounded cursor-pointer'
    >
      {/* Product Image */}
      <div className=' h-40 w-40 lg:h-64 lg:w-72 shadow-md rounded overflow-hidden border'>
        {data.image?.length > 0 ? (
          <img src={data.image[0]} alt={data.name} className='w-full h-full object-contain' />
        ) : (
          <p className="text-red-500 text-xs text-center">No image available</p>
        )}
      </div>

      {/* Sub Category Name */}
      {subCategory ? (
        <>
          <div className='text-xs px-2 text-black font-bold'>{subCategory.name}</div>
          <div className='h-[1px] lg:w-72 w-40 bg-neutral-300 my-1'></div> {/* horizontal line */}
        </>
      ) : (
        <p className="text-xs text-red-500 px-2">No category</p>
      )}

      {/* Product Name */}
      {/* <div className='px-2 lg:w-72 w-40 font-medium text-sm line-clamp-2'>{data.name || "No name available"}</div>
      <AddWishList data={data} /> */}
      {/* Product Name + Wishlist in same row */}
      <div className='px-2 lg:w-72 w-40 flex items-start justify-between gap-2'>
        <div className='font-medium text-sm line-clamp-2 flex-1'>{data.name || "No name available"}</div>
        <div className='shrink-0'>
          <AddWishList data={data} />
        </div>
      </div>


      {/* Product Price + AddToCartButton (optional) */}
      <div className='px-2 flex items-center justify-between text-sm'>
        <div className='font-semibold'>
          {data.price ? `₹${data.price}` : <span className="text-red-500">No price</span>}
        </div>
        {/* Optionally enable this again */}
        {/* {data.stock !== 0 && <AddToCartButton data={data} />} */}
      </div>
    </Link>

  );
};

export default CardProduct;
