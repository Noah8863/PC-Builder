const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "pc-builder-a804d.firebaseapp.com", // Replace with your Firebase project URL
});

const db = admin.firestore(); // Initialize Firestore database
