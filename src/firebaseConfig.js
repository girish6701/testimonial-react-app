// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC5q7oRGBkplCQHbhJVCgXhxvtRrMpiOy8",
  authDomain: "testimonials-app-4afbf.firebaseapp.com",
  projectId: "testimonials-app-4afbf",
  storageBucket: "testimonials-app-4afbf.appspot.com",
  messagingSenderId: "650444515469",
  appId: "1:650444515469:web:90cd2838b9841aeaa61ac4",
  measurementId: "G-WPKQMMXBGP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { db };
