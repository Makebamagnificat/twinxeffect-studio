// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCUCHbMqdlcQlMrVcC6qmlLzq91vz2ELlk",
  authDomain: "twinxeffect-studio.firebaseapp.com",
  projectId: "twinxeffect-studio",
  storageBucket: "twinxeffect-studio.firebasestorage.app",
  messagingSenderId: "609616608652",
  appId: "1:609616608652:web:1ea4892b4442d634192aa9",
  measurementId: "G-H1FXF5K80J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);