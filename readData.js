import {
    // collection,
    // addDoc,
    db,
    setDoc,
    doc,
    getAuth,
    auth
} from "./firebase.js"
var title = document.getElementById("title");
var textArea = document.getElementById("description");
let previousPost = document.getElementById('previous');
let prePost = document.getElementById('prePostBtn')
prePost.addEventListener('click', async () => {
      //firestore
  const currentUser=auth.currentUser
  console.log(currentUser.uid);
  
  await setDoc(doc(db, "posts", currentUser.uid), {
    postTitle: title.value,
    description: textArea.value
  });

      
})

