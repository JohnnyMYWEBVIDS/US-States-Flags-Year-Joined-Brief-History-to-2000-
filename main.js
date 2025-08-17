// main.js
import { app } from "./firebase.js";

document.addEventListener("DOMContentLoaded", () => {
  console.log("Page loaded. Firebase initialized:", app);

  // Example button test
  const btn = document.getElementById("myButton");
  if (btn) {
    btn.addEventListener("click", () => {
      alert("Button clicked!");
    });
  }
});