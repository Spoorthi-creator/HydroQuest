import firebase from 'firebase';
import { getStorage, ref } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCTsVplbUTjrlDTeVZ2trd8otNRx3RWWPY",
  authDomain: "hydroquest-ed105.firebaseapp.com",
  projectId: "hydroquest-ed105",
  storageBucket: "hydroquest-ed105.appspot.com",
  messagingSenderId: "354174828454",
  appId: "1:354174828454:web:6643d7350d1ef45b9d9967"
};

firebase.initializeApp(firebaseConfig);

export default firebase.firestore();