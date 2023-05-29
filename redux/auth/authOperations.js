import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase/config";

//? register

export const signUpThunk = createAsyncThunk(
  "auth/register",
  async ({ name, userEmail, password }, { rejectWithValue }) => {
    try {
      await createUserWithEmailAndPassword(auth, userEmail, password);

      const user = await auth.currentUser;

      await updateProfile(user, { displayName: name });

      const { accessToken, uid, displayName, email } = await auth.currentUser;

      const userInfo = {
        accessToken,
        uid,
        name: displayName,
        email,
      };
      return userInfo;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//? login

export const loginThunk = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      const userInfo = {
        accessToken: user.accessToken,
        uid: user.uid,
        name: user.displayName,
        email: user.email,
      };
      return userInfo;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//? logout

export const logOutThunk = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//? get currentUser

export const getCurrentUserThunk = createAsyncThunk(
  "auth/getUser",
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;
      if (!token) {
        return rejectWithValue("No token");
      } else {
        await onAuthStateChanged(auth, (user) => {
          if (user) {
            const userUpdateProfile = {
              uid: user.uid,
              name: user.displayName,
              email: user.email,
              avatarURL: user.avatarURL,
            };
            return userUpdateProfile;
          }
        });
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
