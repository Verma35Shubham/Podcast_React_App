// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAOGpOTsujZoYzQqgX3fxzgW0jR7c-hRpA",
  authDomain: "podcast-9066f.firebaseapp.com",
  projectId: "podcast-9066f",
  storageBucket: "podcast-9066f.appspot.com",
  messagingSenderId: "778876226940",
  appId: "1:778876226940:web:9c1a4a2d7af9df10cca8f9",
  measurementId: "G-WVSPKREEQH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
export {db, auth, storage};