// import React, { useEffect, useState } from 'react'
// import { useGlobalContext } from '../provider/GlobalProvider'
// import Axios from '../utils/Axios'
// import SummaryApi from '../common/SummaryApi'
// import toast from 'react-hot-toast'
// import AxiosToastError from '../utils/AxiosToastError'
// import Loading from './Loading'
// import { useSelector } from 'react-redux'
// import { FaMinus, FaPlus } from "react-icons/fa6";
// import { FaCartShopping } from "react-icons/fa6";
// import { useNavigate } from 'react-router-dom'



// const AddToCartButton = ({ data }) => {
//     const { fetchCartItem, updateCartItem, deleteCartItem } = useGlobalContext()
//     const [loading, setLoading] = useState(false)
//     const cartItem = useSelector(state => state.cartItem.cart)
//     const [isAvailableCart, setIsAvailableCart] = useState(false)
//     const [qty, setQty] = useState(0)
//     const [cartItemDetails, setCartItemsDetails] = useState()
//     const user = useSelector(state => state.user)
//     const navigate = useNavigate()



//     // const redirectToCheckoutPage = () => {
//     //     if (user?._id) {
//     //         navigate("/checkout")
//     //         if (close) {
//     //             close()
//     //         }
//     //         return
//     //     }
//     //     toast("Please Login")
//     // }

//     const handleADDTocart = async (e) => {
//         e.preventDefault()
//         e.stopPropagation()

//         try {
//             setLoading(true)

//             const response = await Axios({
//                 ...SummaryApi.addTocart,
//                 data: {
//                     productId: data?._id
//                 }
//             })

//             const { data: responseData } = response

//             if (responseData.success) {
//                 toast.success(responseData.message)
//                 if (fetchCartItem) {
//                     fetchCartItem()
//                 }
//             }
//         } catch (error) {
//             AxiosToastError(error)
//         } finally {
//             setLoading(false)
//         }

//     }

//     //checking this item in cart or not
//     // useEffect(() => {
//     //     const checkingitem = cartItem.some(item => item.productId._id === data._id)
//     //     setIsAvailableCart(checkingitem)

//     //     const product = cartItem.find(item => item.productId._id === data._id)
//     //     setQty(product?.quantity)
//     //     setCartItemsDetails(product)
//     // }, [data, cartItem])

//     useEffect(() => {
//         if (!data || !data._id || !Array.isArray(cartItem)) return; // Safety check

//         const checkingitem = cartItem.some(item => item?.productId?._id === data._id);
//         setIsAvailableCart(checkingitem);

//         const product = cartItem.find(item => item?.productId?._id === data._id);
//         setQty(product?.quantity || 0);
//         setCartItemsDetails(product);
//     }, [data, cartItem]);



//     const increaseQty = async (e) => {
//         e.preventDefault()
//         e.stopPropagation()

//         const response = await updateCartItem(cartItemDetails?._id, qty + 1)

//         if (response.success) {
//             toast.success("Item added")
//         }
//     }

//     const decreaseQty = async (e) => {
//         e.preventDefault()
//         e.stopPropagation()
//         if (qty === 1) {
//             deleteCartItem(cartItemDetails?._id)
//         } else {
//             const response = await updateCartItem(cartItemDetails?._id, qty - 1)

//             if (response.success) {
//                 toast.success("Item remove")
//             }
//         }
//     }
//     return (
//         <div className='w-full max-w-[150px]'>
//             {/* <div>
//                 <div className='flex w-full h-full hidden lg:flex'>
//                     <button onClick={decreaseQty} className='text-sm text-black  hover:text-white flex w-6 h-6 lg:border border-black hover:bg-black p-1 rounded-full items-center justify-center'><FaMinus /></button>

//                     <p className='flex-1 w-full font-semibold px-1 flex items-center justify-center'>{qty}</p>

//                     <button onClick={increaseQty} className='text-sm text-black hover:text-white lg:border border-black hover:bg-black w-6 h-6 p-1 rounded-full flex items-center justify-center'><FaPlus /></button>
//                 </div>
//             </div> */}
//             {
//                 isAvailableCart ? (
//                     <div className='flex w-full h-full hidden lg:flex'>
//                         <button onClick={decreaseQty} className='text-sm text-black  hover:text-white flex w-6 h-6 lg:border border-black hover:bg-black p-1 rounded-full items-center justify-center'><FaMinus /></button>

//                         <p className='flex-1 w-full font-semibold px-1 flex items-center justify-center'>{qty}</p>

//                         <button onClick={increaseQty} className='text-sm text-black hover:text-white lg:border border-black hover:bg-black w-6 h-6 p-1 rounded-full flex items-center justify-center'><FaPlus /></button>
//                     </div>
//                 ) : (
//                     <>
//                         {/* Show full 'Add to Cart' button on medium screens and above */}
//                         <button
//                             onClick={handleADDTocart}
//                             className='hidden lg:flex text-white font-bold gap-3 text-lg flex items-center justify-center w-64 h-12 sm:w-[35rem] sm:h-16 bg-black border border-black hover:bg-black hover:opacity-90 transition duration-300 ease-in-out'
//                         >
//                             <FaCartShopping size={25} />
//                             {loading ? <Loading /> : "Add to cart"}
//                         </button>

//                     </>

//                 )
//             }

//         </div>
//     )
// }

// export default AddToCartButton


import React, { useEffect, useState } from 'react';
import { useGlobalContext } from '../provider/GlobalProvider';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';
import Loading from './Loading';
import { useSelector } from 'react-redux';
import { FaMinus, FaPlus, FaCartShopping } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const AddToCartButton = ({ data, selectedSize }) => {
    const { fetchCartItem, updateCartItem, deleteCartItem, addToCartItem } = useGlobalContext();
    const [loading, setLoading] = useState(false);
    const cartItem = useSelector(state => state.cartItem.cart);
    const [cartItemDetails, setCartItemDetails] = useState(null);
    const user = useSelector(state => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (!data?._id || !Array.isArray(cartItem)) return;

        const productInCart = cartItem.find(item => item?.productId?._id === data._id);
        setCartItemDetails(productInCart || null);
    }, [data, cartItem]);


    const handleAddToCart = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (!user?._id) {
            toast.error("Please login to add items to cart");
            return navigate("/login");
        }
        if (!selectedSize) {
            toast.error("Please select a size before adding to cart");
            return;
        }

        if (Array.isArray(data?.size) && data.size.length > 0 && !selectedSize) {
            toast.error("Please select a size before adding to cart");
            return;
        }

        try {
            setLoading(true);

            const response = await Axios({
                ...SummaryApi.addTocart,
                data: {
                    productId: data?._id,
                    size: selectedSize,
                    quantity: 1
                }
            });

            const { data: responseData } = response;

            if (responseData.success) {
                toast.success(responseData.message);
                if (fetchCartItem) {
                    fetchCartItem();
                }
            }
        } catch (error) {
            AxiosToastError(error);
        } finally {
            setLoading(false);
        }
    }


    const increaseQty = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        const response = await updateCartItem(cartItemDetails?._id, (cartItemDetails?.quantity || 1) + 1);
        if (response?.success) {
            toast.success("Quantity increased");
        }
    };

    const decreaseQty = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (cartItemDetails?.quantity === 1) {
            await deleteCartItem(cartItemDetails._id);
            toast.success("Item removed from cart");
        } else {
            const response = await updateCartItem(cartItemDetails?._id, cartItemDetails?.quantity - 1);
            if (response?.success) {
                toast.success("Quantity decreased");
            }
        }
    };

    const qty = cartItemDetails?.quantity || 0;


    return (
        <div className='w-full max-w-[150px]'>
            {
                cartItemDetails ? (
                    <div className='w-full'>
                        {/* Quantity control buttons */}
                        <div className='flex w-full h-full my-3'>
                            <button
                                onClick={decreaseQty}
                                className='text-sm text-black hover:text-white flex w-6 h-6 border border-black hover:bg-black p-1 rounded-full items-center justify-center'
                            >
                                <FaMinus />
                            </button>
                            <p className='flex-1 font-semibold px-1 flex items-center justify-center'>{qty}</p>
                            <button
                                onClick={increaseQty}
                                className='text-sm text-black hover:text-white border border-black hover:bg-black w-6 h-6 p-1 rounded-full flex items-center justify-center'
                            >
                                <FaPlus />
                            </button>
                        </div>

                        {/* Optional: Go to cart button below quantity control */}
                        <Link to="/cart" className='hidden md:flex'>
                            <button className="bg-black w-full mt-2 text-white font-semibold px-8 py-2 rounded-md hover:bg-gray-800">
                                Go to cart
                            </button>
                        </Link>
                    </div>
                ) : (
                    <button
                        onClick={handleAddToCart}
                        className='hidden lg:flex text-white font-bold gap-3 text-lg items-center justify-center w-64 h-12 sm:w-[35rem] sm:h-16 bg-black border border-black hover:opacity-90 transition duration-300 ease-in-out'
                    >
                        <FaCartShopping size={25} />
                        {loading ? <Loading /> : "Add to cart"}
                    </button>
                )
            }
        </div>
    );

};

export default AddToCartButton;
