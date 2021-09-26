import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import Constants from "expo-constants";

const firebaseConfig = {
	apiKey: Constants.manifest.extra.apiKey,
	authDomain: Constants.manifest.extra.authDomain,
	projectId: Constants.manifest.extra.projectId,
	storageBucket: Constants.manifest.extra.storageBucket,
	messagingSenderId: Constants.manifest.extra.messagingSenderId,
	appId: Constants.manifest.extra.appId,
};

console.log("Initializing Firebase...");
const Firebase = !firebase.apps.length
	? firebase.initializeApp(firebaseConfig)
	: firebase.app();

const db = firebase.firestore();

const auth = firebase.auth();

export default Firebase;

export { db, auth };
