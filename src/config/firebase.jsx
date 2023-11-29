// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBL5k76q8gZrLXHIEjaBK8izaCInKZGqWo",
  authDomain: "fir-tutorial-93f13.firebaseapp.com",
  projectId: "fir-tutorial-93f13",
  storageBucket: "fir-tutorial-93f13.appspot.com",
  messagingSenderId: "824529245065",
  appId: "1:824529245065:web:ed134b0bffdb94943b0758",
  measurementId: "G-WG7702NZPW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
