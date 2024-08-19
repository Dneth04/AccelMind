// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirebase} from 'firebase/firestore';
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDbEGhcBKU-yQE2YskNOHCMkgMcrHhyzKw",
  authDomain: "flashcard-7c822.firebaseapp.com",
  projectId: "flashcard-7c822",
  storageBucket: "flashcard-7c822.appspot.com",
  messagingSenderId: "401954006880",
  appId: "1:401954006880:web:3a1065e5afa2d2d55ee005",
  measurementId: "G-TT8XBZNDY0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export {db};