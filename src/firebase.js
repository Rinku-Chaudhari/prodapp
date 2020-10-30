import firebase from "firebase/app";

import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD7tkGPFWeAsCIW0bio0U84OhA5usyaf3c",
  authDomain: "prodapp-111.firebaseapp.com",
  databaseURL: "https://prodapp-111.firebaseio.com",
  projectId: "prodapp-111",
  storageBucket: "prodapp-111.appspot.com",
  messagingSenderId: "744432630273",
  appId: "1:744432630273:web:418bcd067dd173ec6ede00",
  measurementId: "G-W6QNZTEHLN",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = new firebase.auth.GoogleAuthProvider();

export { db, auth };
