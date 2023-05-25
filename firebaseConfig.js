import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBTNtHk97T_IuJE17SGzN1H9SqT5AWfe5M",
  authDomain: "aeasy-7c1d7.firebaseapp.com",
  projectId: "aeasy-7c1d7",
  storageBucket: "aeasy-7c1d7.appspot.com",
  messagingSenderId: "973555021550",
  appId: "1:973555021550:web:1778a7d80b8e3ca355e5ff"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);