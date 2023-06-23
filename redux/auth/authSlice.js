import { createSlice } from "@reduxjs/toolkit";
import {
  signUpThunk,
  loginThunk,
  logOutThunk,
  getUserAvaThunk,
} from "./authOperations";

const initialState = {
  token: null,
  user: {
    uid: null,
    name: null,
    email: null,
    avatar: null,
  },
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

const authSlice = createSlice({
  name: "auth",
  initialState,
  redusers: {},
  extraReducers: (builder) => {
    builder

      //? signUp

      .addCase(signUpThunk.pending, handlePending)
      .addCase(signUpThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.token = payload.token;
        state.user.uid = payload.uid;
        state.user.name = payload.name;
        state.user.email = payload.email;
        state.user.avatar = payload.avatar;
        state.error = null;
      })
      .addCase(signUpThunk.rejected, handleRejected)

      //? login

      .addCase(loginThunk.pending, handlePending)
      .addCase(loginThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.token = payload.token;
        state.user.uid = payload.uid;
        state.user.name = payload.name;
        state.user.email = payload.email;
        state.user.avatar = payload.avatar;
        state.error = null;
      })
      .addCase(loginThunk.rejected, handleRejected)

      //? logout

      .addCase(logOutThunk.pending, handlePending)
      .addCase(logOutThunk.fulfilled, () => {
        return initialState;
      })
      .addCase(logOutThunk.rejected, handleRejected)

      //? avatar

      .addCase(getUserAvaThunk.pending, handlePending)
      .addCase(getUserAvaThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user.avatar = payload.url;
        state.error = null;
      })
      .addCase(getUserAvaThunk.rejected, handleRejected);
  },
});

export const authReducer = authSlice.reducer;
