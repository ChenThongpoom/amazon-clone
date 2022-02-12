// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBRSyXxY4ETzh8GMBagiF0Rftry2kLsbyA",
  authDomain: "clone-296f3.firebaseapp.com",
  projectId: "clone-296f3",
  storageBucket: "clone-296f3.appspot.com",
  messagingSenderId: "641734473040",
  appId: "1:641734473040:web:499fd94b2a355d78026855",
  measurementId: "G-83LFB02S9Q",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
