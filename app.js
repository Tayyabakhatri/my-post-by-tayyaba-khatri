import { getAuth, collection, getDocs, db, doc } from "./firebase.js"



const auth = getAuth();
var postDiv = document.getElementById("show-post");
var input = document.getElementById("title");
var textArea = document.getElementById("description");
let age = document.getElementById('age')
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

    function showPost() {
        if (input.value == "" || textArea.value == "") {
            alert("both fields are required")
        }
        else if (input.value && textArea.value) {
            postDiv.innerHTML = `
              
                <div class="card my-2" style="background-image: url(${selectedBgSrc}); background-size:cover; background-repeat:no-repeat;background-position:center">
                <div class="card-header">@Post</div>
                <div>
                <h1 class="p-3">${input.value}</h1>
                <hr>
                <p  class="p-3">${textArea.value}</p>
                </div>
                
                <div class="d-flex gap-3 p-3"><button class="editBtn">Edit</button>
                <button class="delPost" id="del">Delete</button></div>
                </div>
                `
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
// getting data
const querySnapshot = await getDocs(collection(db, "users"));
querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    let Auth = auth.currentUser
    console.log(Auth);
    if (Auth) {
        const userImg = Auth.photoURL
        const userName = Auth.displayName
        const imgElement = document.createElement('img')
        imgElement.setAttribute('src', userImg)
        imgElement.setAttribute('alt', 'profile picture');
        const nameElement = document.createElement('p')
        nameElement.textContent = userName;
        const divElement = document.createElement('div');
        divElement.appendChild(nameElement)
        let profile = document.getElementById('prfile');
       profile.appendChild(divElement)
    }
    // console.log(doc.data());


    console.log(doc.id, " => ", doc.data());
    
});