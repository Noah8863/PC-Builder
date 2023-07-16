import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCNZVuK1AB2J9GARY92Tk_fib0lrflnuAQ",
  authDomain: "pc-builder-a804d.firebaseapp.com",
  projectId: "pc-builder-a804d",
  storageBucket: "pc-builder-a804d.appspot.com",
  messagingSenderId: "42029449411",
  appId: "1:42029449411:web:b12adc8178dbe8f4c62276",
  measurementId: "G-1NSZKK58ER"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth }