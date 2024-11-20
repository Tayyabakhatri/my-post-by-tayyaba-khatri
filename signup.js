
import {
    getAuth,
    createUserWithEmailAndPassword,
    serverTimestamp,
    db,
    setDoc,
    doc
} from "./firebase.js"

let age = document.getElementById('age');
let city = document.getElementById('city');
let passward = document.getElementById('passward');
let email = document.getElementById('email');
let signupBtn = document.getElementById('signUp');
const auth = getAuth();
// const db = getFirestore(app);
signupBtn.addEventListener('click', (event) => {
    event.preventDefault()


    // empty field valiidations
    if (email.value == "" || passward.value == "") {
        swal({
            title: "Opps.....",
            text: "enter complete Credentials.",
            imageUrl: "error",
        })
    }

    // Validate email format (simple check)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value)) {
        swal({
            title: "Opps....",
            text: "Email should contain '@' ",
            imageUrl: "error",
        })
        return;

    }

    // after entering correct credentials
    else if (email.value && passward.value)
        createUserWithEmailAndPassword(auth, email.value, passward.value)
            .then(async (userCredential) => {
                const user = userCredential.user;
                console.log(user)
                swal({
                    title: "Sweet!",
                    text: "sign up successfully.",
                    imageUrl: "/images/golden-thumbs-up-e1K4DJ5-600.jpg",
                    timer: 1500
                })
                //firestore
                //adding docs
                await setDoc(doc(db, "users", user.uid), {
                    user_city: city.value,
                    user_age: age.value,
                    createdAt: serverTimestamp()

                });


                //firestore finish

                // now it will redirect
                setTimeout(() => {
                    location.href = "signin.html"
                }, 3000)
            })

            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode + errorMessage)
                swal({
                    title: "ERROR",
                    text: errorMessage,
                    imageUrl: "error"
                });
            });
})