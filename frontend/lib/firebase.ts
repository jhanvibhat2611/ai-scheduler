import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAXdvWKDcdgzg0MhVG9Gord13d8svLKW_c",
  authDomain: "aquasure-9e94e.firebaseapp.com",
  projectId: "aquasure-9e94e",
  storageBucket: "aquasure-9e94e.firebasestorage.app",
  messagingSenderId: "1078662668232",
  appId: "1:1078662668232:web:17b58d628a79dc627c2afd",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);