import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyD5XUj8nLgxnv2Si_I69gtM1zvdVgnQLqE",
  authDomain: "bbc-clone-e0675.firebaseapp.com",
  projectId: "bbc-clone-e0675",
  storageBucket: "bbc-clone-e0675.firebasestorage.app",
  messagingSenderId: "1016722085698",
  appId: "1:1016722085698:web:1053aa13d5a18a5d771adb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider(app);
export const database = getFirestore(app);