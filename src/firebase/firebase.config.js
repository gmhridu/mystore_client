import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.meta.env.VITE_APIKEY,
  authDomain: process.meta.env.VITE_AUTHDOMAIN,
  projectId: process.meta.env.VITE_PROJECTID,
  storageBucket: process.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: process.meta.env.VITE_MESSAGING_SENDERID,
  appId: process.meta.env.VITE_APPID,
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;
