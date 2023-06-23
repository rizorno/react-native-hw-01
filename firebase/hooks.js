import * as ImagePicker from "expo-image-picker";
import { nanoid } from "nanoid";
import { Platform } from "react-native";
import { updateProfile } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  increment,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage";
import { auth, db, storage } from "./config";

//? image Picker (for to take photo on phone)

export const uploadAva = async () => {
  if (Platform.OS !== "web") {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
    } else {
      let { assets } = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      return assets;
    }
  }
};

//? upload Photo of Post to Storage

export const uploadPhotoToServer = async (uri) => {
  const response = await fetch(uri);
  const file = await response.blob();

  const metadata = { contentType: "image/jpeg" };

  const postId = nanoid();
  const storageRef = ref(storage, `posts/${postId}`);

  await uploadBytes(storageRef, file, metadata);

  await getDownloadURL(storageRef);
};

//? upload Avatar to Storage

export const uploadAvaToServer = async (uri) => {
  const response = await fetch(uri);
  const file = await response.blob();

  const metadata = { contentType: "image/jpeg" };

  const avaId = nanoid();
  const storageRef = ref(storage, `avatars/${avaId}`);

  await uploadBytes(storageRef, file, metadata);

  const url = await getDownloadURL(storageRef);
  return { url, avaId };
};

//? upload Avatar to DB

export const uploadAvaToServerThunk = async ({ uid, avaId, url }) => {
  try {
    await setDoc(doc(db, "avatars", uid), { avaId, url });

    const user = await auth.currentUser;

    updateProfile(user, {
      photoURL: url,
    });
  } catch (error) {
    console.log(error.message);
  }
};

//? clean (update) Avatar in DB

export const cleanAvaToServer = async (uid) => {
  try {
    await updateDoc(doc(db, "avatars", uid), {
      avaId: null,
      url: null,
    });
    const user = await auth.currentUser;

    updateProfile(user, {
      photoURL: null,
    });
  } catch (error) {
    console.log(error.message);
  }
};

//? delete Avatar in Storage

export const deleteAvaInStorage = async (uid) => {
  try {
    const docRef = doc(db, "avatars", uid);
    const docSnap = await getDoc(docRef);
    const { avaId } = docSnap.data();

    const storage = getStorage();
    const avaRef = ref(storage, `avatars/${avaId}`);
    deleteObject(avaRef);
  } catch (error) {
    console.log(error.message);
  }
};

//? upload Comment to DB

export const uploadCommentToServer = async ({
  postId,
  uid,
  name,
  avatar,
  comment,
}) => {
  const dataComment = {
    date: new Date().getTime(),
    postId,
    user_id: uid,
    user_name: name,
    user_ava: avatar,
    user_text: comment,
  };

  try {
    await addDoc(collection(db, "posts", postId, "comments"), dataComment);
  } catch (error) {
    console.log(error.message);
  }
};

//? upload Like to DB

export const uploadLikeToServer = async ({ id, uid, name }) => {
  const dataLike = {
    date: new Date().getTime(),
    postId: id,
    user_id: uid,
    user_name: name,
    likes: 1,
  };

  try {
    await addDoc(collection(db, "posts", id, "likes"), dataLike);
  } catch (error) {
    console.log(error.message);
  }
};

//? increment (plus) Like in DB

export const incrementLikeToServer = async ({ id, likeMy }) => {
  try {
    await updateDoc(doc(db, "posts", id, "likes", likeMy), {
      likes: increment(1),
    });
  } catch (error) {
    console.log(error.message);
  }
};

//? decrement (minus) Like in DB

export const decrementLikeToServer = async ({ id, likeMy }) => {
  try {
    await updateDoc(doc(db, "posts", id, "likes", likeMy), {
      likes: increment(-1),
    });
  } catch (error) {
    console.log(error.message);
  }
};
