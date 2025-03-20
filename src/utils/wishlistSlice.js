
const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: { items: [], status: "idle", error: null },
  reducers: {
    addWishlistItem: (state, action) => {
      state.items.push(action.payload);
    },
    removeWishlistItem: (state, action) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload; // ✅ Store full product objects
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { addWishlistItem, removeWishlistItem } = wishlistSlice.actions;
export default wishlistSlice.reducer;
