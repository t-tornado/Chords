import firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBb5nU2no5WJVlZ9WM6UgGHkKZ2mvo4KB0",
  authDomain: "chords-b2b7b.firebaseapp.com",
  databaseURL: "https://chords-b2b7b.firebaseio.com",
  projectId: "chords-b2b7b",
  storageBucket: "chords-b2b7b.appspot.com",
  messagingSenderId: "822164450952",
  appId: "1:822164450952:web:10b89247d5eeb5ccc2393d",
  measurementId: "G-NJ9H3VBW0V",
};

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

export { firebase };
export const db = firebase.firestore();

