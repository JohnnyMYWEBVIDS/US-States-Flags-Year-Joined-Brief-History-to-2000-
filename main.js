// main.js
import { app } from "./firebase.js";
import { getFirestore, doc, setDoc } from "firebase/firestore"; 

const STATES_BASE = [
  {name:"Delaware", abbr:"DE", year:1787, flag:"delaware.jpg"},
  {name:"Pennsylvania", abbr:"PA", year:1787, flag:"IMG_4160.png"},
  {name:"New Jersey", abbr:"NJ", year:1787, flag:"IMG_4152.png"},
  {name:"Georgia", abbr:"GA", year:1788, flag:"IMG_4132.png"},
  {name:"Connecticut", abbr:"CT", year:1788, flag:"TRANSTULIT.png"},
  {name:"Massachusetts", abbr:"MA", year:1788, flag:"IMG_4143.png"},
  {name:"Maryland", abbr:"MD", year:1788, flag:"IMG_4142.png"},
  {name:"South Carolina", abbr:"SC", year:1788, flag:"IMG_4162.png"},
  {name:"New Hampshire", abbr:"NH", year:1788, flag:"IMG_4151.png"},
  {name:"Virginia", abbr:"VA", year:1788, flag:"IMG_4168.png"},
  {name:"New York", abbr:"NY", year:1788, flag:"IMG_4154.png"},
  {name:"North Carolina", abbr:"NC", year:1789, flag:"MAY 20th 1775.png"},
  {name:"Rhode Island", abbr:"RI", year:1790, flag:"IMG_4161.png"},
  {name:"Vermont", abbr:"VT", year:1791, flag:"IMG_4167.png"},
  {name:"Kentucky", abbr:"KY", year:1792, flag:"SHITED WE STAND.png"},
  {name:"Tennessee", abbr:"TN", year:1796, flag:"IMG_4164.png"},
  {name:"Ohio", abbr:"OH", year:1803, flag:"IMG_4157.png"},
  {name:"Louisiana", abbr:"LA", year:1812, flag:"IMG_4140.png"},
  {name:"Indiana", abbr:"IN", year:1816, flag:"IMG_4136.png"},
  {name:"Mississippi", abbr:"MS", year:1817, flag:"IMG_4146.png"},
  {name:"Illinois", abbr:"IL", year:1818, flag:"ILLINOIS.png"},
  {name:"Alabama", abbr:"AL", year:1819, flag:"IMG_4123.png"},
  {name:"Maine", abbr:"ME", year:1820, flag:"IMG_4141.png"},
  {name:"Missouri", abbr:"MO", year:1821, flag:"IMG_4147.png"},
  {name:"Arkansas", abbr:"AR", year:1836, flag:"arkansas.jpg"},
  {name:"Michigan", abbr:"MI", year:1837, flag:"TUEBOR.png"},
  {name:"Florida", abbr:"FL", year:1845, flag:"IMG_4131.png"},
  {name:"Texas", abbr:"TX", year:1845, flag:"IMG_4165.png"},
  {name:"Iowa", abbr:"IA", year:1846, flag:"RIGHTS,.png"},
  {name:"Wisconsin", abbr:"WI", year:1848, flag:"WISCONSIN.png"},
  {name:"California", abbr:"CA", year:1850, flag:"california.jpg"},
  {name:"Minnesota", abbr:"MN", year:1858, flag:"IMG_4145.png"},
  {name:"Oregon", abbr:"OR", year:1859, flag:"STATE OF OREGON.png"},
  {name:"Kansas", abbr:"KS", year:1861, flag:"IMG_4138.png"},
  {name:"West Virginia", abbr:"WV", year:1863, flag:"IMG_4170.png"},
  {name:"Nevada", abbr:"NV", year:1864, flag:"IMG_4150.png"},
  {name:"Nebraska", abbr:"NE", year:1867, flag:"THE STATE.png"},
  {name:"Colorado", abbr:"CO", year:1876, flag:"IMG_4128.png"},
  {name:"North Dakota", abbr:"ND", year:1889, flag:"NORTH DAKOTA.png"},
  {name:"South Dakota", abbr:"SD", year:1889, flag:"IMG_4163.png"},
  {name:"Montana", abbr:"MT", year:1889, flag:"MONTANA.png"},
  {name:"Washington", abbr:"WA", year:1889, flag:"THE STATE.png"},
  {name:"Idaho", abbr:"ID", year:1890, flag:"GREAT BEAT.png"},
  {name:"Wyoming", abbr:"WY", year:1890, flag:"IMG_4172.png"},
  {name:"Utah", abbr:"UT", year:1896, flag:"IMG_4166.png"},
  {name:"Oklahoma", abbr:"OK", year:1907, flag:"OKLAHOMA.png"},
  {name:"New Mexico", abbr:"NM", year:1912, flag:"IMG_4153.png"},
  {name:"Arizona", abbr:"AZ", year:1912, flag:"IMG_4125.png"},
  {name:"Alaska", abbr:"AK", year:1959, flag:"IMG_4124.png"},
  {name:"Hawaii", abbr:"HI", year:1959, flag:"IMG_4133.png"},
  ];
let STATES = [];

document.addEventListener("DOMContentLoaded", () => {
  console.log("Page loaded. Firebase initialized:", app);

  const db = getFirestore(app);

  // Merge base + custom states
  refreshStates();
  renderTiles();

  // Add State button
  const addBtn = document.getElementById("myButton");
  if (addBtn) {
    addBtn.addEventListener("click", async () => {
      const name = document.getElementById("a-name").value.trim();
      const abbr = document.getElementById("a-abbr").value.trim().toUpperCase();
      const year = parseInt(document.getElementById("a-year").value, 10);
      const flag = document.getElementById("a-flag").value.trim();
      const history = document.getElementById("a-history").value.trim();

      if (!name || !/^[A-Z]{2}$/.test(abbr) || !year) {
        alert("Enter a name, 2-letter abbreviation, and year.");
        return;
      }

      const newState = { name, abbr, year, flag, history };
      const idx = STATES.findIndex(s => s.abbr === abbr);
      if (idx >= 0) STATES[idx] = newState;
      else STATES.push(newState);

      try {
        await setDoc(doc(db, "states", abbr), newState);
        alert(`State ${name} saved!`);
        renderTiles();
      } catch (err) {
        console.error("Firebase save error:", err);
        alert("Failed to save state.");
      }

      // Clear form
      document.getElementById("a-name").value = "";
      document.getElementById("a-abbr").value = "";
      document.getElementById("a-year").value = "";
      document.getElementById("a-flag").value = "";
      document.getElementById("a-history").value = "";
    });
  }
});
