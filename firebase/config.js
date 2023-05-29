import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAnrNf3Dd3ClOxozz-6KupOOrqCcToIpTo",
  authDomain: "goit-react-native-387422.firebaseapp.com",
  projectId: "goit-react-native-387422",
  storageBucket: "goit-react-native-387422.appspot.com",
  messagingSenderId: "608914637370",
  appId: "1:608914637370:web:393fa990a025e446bb6b03",
  measurementId: "G-492VSTKY3C",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
