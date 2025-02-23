import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import AxiosToastError from '../utils/AxiosToastError';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import CardLoading from '../components/CardLoading';
import CardProduct from '../components/CardProduct';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import { useSelector } from 'react-redux';
import { valideURLConvert } from '../utils/valideURLConvert';

const Sunglass = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef();
  const subCategoryData = useSelector(state => state.product.allSubCategory);
  const loadingCardNumber = new Array(6).fill(null);

  // Hardcoded category ID for "Watch" (Replace with actual ID from your backend)
  const watchCategoryId = '67b041d8afb7118a0dedef06'

  const fetchWatchProducts = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getProductByCategory,
        data: { id: watchCategoryId }
      });

      if (response.data.success) {
        setData(response.data.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWatchProducts();
  }, []);

  const handleScrollRight = () => {
    containerRef.current.scrollLeft += 200;
  };

  const handleScrollLeft = () => {
    containerRef.current.scrollLeft -= 200;
  };

  const handleRedirectProductListpage = () => {
    const subcategory = subCategoryData.find(sub =>
      sub.category.some(c => c._id === watchCategoryId)
    );

    if (!subcategory) return '#';
    return `/${valideURLConvert('watch')}-${watchCategoryId}/${valideURLConvert(subcategory.name)}-${subcategory._id}`;
  };

  const redirectURL = handleRedirectProductListpage();

  return (
    <div>
      <div className='container mx-auto p-4 flex items-center justify-between gap-4'>
        {/* <h3 className='font-semibold text-lg md:text-2xl capitalize'>Watch</h3> */}
        {/* <Link to={redirectURL} className='text-green-600 hover:text-green-400'>See All</Link> */}
      </div>
      <div className='relative flex items-center p-1'>
        <div className='container mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-2 gap-4 border-black' ref={containerRef}>
          {loading &&
            loadingCardNumber.map((_, index) => (
              <CardLoading key={'WatchCategoryDisplayLoading' + index} />
            ))
          }

          {data.map((p, index) => (
            <CardProduct
              data={p}
              key={p._id + 'WatchCategoryDisplay' + index}
            />
          ))}
        </div>
        {/* <div className='w-full left-0 right-0 container mx-auto px-2 absolute hidden lg:flex justify-between'>
                    <button onClick={handleScrollLeft} className='z-10 relative bg-white hover:bg-gray-100 shadow-lg text-lg p-2 rounded-full'>
                        <FaAngleLeft />
                    </button>
                    <button onClick={handleScrollRight} className='z-10 relative bg-white hover:bg-gray-100 shadow-lg p-2 text-lg rounded-full'>
                        <FaAngleRight />
                    </button>
                </div> */}
      </div>
    </div>
  );
};

export default Sunglass;
