import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAyABCzTNMvaNL-YFYIoKXIXK6xnRmPgzo",
    authDomain: "dischargesummary-1d522.firebaseapp.com",
    projectId: "dischargesummary-1d522",
    storageBucket: "dischargesummary-1d522.appspot.com",
    messagingSenderId: "545327480737",
    appId: "1:545327480737:web:cc3d39e7ba5549a1a055e0"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
