// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCMWSb3rOBdLvzMpKEnGn8V1xZO7zJz7mI",
  authDomain: "up-on-65165.firebaseapp.com",
  projectId: "up-on-65165",
  storageBucket: "up-on-65165.appspot.com",
  messagingSenderId: "248008138750",
  appId: "1:248008138750:web:8bf348d6f59d1045d6aaaf",
  measurementId: "G-BGK8XHNEJ4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);