import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore'

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

  export default {
    firebase,
  }