// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCq8sky8d8SowD7FwJiqOAftDZZ5WC4sRc",
  authDomain: "user-detail-f9d15.firebaseapp.com",
  databaseURL: "https://user-detail-f9d15-default-rtdb.firebaseio.com",
  projectId: "user-detail-f9d15",
  storageBucket: "user-detail-f9d15.appspot.com",
  messagingSenderId: "1008052101145",
  appId: "1:1008052101145:web:b36468a26edbc1e5abca88"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Load data from Firebase or localStorage
document.addEventListener("DOMContentLoaded", () => {
  const saved = JSON.parse(localStorage.getItem("userData"));
  if (saved) fillForm(saved);

  const storedId = localStorage.getItem("uniqueId");
  if (storedId) {
    get(child(ref(database), `accounts/${storedId}`)).then(snapshot => {
      if (snapshot.exists()) {
        fillForm(snapshot.val());
        localStorage.setItem("userData", JSON.stringify(snapshot.val()));
      }
    });
  }

  document.querySelector("button").addEventListener("click", saveData);
});

// Fill form function
function fillForm(data) {
  document.getElementById("username").value = data.name || "";
  document.getElementById("email").value = data.email || "";
  document.getElementById("date").value = data.date || "";
  document.getElementById("country").value = data.country || "";
  document.getElementById("state").value = data.state || "";
  document.getElementById("city").value = data.city || "";
  document.getElementById("number").value = data.number || "";
  document.getElementById("message").value = data.message || "";
}

// Save data function
function saveData() {
  const data = {
    name: document.getElementById("username").value,
    email: document.getElementById("email").value,
    date: document.getElementById("date").value,
    country: document.getElementById("country").value,
    state: document.getElementById("state").value,
    city: document.getElementById("city").value,
    number: document.getElementById("number").value,
    message: document.getElementById("message").value
  };

  if (data.name && data.email && data.date && data.country && data.state && data.city && data.number) {
    const uniqueId = (data.email + "_" + data.number).replace(/[^\w]/g, "_");
    set(ref(database, "accounts/" + uniqueId), data)
      .then(() => {
        localStorage.setItem("userData", JSON.stringify(data));
        localStorage.setItem("uniqueId", uniqueId);
        alert("Data saved to Firebase and localStorage!");
      })
      .catch(err => {
        alert("Error saving to Firebase: " + err);
      });
  } else {
    alert("Please fill all required fields.");
  }
}






