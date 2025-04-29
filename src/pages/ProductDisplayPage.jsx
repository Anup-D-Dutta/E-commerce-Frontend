import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import SummaryApi from '../common/SummaryApi'
import Axios from '../utils/Axios'
import AxiosToastError from '../utils/AxiosToastError'
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees'
import Divider from '../components/Divider'
import image1 from '../assets/minute_delivery.png'
import image2 from '../assets/Best_Prices_Offers.png'
import image3 from '../assets/Wide_Assortment.png'
import { pricewithDiscount } from '../utils/PriceWithDiscount'
// import AddToCartButton from '../components/AddToCartButton'
import AddToCartButton from '../components/Btn+AddToCart'
import SizeSelector from '../components/SizeSelector'
import { useGlobalContext } from '../provider/GlobalProvider'
import AddWishList from '../components/AddWishList'
import ProductNavbar from '../components/ProductNavbar'
import { FaWhatsapp } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io5";
import { ImFacebook2 } from "react-icons/im";
import { FaTwitter, FaRegCopy } from "react-icons/fa6";
import Accordion from '../components/ProductInformation'
import DeliveryDetails from '../components/DeliveryDetails'
import clsx from 'clsx';
// import { FaRegCopy } from "react-icons/fa6";




const ProductDisplayPage = () => {
  const params = useParams()

  let productId = params?.product?.split("-")?.slice(-1)[0]
  const [selectedSize, setSelectedSize] = useState(null);

  console.log(productId)
  const [data, setData] = useState({
    name: "",
    image: []
  })


  const [image, setImage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [qty, setQty] = useState(0);



  const imageContainer = useRef()

  const fetchProductDetails = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getProductDetails,
        data: {
          productId: productId
        }
      })

      const { data: responseData } = response

      if (responseData.success) {
        setData(responseData.data)
      }
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProductDetails()
  }, [params])

  const handleScrollRight = () => {
    imageContainer.current.scrollLeft += 100
  }
  const handleScrollLeft = () => {
    imageContainer.current.scrollLeft -= 100
  }



  return (
    <section className='container mx-auto grid lg:grid-cols-2 '>
      <div className=''>
        <div className='bg-white lg:min-h-[65vh] lg:max-h-[65vh] rounded min-h-7 max-h-[24rem] h-full w-full border'>
          <img
            src={data.image[image]}
            className='w-full h-full object-cover'
          />
        </div>
        {/* <div className='flex items-center justify-center gap-3 my-2'>
          {
            data.image.map((img, index) => {
              return (
                // <div key={img + index + "point"} className={`bg-gray-300 w-3 h-3 lg:w-2 lg:h-2 rounded-full ${index === image && "bg-black"}`}></div>
                <div
                  key={img + index + "point"}
                  className={clsx(
                    "bg-gray-300 w-3 h-3 lg:w-2 lg:h-2 rounded-full",
                    index === image && "bg-black"
                  )}
                ></div>
              )
            })
          }
        </div> */}
        <div className='flex items-center justify-center gap-3 my-2'>
          {data.image.map((img, index) => (
            <div
              key={img + index + "point"}
              className={clsx(
                "w-2 h-2 lg:w-2 lg:h-2 rounded-full",
                index === Number(image) ? "bg-black" : "bg-gray-300"
              )}
            />
          ))}
        </div>


        <div className='grid relative'>
          <div ref={imageContainer} className='flex gap-4 z-10 relative w-full overflow-x-auto scrollbar-none'>
            {
              data.image.map((img, index) => {
                return (
                  <div className='w-20 h-20 min-h-20 min-w-20 scr cursor-pointer shadow-md' key={img + index}>
                    <img
                      src={img}
                      alt='min-product'
                      onClick={() => setImage(index)}
                      className='w-full h-full object-scale-down'
                    />
                  </div>
                )
              })
            }
          </div>
          <div className='w-full -ml-3 h-full hidden lg:flex justify-between absolute  items-center'>
            <button onClick={handleScrollLeft} className='z-10 bg-white relative p-1 rounded-full shadow-lg'>
              <FaAngleLeft />
            </button>
            <button onClick={handleScrollRight} className='z-10 bg-white relative p-1 rounded-full shadow-lg'>
              <FaAngleRight />
            </button>
          </div>
        </div>
        <div>
        </div>

        <div className='my-4  hidden lg:grid gap-3 '>
          <div>
            <p className='font-semibold'>Description</p>
            <p className='text-base'>{data.description}</p>
          </div>
          <div>
            {/* <p className='font-semibold'>Unit</p>
                    <p className='text-base'>{data.unit}</p> */}
          </div>
          {
            data?.more_details && Object.keys(data?.more_details).map((element, index) => {
              return (
                <div>
                  <p className='font-semibold'>{element}</p>
                  <p className='text-base'>{data?.more_details[element]}</p>
                </div>
              )
            })
          }
        </div>
      </div>


      <div className='p-4 lg:pl-7 text-base lg:text-lg '>
        {/* <p className='bg-green-300 w-fit px-2 rounded-full'>10 Min</p> */}
        <div className="flex gap-2 text-center items-center justify-between">
          <h2 className="text-lg font-semibold lg:text-3xl">{data.name}</h2>
          {/* copy URL */}
          <div className='hidden lg:block'>
            <AddWishList data={data} />
          </div>
          <FaRegCopy className='lg:hidden block' size={20} />
        </div>

        {/* <h2 className='text-lg font-semibold lg:text-3xl'>{data.name}</h2>
        <div className='right'>
          <FaRegHeart />

        </div> */}
        {/* <p className=''>{data.unit}</p>  */}
        <Divider />

        <div>
          {/* <p className=''>Price</p>  */}
          <div className='flex items-center gap-2 lg:gap-1 mt-5'>
            <div className='py-2 w-fit'>
              <p className='font-semibold text-lg lg:text-xl'>{DisplayPriceInRupees(pricewithDiscount(data.price, data.discount))}</p>
            </div>
            {
              data.discount && (

                // <p className='line-through'>{DisplayPriceInRupees(data.price)}</p>
                <div className='flex'>
                  <p className='text-xs lg:text-sm'>MRP:</p>
                  <p className='line-through text-sm lg:text-sm'>{DisplayPriceInRupees(data.price)}</p>

                </div>
              )
            }
            {
              data.discount && (
                <p className="font-bold text-black lg:text-2xl text-sm ">{data.discount}% <span className='text-base text-neutral-500'>off</span></p>
              )
            }

          </div>

        </div>
        {/* <SizeSelector /> */}

        <div className='my-6'>
          <SizeSelector selectedSize={selectedSize} setSelectedSize={setSelectedSize} />

        </div>

        {
          data.stock === 0 ? (
            <p className='text-lg text-red-500 my-2'>Out of Stock</p>
          )
            : (
              // <button className='my-4 px-4 py-1 w-[25rem] h-14 bg-black text-white rounded' data={data} s>Add to cart</button>
              <div className=''>
                {/* <AddToCartButton data={data} /> */}
                <AddToCartButton data={data} selectedSize={selectedSize} />

              </div>
            )
        }


        {/* <h2 className='font-semibold'>Why shop from binkeyit? </h2>
            <div>
                  <div className='flex  items-center gap-4 my-4'>
                      <img
                        src={image1}
                        alt='superfast delivery'
                        className='w-20 h-20'
                      />
                      <div className='text-sm'>
                        <div className='font-semibold'>Superfast Delivery</div>
                        <p>Get your orer delivered to your doorstep at the earliest from dark stores near you.</p>
                      </div>
                  </div>
                  <div className='flex  items-center gap-4 my-4'>
                      <img
                        src={image2}
                        alt='Best prices offers'
                        className='w-20 h-20'
                      />
                      <div className='text-sm'>
                        <div className='font-semibold'>Best Prices & Offers</div>
                        <p>Best price destination with offers directly from the nanufacturers.</p>
                      </div>
                  </div>
                  <div className='flex  items-center gap-4 my-4'>
                      <img
                        src={image3}
                        alt='Wide Assortment'
                        className='w-20 h-20'
                      />
                      <div className='text-sm'>
                        <div className='font-semibold'>Wide Assortment</div>
                        <p>Choose from 5000+ products across food personal care, household & other categories.</p>
                      </div>
                  </div>
            </div> */}

        <div className='my-7 flex text-center items-center gap-7 hidden lg:block'>
          <p className='text-gray-500 h-fit flex'>Share</p>
          <div className='flex gap-3'>
            <FaWhatsapp size={25} className='text-gray-700' />
            <FaTwitter size={25} className='text-gray-700' />
            <ImFacebook2 size={22} className='text-gray-700' />
            <IoLogoInstagram size={25} className='text-gray-700' />
          </div>
        </div>

        {/* Delivery Details */}

        <DeliveryDetails />


        {/****only mobile */}

        {/* <div className='my-4 grid gap-3 '>
          <div>
            <p className='font-semibold'>Description</p>
            <p className='text-base'>{data.description}</p>
          </div>
          {
            data?.more_details && Object.keys(data?.more_details).map((element, index) => {
              return (
                <div>
                  <p className='font-semibold'>{element}</p>
                  <p className='text-base'>{data?.more_details[element]}</p>
                </div>
              )
            })
          }
        </div> */}
        <Accordion data={data} />

        <ProductNavbar data={data} selectedSize={selectedSize} />

      </div>
    </section>
  )
}

export default ProductDisplayPage
