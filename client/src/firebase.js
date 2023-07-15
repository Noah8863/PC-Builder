import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
    apiKey: 'AIzaSyCc6tHJBYJdCIk6GqwUE0Boa2zFU4wBbXg',
    authDomain: 'pc-builder-dev.firebaseapp.com',
    projectId: 'pc-builder-dev',
    storageBucket: 'pc-builder-dev.appspot.com',
    messagingSenderId: '220933659112',
    appId: '220933659112:web:b8415116fde3167e906c5d'
  };
  
  // Initialize Firebase

const app = firebase.initializeApp(firebaseConfig);

export const auth = app.auth();
export default app;