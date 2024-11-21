
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,

} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore, serverTimestamp, setDoc, doc, collection, getDocs, where, query,getDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyABKOzM6pBfF6DWLit-UHWJc_D4Adz7ruI",
    authDomain: "post-application-firebase.firebaseapp.com",
    projectId: "post-application-firebase",
    storageBucket: "post-application-firebase.firebasestorage.app",
    messagingSenderId: "176355530954",
    appId: "1:176355530954:web:438a47282a752f7496fc33",
    measurementId: "G-0FB2T0JP1L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
export {
    getAuth,
    auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    provider,
    GoogleAuthProvider,
    getFirestore,
    serverTimestamp,
    signInWithPopup,
    db,
    setDoc,
    doc,
    where, query
    , collection, getDocs
    ,getDoc
}
