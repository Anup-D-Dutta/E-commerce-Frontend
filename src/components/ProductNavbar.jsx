import React, { useState, useEffect } from 'react'
import { FaCartShopping } from "react-icons/fa6";
import { useGlobalContext } from '../provider/GlobalProvider'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux'
import AxiosToastError from '../utils/AxiosToastError'
import toast from 'react-hot-toast';
import SummaryApi from '../common/SummaryApi'
import Axios from '../utils/Axios'
import Loading from './Loading'
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { handleAddWishlist, handleRemoveWishlist } from "../store/wishlistStore";



const ProductNavbar = ({ data, selectedSize }) => {

    const { fetchCartItem, updateCartItem, deleteCartItem } = useGlobalContext()
    const [loading, setLoading] = useState(false)
    const cartItem = useSelector(state => state.cartItem.cart)
    const [isAvailableCart, setIsAvailableCart] = useState(false)
    const [qty, setQty] = useState(0)
    const [cartItemDetails, setCartItemsDetails] = useState()
    const user = useSelector(state => state.user);


    const [wishlistLoading, setWishlistLoading] = useState(false);
    const [cartLoading, setCartLoading] = useState(false);


    const { fetchWishListItem, removeWishListItem } = useGlobalContext();
    const wishlist = useSelector((state) => state.wishlistItem.wishlist);


    const isAvailableWishlist = wishlist.some((item) =>
        item?.productId?._id === data?._id || item?._id === data?._id
    );


    const dispatch = useDispatch();

    // const handleToggleWishlist = async (e) => {
    //     e.preventDefault();
    //     e.stopPropagation();

    //     try {
    //         setLoading(true);

    //         if (isAvailableWishlist) {
    //             await removeWishListItem(data?._id); // ✅ API call
    //             dispatch(handleRemoveWishlist(data?._id)); // Update Redux after API success
    //             toast.success("Removed from wishlist"); // Show toast after API, before Redux
    //         } else {
    //             const response = await Axios({
    //                 ...SummaryApi.addToWishlist,
    //                 data: { productId: data?._id },
    //             });

    //             if (response.data.success) {
    //                 dispatch(handleAddWishlist({ _id: data?._id, productId: data }));
    //                 toast.success("Added to wishlist");
    //             }
    //         }
    //     } catch (error) {
    //         AxiosToastError(error);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    const handleToggleWishlist = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        try {
            setWishlistLoading(true); // ✅ Use separate state

            if (isAvailableWishlist) {
                await removeWishListItem(data?._id);
                dispatch(handleRemoveWishlist(data?._id));
                toast.success("Removed from wishlist");
            } else {
                const response = await Axios({
                    ...SummaryApi.addToWishlist,
                    data: { productId: data?._id },
                });

                if (response.data.success) {
                    dispatch(handleAddWishlist({ _id: data?._id, productId: data }));
                    toast.success("Added to wishlist");
                }
            }
        } catch (error) {
            AxiosToastError(error);
        } finally {
            setWishlistLoading(false); // ✅ Set it back to false
        }
    };


    const handleADDTocart = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (!user?._id) {
            toast.error("Please login to add items to cart");
            return navigate("/login");
        }
        if (!selectedSize) {
            toast.error("Please select a size");
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


    useEffect(() => {
        if (!data || !data._id || !Array.isArray(cartItem)) return; // Safety check

        const checkingitem = cartItem.some(item => item?.productId?._id === data._id);
        setIsAvailableCart(checkingitem);

        const product = cartItem.find(item => item?.productId?._id === data._id);
        setQty(product?.quantity || 0);
        setCartItemsDetails(product);
    }, [data, cartItem]);

    return (
        <div className=" flex items-center left-0 justify-between border-t p-2 bg-white fixed bottom-0 w-full lg:hidden">
            {/* <button className="flex items-center gap-2 border px-4 py-2 rounded-md hover:bg-gray-100">
                ❤️ <span className="font-semibold">WISHLIST</span>
            </button> */}

            <div>
                <button onClick={handleToggleWishlist}
                    className=" shadow flex items-center w-full gap-2 border px-7 py-2 rounded-md hover:bg-gray-100"
                    disabled={wishlistLoading}>
                    {isAvailableWishlist ? (
                        <div>
                            <FaHeart size={20} className="text-red-500 transition-all flex duration-300" />

                        </div>
                    ) : (
                        <div>
                            <FaRegHeart color="black" size={20} className="text-gray-500 flex transition-all duration-300" />
                        </div>
                    )}
                    <span className="flex font-semibold">WISHLIST</span>

                </button>
            </div>


            <div>
                {
                    isAvailableCart ? (
                        <Link to="/cart">
                            <button className="bg-black w-full text-white font-semibold px-8 py-2 rounded-md hover:bg-gray-800">
                                Go to cart
                            </button>
                        </Link>

                    ) : (

                        <button
                            onClick={handleADDTocart}
                            className="bg-black flex gap-2 text-white px-8 py-2 rounded-md hover:bg-gray-800"
                            disabled={cartLoading}
                        >
                            {/* ADD TO CART */}
                            <FaCartShopping size={20} />
                            {loading ? <Loading /> : "Add to cart"}
                        </button>

                    )
                }
            </div>
        </div>
    )
}

export default ProductNavbar
