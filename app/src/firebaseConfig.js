// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCFNro4zI_za4hQA9mjllRlIeKGp_ylbyc",
  authDomain: "react-firebase-90d72.firebaseapp.com",
  databaseURL : "https://react-firebase-90d72-default-rtdb.firebaseio.com/",
  projectId: "react-firebase-90d72",
  storageBucket: "react-firebase-90d72.appspot.com",
  messagingSenderId: "812396111600",
  appId: "1:812396111600:web:e3cbb60621d9d8d7be4435",
  measurementId: "G-CYBTVDXLNP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);