import firebase from "firebase/app";
import { GoogleAuthProvider } from "firebase/auth";

const provider = new GoogleAuthProvider();

var firebaseConfig = {
  apiKey: "AIzaSyD89wQSoR1FO2zjpJQ2JklHrdL-33I9w_I",
  authDomain: "subite-70657.firebaseapp.com",
  projectId: "subite-70657",
  storageBucket: "subite-70657.appspot.com",
  messagingSenderId: "463273575771",
  appId: "1:463273575771:web:76185ad8be8ea48b05867e",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
