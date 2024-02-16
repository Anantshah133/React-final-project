// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDWyW2NRfSI8bWa6eoJSNJTKTW_9E4Rov0",
  authDomain: "job-portal-942de.firebaseapp.com",
  projectId: "job-portal-942de",
  storageBucket: "job-portal-942de.appspot.com",
  messagingSenderId: "728831018194",
  appId: "1:728831018194:web:8d8dc667b0509a4e47190b",
  measurementId: "G-QX2C63RMYS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
export const googleAuthProvider = new GoogleAuthProvider();
export default app;