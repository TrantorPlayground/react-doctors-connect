import { initializeApp } from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyBPbbd_20HUb2Vj3QIizuVSZZCHVahLcDE",
    authDomain: "docon-e5798.firebaseapp.com",
    projectId: "docon-e5798",
    storageBucket: "docon-e5798.appspot.com",
    messagingSenderId: "1052661194827",
    appId: "1:1052661194827:web:d3270a4952bef39210adce",
    measurementId: "G-YHF2QNL6BJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = app.auth();
export const fs = app.firestore();