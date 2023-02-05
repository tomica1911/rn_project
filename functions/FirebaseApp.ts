import * as firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCgLmvLdyDh9zrw75mY4Y8PgqKY1ptGT18",
  authDomain: "react-native-characters-8a00b.firebaseapp.com",
  projectId: "react-native-characters-8a00b",
  storageBucket: "react-native-characters-8a00b.appspot.com",
  messagingSenderId: "196343245986",
  appId: "1:196343245986:web:14b37cfddcd9466ca5bbfb",
  measurementId: "G-J56J0T9TYW",
};

// Initialize Firebase
export const FirebaseApp = firebase.initializeApp(firebaseConfig);
