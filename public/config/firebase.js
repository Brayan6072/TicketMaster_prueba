
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBleIv9JKDgU6dOpVilBt3aoVdAkJxxFDA",
    authDomain: "ticketmaster-566fd.firebaseapp.com",
    projectId: "ticketmaster-566fd",
    storageBucket: "ticketmaster-566fd.firebasestorage.app",
    messagingSenderId: "361548484251",
    appId: "1:361548484251:web:bace1f6dfddf000f88003e",
    measurementId: "G-1HTY1QLBH2"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
