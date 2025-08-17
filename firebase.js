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

import { app, analytics } from "./firebase.js";

document.addEventListener("DOMContentLoaded", () => {
  console.log("Page loaded. Firebase initialized:", app);

  // Example: if you had a button
  const btn = document.getElementById("myButton");
  if (btn) {
    btn.addEventListener("click", () => {
      alert("Button clicked!");
    });
  }
});
