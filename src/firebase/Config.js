import { initializeApp } from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import { getAuth } from "firebase/auth";
import "firebase/storage"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDJR13QHaSXXe3r29CKFZRl_4Hku9JMA0E",
  authDomain: "event-63d41.firebaseapp.com",
  projectId: "event-63d41",
  storageBucket: "event-63d41.appspot.com",
  messagingSenderId: "601338113336",
  appId: "1:601338113336:web:a10a85cf8c80e9543765cd",
  measurementId: "G-BDFZPHWG9E"
};


  const Firebase=initializeApp(firebaseConfig)
  export const auth = getAuth(Firebase);
  export const db=getFirestore(Firebase)