import firebase from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD89wQSoR1FO2zjpJQ2JklHrdL-33I9w_I",
  authDomain: "subite-70657.firebaseapp.com",
  projectId: "subite-70657",
  storageBucket: "subite-70657.appspot.com",
  messagingSenderId: "463273575771",
  appId: "1:463273575771:web:2b3701dfa0820a4d05867e",
};

console.log("Initializing Firebase...");
const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = firebase.firestore();

const auth = getAuth();

export { db, auth };
