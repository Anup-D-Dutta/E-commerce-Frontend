import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../provider/GlobalProvider";
import { useSelector, useDispatch } from "react-redux";
import { FaRegHeart, FaHeart } from "react-icons/fa";

import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";
import SummaryApi from "../common/SummaryApi";
import { handleAddWishlist, handleRemoveWishlist } from "../store/wishlistStore";


const AddWishList = ({ data, size='md' }) => {
    const sizeClass = size === "sm" ? "text-xs p-1" : "text-base p-2";

    const { fetchWishListItem, removeWishListItem } = useGlobalContext();
    const wishlist = useSelector((state) => state.wishlistItem.wishlist);
    const [loading, setLoading] = useState(false);

    // It check if product exists in the wishlist
    const isAvailableWishlist = wishlist.some((item) =>
        item?.productId?._id === data?._id || item?._id === data?._id
    );


    const dispatch = useDispatch();

    const handleToggleWishlist = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        try {
            setLoading(true);

            if (isAvailableWishlist) {
                await removeWishListItem(data?._id); // ✅ API call
                dispatch(handleRemoveWishlist(data?._id)); // Update Redux after API success
                toast.success("Removed from wishlist"); // Show toast after API, before Redux
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
            setLoading(false);
        }
    };

    return (
        // <button onClick={handleToggleWishlist} className={`flex items-center justify-center ${sizeClass}`} disabled={loading}>
        <button onClick={handleToggleWishlist} className='flex items-center justify-center p-1 text-xs lg:p-2 lg:text-base' disabled={loading}>
            {isAvailableWishlist ? (
                    <FaHeart size={26} className="text-red-500 transition-all duration-300" />
            ) : (
                    <FaRegHeart color="black" size={26} className="text-gray-500 transition-all duration-300" />
            )}
        </button>
    );
};

export default AddWishList;
