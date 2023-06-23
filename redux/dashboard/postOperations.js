import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  collectionGroup,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/config";

//? upload Post to DB

export const uploadPostToServerThunk = createAsyncThunk(
  "posts/uploadPost",
  async (
    { uid, pictureMetaData, pictureCameraURI, name, place, local, coords },
    { rejectWithValue }
  ) => {
    try {
      const dataPost = {
        date: pictureMetaData.creationTime,
        picture: pictureCameraURI,
        title: name,
        localisation: place,
        local,
        coords,
        uid,
      };

      await addDoc(collection(db, "posts"), dataPost);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//? get All Posts from DB

export const getAllPostsThunk = createAsyncThunk(
  "posts/getAllPosts",
  async (_, { rejectWithValue }) => {
    try {
      const querySnapshot = await getDocs(collection(db, "posts"));

      let postsArr = [];
      await querySnapshot.forEach((doc) => {
        postsArr.push({
          id: doc.id,
          ...doc.data(),
        });
        return;
      });

      return postsArr;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//? get User Posts from DB

export const getUserPostsThunk = createAsyncThunk(
  "posts/getUserPosts",
  async (uid, { rejectWithValue }) => {
    try {
      const q = await query(collection(db, "posts"), where("uid", "==", uid));

      const querySnapshot = await getDocs(q);

      let postsArr = [];
      await querySnapshot.forEach((doc) => {
        postsArr.push({
          id: doc.id,
          ...doc.data(),
        });
        return;
      });

      return postsArr;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//? get Comments of Post from DB

export const getPostAllCommentsThunk = createAsyncThunk(
  "posts/getPostComments",
  async (postId, { rejectWithValue }) => {
    try {
      const querySnapshot = await getDocs(
        collection(db, "posts", postId, "comments")
      );

      let commentsArr = [];
      await querySnapshot.forEach((doc) => {
        commentsArr.push({
          id: doc.id,
          ...doc.data(),
        });
        return;
      });

      return commentsArr;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//? get Comments from DB

export const getAllCommentsThunk = createAsyncThunk(
  "posts/getAllComments",
  async (_, { rejectWithValue }) => {
    try {
      const comments = query(collectionGroup(db, "comments"));
      const querySnapshot = await getDocs(comments);
      let commentsArr = [];
      await querySnapshot.forEach((doc) => {
        commentsArr.push(doc.data());
      });
      return commentsArr;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//? get Likes from DB

export const getAllLikesThunk = createAsyncThunk(
  "posts/getAllLikes",
  async (_, { rejectWithValue }) => {
    try {
      const likes = query(collectionGroup(db, "likes"));
      const querySnapshot = await getDocs(likes);
      let likesArr = [];
      await querySnapshot.forEach((doc) => {
        likesArr.push({ id: doc.id, ...doc.data() });
      });
      return likesArr;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
