
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from "./firebase.js"

let age = document.getElementById('age');
let city = document.getElementById('city');
let passward = document.getElementById('passward');
let email = document.getElementById('email');
let signupBtn = document.getElementById('signUp');
const auth = getAuth();
signupBtn.addEventListener('click', (event) => {
    event.preventDefault()
    if (email.value == "" || passward.value == "") {
        alert('fill completely')
    }
    // Validate email format (simple check)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value)) {
        alert('Please enter a valid email address.');
        return;
    }
    else if (email.value && passward.value)
        createUserWithEmailAndPassword(auth, email.value, passward.value)
            .then((userCredential) => {
                const user = userCredential.user;
                swal({
                    title: "Sweet!",
                    text: "sign up successfully.",
                    imageUrl: "/images/golden-thumbs-up-e1K4DJ5-600.jpg",
                    timer:1500
                })
                setTimeout(()=>{
                    location.href = "signin.html"
                },5000)
            })
              
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode+ errorMessage)
                swal({
                    title: "Sweet!",
                    text: "error",
                    imageUrl: "images/thumbs-up.jpg"
                });
                // sweetAlert("Oops...", "Something went wrong!", "error");
            });
})