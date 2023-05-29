import { createAsyncThunk } from "@reduxjs/toolkit";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { nanoid } from "nanoid";
import { db, storage } from "../../firebase/config";

//? upload Photo to Storage

export const uploadPhotoToServerThunk = async (uriPicture) => {
  try {
    const response = await fetch(uriPicture);
    const file = await response.blob();

    const metadata = { contentType: "image/jpeg" };

    const postId = nanoid();
    const storageRef = ref(storage, `posts/${postId}`);

    const uploadTask = await uploadBytes(storageRef, file, metadata);

    let postURL = "";
    const downloadTask = await getDownloadURL(storageRef).then((url) => {
      postURL = url;
      return postURL;
    });

    return postURL;
  } catch (error) {
    return error.message;
  }
};

//? upload Post to DB

export const uploadPostToServerThunk = async ({
  pictureCameraURI,
  name,
  place,
  local,
  coords,
}) => {
  try {
    const pictureURL = await uploadPhotoToServerThunk(pictureCameraURI);

    const dataPost = {
      picture: pictureURL,
      title: name,
      localisation: place,
      local: local,
      coords: coords,
    };

    await addDoc(collection(db, "posts"), dataPost);
  } catch (error) {
    return error.message;
  }
};

//? get posts from DB

export const getAllPostsThunk = createAsyncThunk(
  "posts/download",
  async (_, { rejectWithValue }) => {
    try {
      const querySnapshot = await getDocs(collection(db, "posts"));

      let postsArr = [];
      await querySnapshot.forEach((doc) => {
        postsArr.push({
          id: doc.id,
          ...doc.data(),
        });
        return postsArr;
      });

      return postsArr;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
