
import { createSlice } from "@reduxjs/toolkit";

const loadWishlistFromStorage = () => {
    const storedWishlist = localStorage.getItem("wishlist");
    return storedWishlist ? JSON.parse(storedWishlist) : [];
};

const initialState = {
    wishlist: loadWishlistFromStorage(),
};

const wishlistSlice = createSlice({
    name: "wishlistItem",
    initialState,
    reducers: {
        handleAddWishlist: (state, action) => {
            const exists = state.wishlist.some(item => item._id === action.payload._id);
            if (!exists) {
                state.wishlist = [...state.wishlist, action.payload]; 
                localStorage.setItem("wishlist", JSON.stringify(state.wishlist));  // ✅ Save to localStorage
            }
        },
        handleRemoveWishlist: (state, action) => {
            state.wishlist = state.wishlist.filter(item => item._id !== action.payload);
            localStorage.setItem("wishlist", JSON.stringify(state.wishlist));  // ✅ Save to localStorage
        },
        setWishlist: (state, action) => {
            state.wishlist = action.payload;
            localStorage.setItem("wishlist", JSON.stringify(state.wishlist));  // ✅ Save to localStorage
        }
    }
});

export const { setWishlist, handleAddWishlist, handleRemoveWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
