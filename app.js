import {
    db,
    setDoc,
    doc,
    serverTimestamp,
    getDocs,
    collection,
    query, 
    where
  } from "./firebase.js"
var postDiv = document.getElementById("show-post");
var input = document.getElementById("title");
var textArea=document.getElementById("description");
var selectedBgSrc=""
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


       
function editPost(event){
    var editTitle = prompt("enter new title")
   
    var  editText= prompt("enter new text")
        var editedTitle=event.target.parentNode.parentNode;//access parent node
        var a=editedTitle.childNodes[3].childNodes[1]//access the h1 (its also counting the text nodes)
        a.innerText=editTitle
       var editedText= event.target.parentNode.parentNode
       var b=  editedText.childNodes[3].childNodes[5]
       b.innerText=editText
    }    
function deletePost(event){
var parentNode = event.target.parentNode.parentNode
parentNode.remove()
    }
 // array of posts
let allPosts= [];
    let send = document.getElementById("send");

    send.addEventListener('click', async () => {

     function showPost(){
            if(input.value&&textArea.value){
                postDiv.innerHTML=`
                <h1>Current Post</h1>
                <div class="card my-2" style="background-image: url(${selectedBgSrc}); background-size:cover; background-repeat:no-repeat;background-position:center">
                <div class="card-header">@Post</div>
                <div>
                <h1 class="p-3">${input.value}</h1>
                <hr>
                <p  class="p-3">${textArea.value}</p>
                </div>
                
                <div class="d-flex gap-3 p-3"><button class="editBtn" onclick="editPost(event)">Edit</button>
                <button class="delPost" id="del" onclick="deletePost(event)">Delete</button></div>
                </div>
                `
                input.value=""
                textArea.value=""



                // showingprevious posts start
                allPosts.push(postDiv.innerHTML)
                console.log(allPosts)
                let prePostBtn = document.getElementById('prePostBtn')
                // getting data 
                prePostBtn.addEventListener('click',async()=>{
                    
                    const querySnapshot = await getDocs(collection(db, "posts"));
                    querySnapshot.forEach(async (doc) => {  // Make the callback async because 'getDocs' is asynchronous
                        const data = doc.data();
                    // console.log(doc.id);
                    
                        if (data.createdAt && data.createdAt.toDate) {
                            let time = data.createdAt.toDate();
                             let dateOfTheMonth = time.getDate() // Get the day of the month
                    
                            // const posts = collection(db, "posts");
                            const postRef = collection(db, "posts",doc.id);
                    // updating doc
                            setDoc(postRef, { dateOfTheMonth: dateOfTheMonth}, { merge: true });
                            // Create a query against the collection.
                            const q = query(collection(db,"posts"),where("dateOfTheMonth" , "==","14"));
                    
                            // Await the result of the query
                            const filterQuery = await getDocs(q);
                    
                            // Iterate through the filtered query snapshot
                            filterQuery.forEach((qDoc) => {
                                console.log(qDoc.id, " => ", qDoc.data());
                            });
                        } else {
                            console.log("no match");
                        }
                    });
                    
    
                })

                // showingprevious posts finish


                }
                else if(input.value===""&&textArea.value){
        
                  alert('fill both fields')
                }
        
            }
   

      let id = Math.random().toString();
      console.log(id);
//   setting data in to doc
      await setDoc(doc(db, "posts", id), {
        postTitle: input.value,
        description: textArea.value,
        createdAt: serverTimestamp()
      });
      showPost()
    });










// var titlePost = document.getElementById("titlePost");
// var postDescription = document.getElementById("postDescription");
// var posts = document.getElementById("posts");
// var selectedImageSrc = ""; // Store the selected image source

// function setBackgroundImage(src) {
//     selectedImageSrc = src; 
    
//     document.getElementById("imagePreview").innerHTML = `<img src="${src}" alt="Selected Background" style="width: 60px; height: 50px; border: 1px solid #ccc;">`;
// }

// function addPost() {
//     if (titlePost.value && postDescription.value) {
//         posts.innerHTML += `
//             <div class="card mb-3 animate__animated animate__fadeIn" style="background-image: url(${selectedImageSrc}); background-size: cover; background-repeat: no-repeat; background-position: center;">
//                 <div class="card-header colours">
//                     @Posts
//                 </div>
//                 <div class="card-body">
//                     <h4 class="card-title colours text">${titlePost.value}</h4>
//                     <p class="card-text colours text">${postDescription.value}</p> 
//                 </div>
//                 <div class="button p-4"> 
//                     <button type="button" class="btn btn-edit animate__animated animate__pulse" onclick="editPost(event)">Edit</button>
//                     <button type="button" class="btn btn-danger" onclick="removePost(event)">Delete</button>
//                 </div>
//             </div>`;
            
//         titlePost.value = "";
//         postDescription.value = "";
//         selectedImageSrc = ""; 
//         document.getElementById("imagePreview").innerHTML = ""; 
//     } else {
//         Swal.fire('Error', 'Please enter both title and description!', 'error');
//     }
// }

// function removePost(event){
//     var postToRemove = event.target.parentNode.parentNode;
//     postToRemove.classList.add('animate__animated', 'animate__lightSpeedOutRight');
//     setTimeout(() => {
//         postToRemove.remove();
//     }, 1000); 
// }

// function editPost(event){
//     var postEdit = event.target.parentNode.parentNode;
//     var currentPostTitle = postEdit.children[1].children[0].innerText;
//     var currentPostDescription = postEdit.children[1].children[1].innerText;

//     Swal.fire({
//         title: 'Edit Post',
//         html: `
//             <input type="text" id="editTitle" class="form-control" value="${currentPostTitle}">
//             <textarea id="editDescription" class="form-control mt-3">${currentPostDescription}</textarea>
//         `,
//         confirmButtonText: 'Update',
//         showCancelButton: true
//     }).then((result) => {
//         if (result.isConfirmed) {
//             postEdit.children[1].children[0].innerText = document.getElementById("editTitle").value;
//             postEdit.children[1].children[1].innerText = document.getElementById("editDescription").value;
//         }
//     });
// }
   

