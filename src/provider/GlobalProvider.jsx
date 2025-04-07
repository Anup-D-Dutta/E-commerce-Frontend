
import { createContext, useContext, useEffect, useState } from "react";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import { useDispatch, useSelector } from "react-redux";
import { handleAddItemCart } from "../store/cartProduct";
import { handleAddWishlist } from "../store/wishlistStore";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";
import { pricewithDiscount } from "../utils/PriceWithDiscount";
import { handleAddAddress } from "../store/addressSlice";
import { setOrder } from "../store/orderSlice";
import { setWishlist } from "../store/wishlistStore";

export const GlobalContext = createContext(null);
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState(0);
  const [notDiscountTotalPrice, setNotDiscountTotalPrice] = useState(0);
  const [totalQty, setTotalQty] = useState(0);
  const [totalQtywishlist, setTotalQtywishliat] = useState(0);
  const cartItem = useSelector((state) => state.cartItem.cart);
  const user = useSelector((state) => state?.user);
  const wishlist = useSelector((state) => state.wishlistItem.wishlist);

// Wishlist

  const fetchWishListItem = async () => {
    try {
      const response = await Axios({ ...SummaryApi.getWishlistItems });
      const { data: responseData } = response;

      if (responseData.success) {
        const wishlistData = responseData.data.flat();

        dispatch(setWishlist(wishlistData)); // ✅ Store in Redux
        localStorage.setItem("wishlist", JSON.stringify(wishlistData)); // ✅ Store in localStorage
      }
    } catch (error) {
      console.log("Error fetching wishlist:", error);
    }
  };

  const removeWishListItem = async (productId) => {
    try {
      const response = await Axios({
        ...SummaryApi.removeFromWishlist,
        data: { _id: productId },
      });

      const { data: responseData } = response;

      if (responseData.success) {

        // Correctly update Redux state
        const updatedWishlist = wishlist.filter((item) => item?.productId?._id !== productId);
        dispatch(setWishlist(updatedWishlist));

        // 🔥 Ensure UI updates properly
        fetchWishListItem();
      }
    } catch (error) {
      console.log("Error removing wishlist item:", error);
      AxiosToastError(error);
    }
  };


// Cart 

// const addToCartItem = async (productId, size) => {
//   try {
//     if (!productId || !size) {
//       toast.error("Product and size are required");
//       return;
//     }

//     const response = await Axios({
//       ...SummaryApi.addTocart,
//       data: {
//         productId,
//         size,
//       },
//     });

//     const { data: responseData } = response;

//     if (responseData.success) {
//       toast.success(responseData.message);
//       fetchCartItem(); // Refresh the cart
//       return responseData;
//     }
//   } catch (error) {
//     AxiosToastError(error);
//   }
// };


  const fetchCartItem = async () => {
    try {
      const response = await Axios({ ...SummaryApi.getCartItem });
      const { data: responseData } = response;
      if (responseData.success) {
        dispatch(handleAddItemCart(responseData.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateCartItem = async (id, qty) => {
    try {
      const response = await Axios({
        ...SummaryApi.updateCartItemQty,
        data: { _id: id, qty: qty },
      });
      const { data: responseData } = response;
      if (responseData.success) {
        fetchCartItem();
        return responseData;
      }
    } catch (error) {
      AxiosToastError(error);
      return error;
    }
  };

  const deleteCartItem = async (cartId) => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteCartItem,
        data: { _id: cartId },
      });
      const { data: responseData } = response;
      if (responseData.success) {
        toast.success(responseData.message);
        fetchCartItem();
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  useEffect(() => {
    const qtyCart = cartItem.reduce((prev, curr) => prev + curr.quantity, 0);
    setTotalQty(qtyCart);

    const qtyWishlist = (wishlist || []).reduce((prev, curr) => prev + (curr.quantity || 0), 0);
    setTotalQtywishliat(qtyWishlist);
    

    const tPrice = cartItem.reduce(
      (prev, curr) => prev + pricewithDiscount(curr?.productId?.price, curr?.productId?.discount) * curr.quantity,
      0
    );
    setTotalPrice(tPrice);

    const notDiscountPrice = cartItem.reduce(
      (prev, curr) => prev + curr?.productId?.price * curr.quantity,
      0
    );
    setNotDiscountTotalPrice(notDiscountPrice);
  }, [cartItem, wishlist]);

  const handleLogout = () => {
    localStorage.clear();
    dispatch(handleAddItemCart([]));
  };

  const fetchAddress = async () => {
    try {
      const response = await Axios({ ...SummaryApi.getAddress });
      const { data: responseData } = response;
      if (responseData.success) {
        dispatch(handleAddAddress(responseData.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchOrder = async () => {
    try {
      const response = await Axios({ ...SummaryApi.getOrderItems });
      const { data: responseData } = response;
      if (responseData.success) {
        dispatch(setOrder(responseData.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user?._id) {
      fetchWishListItem(); // Fetch wishlist from API when user logs in
    } else {
      const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      dispatch(setWishlist(storedWishlist)); // Load from localStorage if no user
    }
  }, [user, dispatch]);


  useEffect(() => {
    fetchCartItem();
    fetchAddress();
    fetchOrder();

    //  it first load from localStorage
    const storedWishlist = localStorage.getItem("wishlist");
    if (storedWishlist) {
      dispatch(setWishlist(JSON.parse(storedWishlist)));
    }
    // Then, fetch from API
    if (user?._id) {
      fetchWishListItem();
    }
  }, [user]);

  return (
    <GlobalContext.Provider
      value={{
        fetchCartItem,
        updateCartItem,
        deleteCartItem,
        fetchAddress,
        totalPrice,
        totalQty,
        totalQtywishlist,
        notDiscountTotalPrice,
        fetchOrder,
        wishlist,
        fetchWishListItem,
        removeWishListItem,
        // addToCartItem
        // addToWishlist,
        // removeFromWishlist,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;