// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore} from 'firebase/firestore';
import { getAuth, GoogleAuthProvider} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyChFlI48UgBC235cWQIHMNGZlNv_sLILWM",
  authDomain: "chat-app-1b2f4.firebaseapp.com",
  projectId: "chat-app-1b2f4",
  storageBucket: "chat-app-1b2f4.firebasestorage.app",
  messagingSenderId: "286838475139",
  appId: "1:286838475139:web:c952ef73c0340f3a1e0eb6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()