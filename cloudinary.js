let cloudName = "dj6sjdar5"
let unSignedUploadPreset = "evqkzaka"
let file = document.getElementById('file')
let gallery = document.getElementById('gallery')
gallery.addEventListener('click', () => {

    let inputElement = document.createElement('input');
    inputElement.type = "file"
    inputElement.id="input"
    inputElement.addEventListener('change', (event) => {
        let files = event.target.files; // Get the selected files
        console.log(files); // Log the files to the console
    });
    inputElement.click();
    console.log(inputElement);
    let fileInput = inputElement.files[0];

    let url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;

    let fd = new FormData();
    fd.append("upload_preset", unSignedUploadPreset);
    fd.append("file", fileInput);

    fetch(url, {
        method: "POST",
        body: fd,
    })
        .then((response) => response.json())
        .then((data) => {
            let resourceURl = data.secure_url;

            let transformedUrl = resourceURl.replace(
                "upload/",
                "upload/h_50,w_50/"
                //   "upload/ar_1.0,c_thumb,g_face,w_0.7/r_max/co_skyblue,e_outline/co_lightgray,e_shadow,x_5,y_8/docs/blue_sweater_model.png"
            );

            console.log("uploaded succesfully", resourceURl);
            let img = new Image();
            img.src = transformedUrl;

            console.log(data);
            //incase of pdf but now no need 
            if (data.format == "pdf" || data.format == "mp4") {
                let iframe = document.createElement("iframe");
                iframe.src = resourceURl;
                iframe.width = "500px";
                iframe.height = "500px";
                gallery.appendChild(iframe);
                console.log(iframe);
            } else {
                let img = new Image();
                img.src = transformedUrl;

                //             img.src=resourceURl
                // gallery.appendChild(img)

                gallery.appendChild(img);
            }
        })
        .catch((e) => {
            console.log(e);
        });
  
})


function pictureFun() {
    let fileInput = file.files[0];

    let url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;

    let fd = new FormData();
    fd.append("upload_preset", unSignedUploadPreset);
    fd.append("file", fileInput);

    fetch(url, {
        method: "POST",
        body: fd,
    })
        .then((response) => response.json())
        .then((data) => {
            let resourceURl = data.secure_url;

            let transformedUrl = resourceURl.replace(
                "upload/",
                "upload/h_50,w_50/"
                //   "upload/ar_1.0,c_thumb,g_face,w_0.7/r_max/co_skyblue,e_outline/co_lightgray,e_shadow,x_5,y_8/docs/blue_sweater_model.png"
            );

            console.log("uploaded succesfully", resourceURl);
            let img = new Image();
            img.src = transformedUrl;

            console.log(data);
            //incase of pdf but now no need 
            if (data.format == "pdf" || data.format == "mp4") {
                let iframe = document.createElement("iframe");
                iframe.src = resourceURl;
                iframe.width = "500px";
                iframe.height = "500px";
                gallery.appendChild(iframe);
                console.log(iframe);
            } else {
                let img = new Image();
                img.src = transformedUrl;

                //             img.src=resourceURl
                // gallery.appendChild(img)

                gallery.appendChild(img);
            }
        })
        .catch((e) => {
            console.log(e);
        });
}


// let gallery = document.getElementById('gallery');

// // Cloudinary configuration
// const cloudName = "your-cloudinary-cloud-name"; // Replace with your Cloudinary cloud name
// const unSignedUploadPreset = "your-upload-preset"; // Replace with your unsigned upload preset

// gallery.addEventListener('click', () => {
//     // Create a hidden input element for file selection
//     let inputElement = document.createElement('input');
//     inputElement.type = "file";
//     inputElement.accept = "image/*"; // Optional: Restrict to image files

//     // Handle file selection
//     inputElement.addEventListener('change', (event) => {
//         let file = event.target.files[0]; // Get the selected file
//         if (!file) return; // Exit if no file selected

//         uploadToCloudinary(file)
//             .then((data) => {
//                 let resourceUrl = data.secure_url;

//                 // Transform URL for thumbnail display
//                 let transformedUrl = resourceUrl.replace("upload/", "upload/h_100,w_100/");

//                 // Create and append image to gallery
//                 let img = new Image();
//                 img.src = transformedUrl;
//                 img.style.margin = "5px"; // Optional: Add spacing between images
//                 gallery.appendChild(img);
//             })
//             .catch((err) => console.error("Upload failed:", err));
//     });

//     // Trigger the file input dialog
//     inputElement.click();
// });

// // Function to upload a file to Cloudinary
// function uploadToCloudinary(file) {
//     const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
//     let fd = new FormData();
//     fd.append("upload_preset", unSignedUploadPreset);
//     fd.append("file", file);

//     return fetch(url, {
//         method: "POST",
//         body: fd,
//     }).then((response) => {
//         if (!response.ok) {
//             throw new Error("Failed to upload to Cloudinary");
      //} 
