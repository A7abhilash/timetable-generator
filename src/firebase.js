import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import firebaseConfig from "./firebaseConfig";

const app = firebase.initializeApp(firebaseConfig);

const firestore = app.firestore();
export const database = {
  folders: () => firestore.collection("tt-gen-folders"),
  // files: (userId) => firestore.collection("gd").doc(userId).collection("files"),
  formatDocument: (doc) => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt.seconds * 1000,
  }),
  getCurrentTimestamp: firebase.firestore.FieldValue.serverTimestamp,
};

export const auth = app.auth();
export default app;
