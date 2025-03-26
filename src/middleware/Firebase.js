import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDo8NXT12k7dJB-L7e2JZtCjtByoPMqYWE",
  authDomain: "project1-6ce65.firebaseapp.com",
  projectId: "project1-6ce65",
  storageBucket: "project1-6ce65.appspot.com",
  messagingSenderId: "961046924398",
  appId: "1:961046924398:web:055883442393114ec32a7f",
  measurementId: "G-3MT9FB548F"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
