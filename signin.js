import {
    auth,
    signInWithEmailAndPassword,
    onAuthStateChanged
} from "./firebase.js"


let singinPassward = document.getElementById('signInpassward');
let signInemail = document.getElementById('signInemail');
let signIn = document.getElementById('signIn');

signIn.addEventListener('click', (evaent) => {
    evaent.preventDefault()
    if (signInemail.value == "" || singinPassward.value == "")
        Swal.fire({
            position: "top-end",
            icon: "error",
            title: "enter your all credentials",
            showConfirmButton: false,
            timer: 1500
        });


    else if (signInemail.value && singinPassward.value) {
        signInWithEmailAndPassword(auth, signInemail.value, singinPassward.value)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log("signed in successfully");

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);

            });
        window.location.href = "post.html"
    }
})
//onauth state change
onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log(user);
      const uid = user.uid;
      // ...
    } else {
      console.log("errror");
      
    }
  });
      
      
  