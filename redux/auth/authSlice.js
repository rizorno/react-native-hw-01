import { createSlice } from "@reduxjs/toolkit";
import {
  signUpThunk,
  loginThunk,
  logOutThunk,
  getCurrentUserThunk,
} from "./authOperations";

const initialState = {
  token: null,
  user: {
    uid: null,
    name: null,
    email: null,
    avatarURL: null,
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
        state.token = payload.accessToken;
        state.user.uid = payload.uid;
        state.user.name = payload.name;
        state.user.email = payload.email;
        state.error = null;
      })
      .addCase(signUpThunk.rejected, handleRejected)

      //? login

      .addCase(loginThunk.pending, handlePending)
      .addCase(loginThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.token = payload.accessToken;
        state.user.uid = payload.uid;
        state.user.name = payload.name;
        state.user.email = payload.email;
        state.error = null;
      })
      .addCase(loginThunk.rejected, handleRejected)

      //? logout

      .addCase(logOutThunk.pending, handlePending)
      .addCase(logOutThunk.fulfilled, (state) => {
        return initialState;
      })
      .addCase(logOutThunk.rejected, handleRejected)

      //? get Current User

      .addCase(getCurrentUserThunk.pending, handlePending)
      .addCase(getCurrentUserThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user = payload;
        state.error = null;
      })
      .addCase(getCurrentUserThunk.rejected, handleRejected);

    //? update User

    // .addCase(updateUserThunk.pending, handlePending)
    // .addCase(updateUserThunk.fulfilled, (state, { payload }) => {
    //   state.isLoading = false;
    //   state.user = payload.user;
    //   state.error = null;
    // })
    // .addCase(updateUserThunk.rejected, handleRejected);

    //? update Avatar

    //       .addCase(updateAvatarThunk.pending, handlePending)
    //       .addCase(updateAvatarThunk.fulfilled, (state, { payload }) => {
    //         state.isLoading = false;
    //         state.user.avatar = payload;
    //         state.error = null;
    //       })
    //       .addCase(updateAvatarThunk.rejected, handleRejected);
  },
});

export const authReducer = authSlice.reducer;
