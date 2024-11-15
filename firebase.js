
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
  import {getFirestore,doc, setDoc,serverTimestamp,getDocs,collection, query, where  } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

  const firebaseConfig = {
    apiKey: "AIzaSyAvGFBbP_R95PBzLmRnpDUN9Z5i43c4_54",
    authDomain: "fir-tayyaba-khatri.firebaseapp.com",
    projectId: "fir-tayyaba-khatri",
    storageBucket: "fir-tayyaba-khatri.firebasestorage.app",
    messagingSenderId: "418367597730",
    appId: "1:418367597730:web:78f467965214c81f53fbfb",
    measurementId: "G-4Z89Q14EM7"
  };
  // Initialize Firebase - this must be done first
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth and Firestore
const db = getFirestore(app);
export{getFirestore,doc, setDoc,db,serverTimestamp,getDocs,collection,query, where}
