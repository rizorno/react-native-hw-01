import { createSlice } from "@reduxjs/toolkit";
import {
  getAllPostsThunk,
  getUserPostsThunk,
  getPostAllCommentsThunk,
  getAllCommentsThunk,
  getAllLikesThunk,
} from "./postOperations";

const initialState = {
  posts: [],
  userPosts: [],
  commentsPost: [],
  commentsTotal: [],
  likesTotal: [],
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
  redusers: {},
  extraReducers: (builder) => {
    builder

      //? get All Posts from DB

      .addCase(getAllPostsThunk.pending, handlePending)
      .addCase(getAllPostsThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.posts = payload;
        state.error = null;
      })
      .addCase(getAllPostsThunk.rejected, handleRejected)

      //? get User Posts from DB

      .addCase(getUserPostsThunk.pending, handlePending)
      .addCase(getUserPostsThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.userPosts = payload;
        state.error = null;
      })
      .addCase(getUserPostsThunk.rejected, handleRejected)

      //? get Comments of Post from DB

      .addCase(getPostAllCommentsThunk.pending, handlePending)
      .addCase(getPostAllCommentsThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.commentsPost = payload;
        state.error = null;
      })
      .addCase(getPostAllCommentsThunk.rejected, handleRejected)

      //? get All Comments from DB

      .addCase(getAllCommentsThunk.pending, handlePending)
      .addCase(getAllCommentsThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.commentsTotal = payload;
        state.error = null;
      })
      .addCase(getAllCommentsThunk.rejected, handleRejected)

      //? get All Likes from DB

      .addCase(getAllLikesThunk.pending, handlePending)
      .addCase(getAllLikesThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.likesTotal = payload;
        state.error = null;
      })
      .addCase(getAllLikesThunk.rejected, handleRejected);
  },
});

export const { setPostsDB } = postSlice.actions;
export const postReducer = postSlice.reducer;
