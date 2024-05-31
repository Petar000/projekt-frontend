// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC4WW9BdenoN1UgiRo3uOBLFjPqGOMc0ig",
  authDomain: "learntotrain-4391c.firebaseapp.com",
  projectId: "learntotrain-4391c",
  storageBucket: "learntotrain-4391c.appspot.com",
  messagingSenderId: "692900608716",
  appId: "1:692900608716:web:7223154dd319dea1dca069"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();

export { app, auth };
