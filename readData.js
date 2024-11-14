import {
  db,
  setDoc,
  doc,
  serverTimestamp,
} from "./firebase.js"
// import { postDiv,backgroundSelection } from "./app.js";
// var title = document.getElementById("title")
// var textArea = document.getElementById("description");
// window.addEventListener('DOMContentLoaded', () => {
//   let send = document.getElementById("send");

//   send.addEventListener('click', async () => {
//     let id = Math.random().toString();
//     console.log(id);

//     await setDoc(doc(db, "posts", id), {
//       postTitle: title.value,
//       description: textArea.value,
//       createdAt: serverTimestamp()
//     });
//   });
// });


  


// let prePostBtn = document.getElementById('prePostBtn');
// prePostBtn.addEventListener('click', () => {
//   let prePost = document.getElementById('previous').innerHTML =
//  ` <h1>Current Post</h1>
//   <div class="card my-2" style="background-image: url(${selectedBgSrc}); background-size:cover; background-repeat:no-repeat;background-position:center">
//   <div class="card-header">@Post</div>
//   <div>
//   <h1 class="p-3">${title.value}</h1>
//   <hr>
//   <p  class="p-3">${textArea.value}</p>
//   </div>`
// })





