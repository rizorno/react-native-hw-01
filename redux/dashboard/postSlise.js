import { createSlice } from "@reduxjs/toolkit";
import { getAllPostsThunk } from "./postOperations";

// const initialState = [];

const initialState = {
  posts: [],
  isLoading: false,
  error: null,
};

const handlePending = (state) => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  redusers: {
    setPostsDB: (_, { payload }) => (state.posts = payload),
  },
  extraReducers: (builder) => {
    builder

      //? get posts from DB

      .addCase(getAllPostsThunk.pending, handlePending)
      .addCase(getAllPostsThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.posts = payload;
        state.error = null;
      })
      .addCase(getAllPostsThunk.rejected, handleRejected);
  },
});

export const { setPostsDB } = postSlice.actions;
export const postReducer = postSlice.reducer;
