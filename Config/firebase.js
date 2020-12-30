import firebase from 'firebase'
import 'firebase/firestore'

// const  trialFirebaseConfig = {
//   apiKey: "AIzaSyBrQADWe6bIjuBm-HeeP1kqny9ecAeTgXE",
//   authDomain: "trial-92edd.firebaseapp.com",
//   databaseURL: "https://trial-92edd.firebaseio.com",
//   projectId: "trial-92edd",
//   storageBucket: "trial-92edd.appspot.com",
//   messagingSenderId: "85556582280",
//   appId: "1:85556582280:web:96f17bef39d0eaf7fecc3d"
// };

const firebaseConfig = {
  apiKey: "AIzaSyBb5nU2no5WJVlZ9WM6UgGHkKZ2mvo4KB0",
  authDomain: "chords-b2b7b.firebaseapp.com",
  databaseURL: "https://chords-b2b7b.firebaseio.com",
  projectId: "chords-b2b7b",
  storageBucket: "chords-b2b7b.appspot.com",
  messagingSenderId: "822164450952",
  appId: "1:822164450952:web:10b89247d5eeb5ccc2393d",
  measurementId: "G-NJ9H3VBW0V"
};

// firebase.initializeApp(firebaseConfig)
  //  firebase.initializeApp(firebaseConfig)
 !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

export const db = firebase.firestore()

// export default firebase 

