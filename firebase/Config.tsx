// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAvC__S4iv_iH54FmqdrVONis7lc3OATFQ",
  authDomain: "ae-prueba.firebaseapp.com",
  projectId: "ae-prueba",
  storageBucket: "ae-prueba.firebasestorage.app",
  messagingSenderId: "895892844041",
  appId: "1:895892844041:web:a75287118d85996c4552d8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getFirestore(app);
