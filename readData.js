import {
  db,
  setDoc,
  doc,
  serverTimestamp,
} from "./firebase.js"


window.addEventListener('DOMContentLoaded', () => {
  // let prePost = document.getElementById('prePostBtn')
  let send=document.getElementById("send")

 send.addEventListener('click', async () => {
    var title = document.getElementById("title")
    var textArea = document.getElementById("description")
  
    let id = Math.random().toString()
    console.log(id)

    await setDoc(doc(db, "posts", id), {
      postTitle: title.value,
      description: textArea.value,
      createdAt: serverTimestamp()
    });
  })
})





