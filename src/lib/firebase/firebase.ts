// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "reventsv3course.firebaseapp.com",
  projectId: "reventsv3course",
  storageBucket: "reventsv3course.firebasestorage.app",
  messagingSenderId: "887276762455",
  appId: "1:887276762455:web:714fcdccf37163a27cfa12",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
