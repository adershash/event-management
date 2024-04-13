import { initializeApp } from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import { getAuth } from "firebase/auth";
import "firebase/storage"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBjmqj_tl4Rwsbdys6Xj-qNrCiyk4M6tVo",
    authDomain: "event-ea199.firebaseapp.com",
    projectId: "event-ea199",
    storageBucket: "event-ea199.appspot.com",
    messagingSenderId: "558278230829",
    appId: "1:558278230829:web:ce64e0fce2265e98f949a4",
    measurementId: "G-NSRM0RKLWC"
  };


  const Firebase=initializeApp(firebaseConfig)
  export const auth = getAuth(Firebase);
  export const db=getFirestore(Firebase)