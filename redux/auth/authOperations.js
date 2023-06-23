import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/config";
import {
  uploadAvaToServer,
  uploadAvaToServerThunk,
} from "../../firebase/hooks";

//? register

export const signUpThunk = createAsyncThunk(
  "auth/register",
  async ({ name, userEmail, password, avatar }, { rejectWithValue }) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        userEmail,
        password
      );

      if (avatar !== null) {
        const uid = user.uid;
        const { url, avaId } = await uploadAvaToServer(avatar);
        await uploadAvaToServerThunk({ uid, url, avaId });

        const dataAva = await auth.currentUser;

        updateProfile(dataAva, {
          photoURL: url,
        });
      }

      const dataName = await auth.currentUser;

      await updateProfile(dataName, {
        displayName: name,
      });

      const data = await auth.currentUser;

      const userData = {
        token: data.accessToken,
        uid: data.uid,
        name: data.displayName,
        email: data.email,
        avatar: data.photoURL,
      };

      return userData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//? login

export const loginThunk = createAsyncThunk(
  "auth/login",
  async ({ email, password, avatar }, { rejectWithValue }) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);

      if (avatar !== null) {
        const uid = user.uid;
        const { url, avaId } = await uploadAvaToServer(avatar);
        await uploadAvaToServerThunk({ uid, url, avaId });

        const dataAva = await auth.currentUser;

        updateProfile(dataAva, {
          photoURL: url,
        });
      }

      const data = await auth.currentUser;

      const userData = {
        token: data.accessToken,
        uid: data.uid,
        name: data.displayName,
        email: data.email,
        avatar: data.photoURL,
      };

      return userData;
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

//? get User Avatar from DB

export const getUserAvaThunk = createAsyncThunk(
  "auth/getAvatar",
  async (uid, { rejectWithValue }) => {
    try {
      const docRef = doc(db, "avatars", uid);
      const docSnap = await getDoc(docRef);
      const result = docSnap.data();

      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
