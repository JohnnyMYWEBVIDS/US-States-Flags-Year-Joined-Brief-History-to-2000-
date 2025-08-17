// firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDwFqiwcgyiZyPArEHCs-DWXSB_umVOTTM",
  authDomain: "stateflags-9e5e5.firebaseapp.com",
  projectId: "stateflags-9e5e5",
  storageBucket: "stateflags-9e5e5.firebasestorage.app",
  messagingSenderId: "301501064460",
  appId: "1:301501064460:web:aa02ba8cc91c75c4f11529",
  measurementId: "G-X9LJ9LY8VH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Export so main.js can use it
export { app, analytics };
