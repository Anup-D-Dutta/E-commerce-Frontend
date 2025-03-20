import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useGlobalContext } from "../provider/GlobalProvider";
import CardProduct from "../components/CardProduct";

const WishlistPage = () => {
    const wishlist = useSelector((state) => state.wishlistItem.wishlist);
    const { fetchWishListItem, removeWishListItem } = useGlobalContext();

    useEffect(() => {
        fetchWishListItem();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">My Wishlist</h2>

            {wishlist.length === 0 ? (
                <p className="text-gray-500">Your wishlist is empty.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {wishlist.map((item) => {
                        const product = item?.productId || item;
                        return product?.image ? (
                            <CardProduct key={product._id} data={product} />
                        ) : null;
                    })}
                </div>
            )}
        </div>
    );
};

export default WishlistPage;
