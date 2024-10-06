// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-J_BdUEm1qMXzpnKkJMWv45CvYf_r1VI",
  authDomain: "broodl-ac66f.firebaseapp.com",
  projectId: "broodl-ac66f",
  storageBucket: "broodl-ac66f.appspot.com",
  messagingSenderId: "706666512660",
  appId: "1:706666512660:web:c9156b7b3b0f7346274201"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)