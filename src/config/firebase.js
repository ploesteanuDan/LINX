import firebase from "firebase";
import "firebase/firebase-firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBCYWpeTB3Zh3nj96l4RjzH-QUqwnodsyc",
  authDomain: "linx-v3-d7d42.firebaseapp.com",
  databaseURL: "https://linx-v3-d7d42.firebaseio.com",
  projectId: "linx-v3-d7d42",
  storageBucket: "linx-v3-d7d42.appspot.com",
  messagingSenderId: "245128169717",
  appId: "1:245128169717:web:9673df5356b31e30051dbc",
  measurementId: "G-DX5EX7YJPB",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
