import * as firebase from "firebase";
import "@firebase/auth";
import "@firebase/firestore";

const firebase = {
  apiKey: "AIzaSyCnUvt1N50XWYxCtfDaFq_6wyimuRyGb2E",
  authDomain: "learncharacters-3bfab.firebaseapp.com",
  databaseURL:
    "https://learncharacters-3bfab-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "learncharacters-3bfab",
  storageBucket: "learncharacters-3bfab.appspot.com",
  messagingSenderId: "229569259064",
  appId: "1:229569259064:web:28bcfa320529dc349628cd",
  measurementId: "G-3QQH18BLBM",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebase);
}

export const authFirebase = firebase.auth();
export const dbFirestoreFirebase = firebase.firestore();
export const increment = firebase.firestore.FieldValue.increment(1);
export const decrement = firebase.firestore.FieldValue.increment(-1);
export const addToArray = (arrayEntry) =>
  firebase.firestore.FieldValue.arrayUnion(arrayEntry);
