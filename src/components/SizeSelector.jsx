// import { useState } from "react";

// export default function SizeSelector({ selectedSize, setSelectedSize }) {
//   const sizes = ["S", "M", "L", "XL"];

//   const handleSizeSelect = (size) => {
//     setSelectedSize(size);
//   };

//   return (
//     <div className="flex flex-col gap-4">
//       <div className="flex items-center gap-2">
//         <span className="text-lg font-semibold">Please select a size.</span>
//         <a href="#" className="text-blue-500 hover:text-blue-700">
//           Size Chart
//         </a>
//       </div>
//       <div className="flex gap-4 my-3">
//         {sizes.map((size) => (
//           <button
//             key={size}
//             className={`px-4 py-2 border-2 rounded-lg ${
//               selectedSize === size ? "border-red-300 bg-gray-200" : "border-black"
//             }`}
//             onClick={() => handleSizeSelect(size)}
//           >
//             {size}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Axios from '../utils/Axios';
import AxiosToastError from '../utils/AxiosToastError';
import SummaryApi from '../common/SummaryApi'; // Make sure this is imported

export default function SizeSelector({ selectedSize, setSelectedSize }) {
  const params = useParams();
  const productId = params?.product?.split("-")?.slice(-1)[0];

  const [data, setData] = useState({ sizes: [] });
  const [loading, setLoading] = useState(true);

  const fetchProductDetails = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getProductDetails,
        data: { productId }
      });

      const { data: responseData } = response;
      if (responseData.success) {
        setData(responseData.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [params]);

  if (loading) return <div>Loading...</div>;
  if (!data?.sizes?.length) return null;

  return (
    <div className="flex flex-col gap-4 my-8">
      <div className="flex items-center gap-2">
        <span className="text-lg font-semibold ">Please select a size.</span>
        <a href="#" className="text-blue-500 hover:text-blue-700">Size Chart</a>
      </div>

      <div className="flex gap-4 flex-wrap">
        {data.sizes.map((item) => (
          <button
            key={item.size}
            className={`px-4 py-2 border-2 rounded-lg ${
              selectedSize === item.size
                ? "border-red-300 bg-gray-200"
                : "border-black"
            }`}
            onClick={() => setSelectedSize(item.size)}
          >
            {item.size}
          </button>
        ))}
      </div>
{/* 
      <div className="my-4">
        <p className="font-semibold">Available Sizes:</p>
        <div className="flex flex-wrap gap-2 mt-2">
          {data.sizes.map((item, index) => (
            <div
              key={index}
              className="px-3 py-1 border border-gray-400 rounded-full text-sm"
            >
              {item.size} (Qty: {item.quantity})
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
}
