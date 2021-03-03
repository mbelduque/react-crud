import firebase from "firebase/app";
import "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDD3Vl_y3LOWcUStN6EDAAO0bzLzQjvRSA",
  authDomain: "react-crud-8a04a.firebaseapp.com",
  projectId: "react-crud-8a04a",
  storageBucket: "react-crud-8a04a.appspot.com",
  messagingSenderId: "1057916793905",
  appId: "1:1057916793905:web:e414e9ae87d888da2bd110",
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
