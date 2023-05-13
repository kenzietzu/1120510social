import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCb0vYglLsi_5szTZpU6yrnyOFugMZ5EZQ",
  authDomain: "social-media-cdf9b.firebaseapp.com",
  projectId: "social-media-cdf9b",
  storageBucket: "social-media-cdf9b.appspot.com",
  messagingSenderId: "900665503961",
  appId: "1:900665503961:web:12868b5091b6fefa1e4ec8",
  measurementId: "G-R24NTKQJ2E"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);