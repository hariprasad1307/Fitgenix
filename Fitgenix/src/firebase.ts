// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCkHZXKxaKyr1GF3E1F2aBxscIjDPsxAwM",
  authDomain: "fitgenix-6358b.firebaseapp.com",
  projectId: "fitgenix-6358b",
  storageBucket: "fitgenix-6358b.firebasestorage.app",
  messagingSenderId: "84506076097",
  appId: "1:84506076097:web:27385b5ce60a1fee58c540"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);