const { initializeApp } = require("firebase/app");
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyBYrHGHHQeOlpFXwrDkRMiWQwthGZo70IU",
    authDomain: "private-chat-spriderduck.firebaseapp.com",
    projectId: "private-chat-spriderduck",
    storageBucket: "private-chat-spriderduck.appspot.com",
    messagingSenderId: "329876087036",
    appId: "1:329876087036:web:f92495ba77988a352fb779",
    measurementId: "G-R8YQ9ELVR9"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
module.exports = { app, auth, db, firebaseConfig };
