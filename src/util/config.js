import firebase from "firebase/compat/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBtnGwZgjmSat4ETdI2GdzxFmK2GEppN-I",
  authDomain: "chatroom-bfbfd.firebaseapp.com",
  databaseURL: "https://chatroom-bfbfd-default-rtdb.firebaseio.com",
  projectId: "chatroom-bfbfd",
  storageBucket: "chatroom-bfbfd.appspot.com",
  messagingSenderId: "950188122661",
  appId: "1:950188122661:web:d9dbc22d73a1c7569915cc",
  measurementId: "G-H5B84VYH2G"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;