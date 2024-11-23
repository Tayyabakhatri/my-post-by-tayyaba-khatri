import { getAuth, collection, getDocs, db, doc, setDoc, where, query, getDoc, serverTimestamp, updateDoc } from "./firebase.js"



const auth = getAuth();

var postDiv = document.getElementById("show-post");
var input = document.getElementById("title");
var textArea = document.getElementById("description");
let previousBtn = document.getElementById('previous');



var selectedBgSrc = ""
function backgroundSelection(src, e) {
    selectedBgSrc = src;
    document.getElementById("chooseBg").innerHTML = `<img src="${src}" alt="Selected Background" style="background-position:center;">`;

    // Remove "border-effect" from all images
    var images = document.getElementsByClassName("img");
    for (var i = 0; i < images.length; i++) {
        images[i].classList.remove("border-effect"); // Remove any existing border effect
    }

    // Add "border-effect" class to the clicked image
    e.target.classList.add("border-effect");
}

// Adding event listeners to each image
document.addEventListener('DOMContentLoaded', () => {
    const images = document.getElementsByClassName("img");
    Array.from(images).forEach((img) => {
        img.addEventListener('click', (event) => {
            backgroundSelection(img.src, event); // Pass the image source and event
        });
    });
});

let send = document.getElementById("send");

send.addEventListener('click', async () => {
    let Auth = auth.currentUser
    let email = Auth.email
    let name = Auth.displayName
    async function showPost() {
        if (input.value == "" || textArea.value == "") {
            alert("both fields are required")
        }
        else if (input.value && textArea.value) {
            postDiv.innerHTML = `
              
                <div class="card my-2" style="background-image: url(${selectedBgSrc}); background-size:cover; background-repeat:no-repeat;background-position:center">
                <div class="card-header">@Post</div>
                <div class="p-3">${email}
                <p class="fw-bold">${name}</p>
                </div>
                <div>
                <h1 class="p-3">${input.value}</h1>
                <hr>
                <p  class="p-3">${textArea.value}</p>
                </div>
                
                <div class="d-flex gap-3 p-3"><button class="editBtn">Edit</button>
                <button class="delPost" id="del">Delete</button></div>
                </div>
                `

            //setting email in the field


            let profile = document.getElementById('profile');
            if (profile) {
                profile.innerHTML = `<p>${email}</p>`
            } else {
                console.error("Profile element not found in the DOM.");
            }

            //setting docs for posts

            console.log(Auth);
            let id = Auth.uid
            await setDoc(doc(db, "posts", id), {
                Title: input.value,
                post: textArea.value,
            });

            //update function
            const docRef = doc(db, 'posts', id);

            // Update the timestamp field with the value from the server
            const updateTimestamp = await updateDoc(docRef, {
                timestamp: serverTimestamp()
            });

            //setting docs finish
            input.value = ""
            textArea.value = ""

            let del = document.getElementById('del')
            del.addEventListener('click', (event) => {
                var parentNode = event.target.parentNode.parentNode
                parentNode.remove()
            })
            let edit = document.getElementsByClassName('editBtn')[0]
            edit.addEventListener('click', (event) => {
                var editTitle = prompt("enter new title")

                var editText = prompt("enter new text")
                var editedTitle = event.target.parentNode.parentNode;//access parent node
                var a = editedTitle.childNodes[3].childNodes[1]//access the h1 (its also counting the text nodes)
                a.innerText = editTitle
                var editedText = event.target.parentNode.parentNode
                var b = editedText.childNodes[3].childNodes[5]
                b.innerText = editText
            })
        }
    }
    showPost()
})



previousBtn.addEventListener('click', async () => {
    let Auth = auth.currentUser
    let id = Auth.uid
    // console.log(Auth);
    const docRef = doc(db, "posts", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const docData = docSnap.data()
        console.log(docData.Title);

        console.log("Document data:", docSnap.data());
        const q = query(collection(db, "posts"), where("uid", "==", id));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            let data = doc.data()
            console.log(data);
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        });
        let timeStamp = docData.timestamp.toDate()
        let time = timeStamp.toTimeString().split(' ')[0]


        let previousPost = document.getElementById('previousPost')
        previousPost.innerHTML = ` <div class="card my-2" style="background-image: url(${selectedBgSrc}); background-size:cover; background-repeat:no-repeat;background-position:center">
                <div class="card-header">@Post</div>
                <p class="p-3">${time}</p>
                <div>
                <h1 class="p-3">${docData.Title}</h1>
                <hr>
                <p  class="p-3">${docData.post}</p>
                </div>`
    } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
    }
});
//on auth state change
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log(user)
        user.providerData.forEach((profile) => {
            console.log("Sign-in provider: " + profile.providerId);
            console.log("  Provider-specific UID: " + profile.uid);
            console.log("  Name: " + profile.displayName);
            console.log("  Email: " + profile.email);
            console.log("  Photo URL: " + profile.photoURL);
        })
        image.src = user.photoURL
        profile_email.innerHTML = user.email
        name.innerHTML = user.displayName
    }
})