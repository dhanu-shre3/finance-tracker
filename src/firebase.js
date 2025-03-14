import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyD2Ye6SIAahxns2_rMjgCu_RGYrkTMOvdA",
    authDomain: "finance-tracker-f8d4d.firebaseapp.com",
    projectId: "finance-tracker-f8d4d",
    storageBucket: "finance-tracker-f8d4d.firebasestorage.app",
    messagingSenderId: "798336610717",
    appId: "1:798336610717:web:d3e4c7aaeff164c1913f74",
    measurementId: "G-BWQBBFK0S5"
  };
  
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider };
