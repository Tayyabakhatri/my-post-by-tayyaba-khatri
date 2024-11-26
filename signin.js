import {
    auth,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    GoogleAuthProvider,
    provider,
    signInWithPopup,
    collection, getDocs, db,
    addDoc

} from "./firebase.js"

// const auth = getAuth(app);
let singinPassward = document.getElementById('signInpassward');
let signInemail = document.getElementById('signInemail');
let signIn = document.getElementById('signIn');
let image = document.getElementById('image')
let profile_email= document.getElementById('user_email');
let name= document.getElementById('name')
let profile = document.getElementById('profile');
console.log(profile);


signIn.addEventListener('click', async (event) => {
    event.preventDefault()
    //validation for empty field
    if (signInemail.value && singinPassward.value)
        signInWithEmailAndPassword(auth, signInemail.value, singinPassward.value)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;

                swal({
                    title: "Sweet!",
                    text: "Here's a custom image.",
                    imageUrl: "images/golden-thumbs-up-e1K4DJ5-600.jpg"
                });

                console.log(user)
                let email = user.email
                console.log(email);
                
                if (profile) {
                    profile.innerHTML = `<p>${email}</p>`
                } else {
                    console.error("Profile element not found in the DOM.");
                }


               // Redirect after success
                setTimeout(() => {
                    window.location.href = "post.html";
                }, 3000);

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = "An error occurred. Please try again." + error.message

                if (errorCode === "auth/wrong-password") {
                    errorMessage = "Incorrect password.";
                } else if (errorCode === "auth/user-not-found") {
                    errorMessage = "No user found with this email.";
                }

                swal(errorMessage)
            });

    else if (signInemail.value == "" || singinPassward.value == "") {
        swal({
            title: "ERROR",
            text: "Fill all credentials",
        });
    }
})

//signing in with google functionality 
let google = document.getElementById("googleBtn")
google.addEventListener('click', () => {
    // console.log("hello")
    signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            console.log(user)
            location.href = "post.html"


        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            swal({
                title: "ERROR",
                text: errorMessage,
                imageUrl: "error"
            });
            // The email of the user's account used.
            const email = error.customData.email;
            ; console.log(email);

            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            console.log(credential)
            // ...
        });
})







