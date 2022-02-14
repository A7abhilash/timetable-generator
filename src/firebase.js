import firebase from "firebase/app";
import "firebase/auth";

const app = firebase.initializeApp({
    apiKey: "AIzaSyB3ZUjt7GunGq7TxdhespmPfHp9U3a1K3Y",
    authDomain: "auth-dev-c5c5d.firebaseapp.com",
    databaseURL: "https://auth-dev-c5c5d.firebaseio.com",
    projectId: "auth-dev-c5c5d",
    storageBucket: "auth-dev-c5c5d.appspot.com",
    messagingSenderId: "258754624547",
    appId: "1:258754624547:web:16d0c1586968f9fe568596"
});

export const auth = app.auth();
export default app;
