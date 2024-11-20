import {
    auth,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    GoogleAuthProvider,
    provider,
    signInWithPopup,


} from "./firebase.js"

// const auth = getAuth(app);
let singinPassward = document.getElementById('signInpassward');
let signInemail = document.getElementById('signInemail');
let signIn = document.getElementById('signIn');

signIn.addEventListener('click', (event) => {
    event.preventDefault()
    //validation for empty field
    if (signInemail.value == "" || singinPassward.value == "")
        Swal.fire({
            position: "top-end",
            icon: "error",
            title: "enter your all credentials",
            showConfirmButton: false,
            timer: 1500
        });
    //signing in the user 

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
                console.log(errorCode)
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "ERROR : " + errorMessage,
                    showConfirmButton: false,
                    timer: 1500
                });
            });

        //it will now redirect 
        window.location.href = "post.html"
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
            //on auth state change
            let profile = document.getElementById('prfile');

            onAuthStateChanged(auth, (user) => {
                if (user) {
                    console.log(user);
                    const uid = user.uid;
                    const user_img = user.photoURL
                    profile.innerHTML = `
        <img src=${user_img}>
        <div>
        <p>${user.displayName}</p>
        </div>
        `
                }
            });

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



//on auth state change
let profile = document.getElementById('prfile');

onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log(user);
        const uid = user.uid;
        const user_img = user.photoURL
        profile.innerHTML = `
        <img src=${user_img}>
        <div>
        <p>${user.displayName}</p>
        </div>
        `
    }
});

//         // profile_img.src = user.photoURL
//         // profile_name.innerHTML = user.displayName
//         // user_email.innerHTML = user.email
//         // ...
//     } else {
//         console.log("errror");



