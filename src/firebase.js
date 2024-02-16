import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCqbSbTU0_L5goiO9wSII5zvh-gSytVsQk",
  authDomain: "real-estate-ecom-313e1.firebaseapp.com",
  databaseURL: "https://real-estate-ecom-313e1-default-rtdb.firebaseio.com",
  projectId: "real-estate-ecom-313e1",
  storageBucket: "real-estate-ecom-313e1.appspot.com",
  messagingSenderId: "801289916241",
  appId: "1:801289916241:web:ef8a58a018ddb059b60d70"
};

export const auth = getAuth();
export const googleAuthProvider = new GoogleAuthProvider();
const app = initializeApp(firebaseConfig);
export default app;