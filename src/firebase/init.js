// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDueQNkpI8icnLHc0f7cMtE1vQpTnMotgI",
  authDomain: "fir-practice-19da9.firebaseapp.com",
  projectId: "fir-practice-19da9",
  storageBucket: "fir-practice-19da9.firebasestorage.app",
  messagingSenderId: "602437227044",
  appId: "1:602437227044:web:4e72be2e8f6609bb723eb1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore();