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


// const CardProduct = ({ data }) => {
//   const categoryData = useSelector(state => state.product.allCategory);
//   const subCategoryData = useSelector(state => state.product.allSubCategory);
//   const category = categoryData.find(cat => cat._id === data.category);


//   const url = `/product/${valideURLConvert(data.name)}-${data._id}`
//   const [loading, setLoading] = useState(false)



//   const groupedSubcategories = {};

//   subCategoryData.forEach(sub => {
//     const category = sub.category?.[0];
//     if (category) {
//       if (!groupedSubcategories[category.name]) {
//         groupedSubcategories[category.name] = [];
//       }
//       groupedSubcategories[category.name].push(sub);
//     }
//   })

//   return (
//     <Link to={url} className='border py-2 lg:p-4 grid gap-1 lg:gap-3 min-w-36 lg:min-w-52 rounded cursor-pointer bg-white' >

//       <div className='min-h-20 w-full max-h-24 lg:max-h-32 rounded overflow-hidden'>
//         <img
//           src={data.image[0]}
//           className='w-full h-full object-scale-down lg:scale-100'
//         />
//       </div>
//       <div className='flex items-center gap-1'>
//         {/* -------------------- */}
//         <div className='rounded text-xs w-fit p-[1px] px-2 text-green-600 bg-green-50'>

//           {/* <p className="text-center font-bold text-sm md:text-lg mt-3">{subCategoryData.name}</p> */}

//         </div>

//         <div className='w-full flex justify-end px-2 lg:px-0 '>
//           {
//             Boolean(data.discount) && (
//               <p className='text-black bg-gray-200 px-2 w-fit text-xs rounded-full'>{data.discount}% discount</p>
//             )
//           }
//         </div>
//       </div>
//       <div className='px-2 lg:px-0 font-medium text-ellipsis text-sm lg:text-base line-clamp-2'>
//         {data.name}
//       </div>
//       <div className='w-fit gap-1 px-2 lg:px-0 text-sm lg:text-base'>
//         {data.unit}

//       </div>

//       <div className='px-2 lg:px-0 flex items-center justify-between gap-1 lg:gap-3 text-sm lg:text-base'>
//         <div className='flex items-center gap-1'>
//           <div className='font-semibold'>
//             {DisplayPriceInRupees(pricewithDiscount(data.price, data.discount))}
//           </div>


//         </div>
//         <div className=''>
//           {
//             data.stock == 0 ? (
//               <p className='text-red-500 text-sm text-center'>Out of stock</p>
//             ) : (
//               <AddToCartButton data={data} />
//             )
//           }

//         </div>
//       </div>

//     </Link>
//   )
// }

// export default CardProduct


const CardProduct = ({ data }) => {
  const categoryData = useSelector(state => state.product.allCategory);
  const subCategoryData = useSelector(state => state.product.allSubCategory);


  // Find matching sub-category (since `data.subCategory` is an array)
  const subCategory = subCategoryData.find(sub => data.subCategory.includes(sub._id));


  const url = `/product/${valideURLConvert(data.name)}-${data._id}`;

  return (
    <Link to={url} className=' border-black py-2 lg:p-4 grid gap-1 lg:gap-3 min-w-36 lg:w-72 lg:min-w-52 rounded cursor-pointer bg-gray-100' >

      {/* Product Image */}
      <div className='min-h-20 w-full max-h-24 lg:max-h-32 rounded overflow-hidden  border-black '>
        <img
          src={data.image[0]}
          className='w-full h-full object-scale-down lg:scale-100'
        />
      </div>

      {/* Header (Sub Category Name + Discount) */}
      <div className='flex items-center gap-1 px-2 lg:px-0'>

        {/* Display Discount */}
        <div className='w-full flex justify-end'>
          {Boolean(data.discount) && (
            <p className='text-black bg-gray-200 px-2 w-fit text-xs rounded-full'>
              {data.discount}% discount
            </p>
          )}
        </div>
      </div>

      {/* Display Sub Category Name */}
      {subCategory ? (
        <div className='rounded text-sm w-fit px-2 text-black font-bold'>
          {subCategory.name}
        </div>
      ) : (
        <div className='text-xs text-red-500'></div>
      )}

      {/* Product Name */}
      <div className='px-2 lg:px-0 font-medium text-ellipsis text-sm lg:text-base line-clamp-2'>
        {data.name}
      </div>

      {/* Product Unit */}
      {/* <div className='w-fit gap-1 px-2 lg:px-0 text-sm lg:text-base'>
        {data.unit}
      </div> */}

      {/* Price and Stock */}
      <div className='px-2 lg:px-0 flex items-center justify-between gap-1 lg:gap-3 text-sm lg:text-base'>
        <div className='font-semibold'>
          {DisplayPriceInRupees(pricewithDiscount(data.price, data.discount))}
        </div>
        <div>
          {data.stock === 0 ? (
            <p className='text-red-500 text-sm text-center'>Out of stock</p>
          ) : (
            <AddToCartButton data={data} />
          )}
        </div>
      </div>

    </Link>
  );
};

export default CardProduct;

