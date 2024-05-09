
import { useEffect, useState } from 'react';
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, listAll, getDownloadURL, list } from 'firebase/storage';
import './App.css';

const App = () => {
  const [imageUpload, setImageUpload] = useState(null);
  const [storage, setStorage] = useState(null);
  const [userId, setUserId] = useState("");
  const [images, setImages] = useState([]); // State to hold images
  const [items, setItems] = useState([]);

useEffect(() => {
  const firebaseConfig = {
    apiKey: "AIzaSyCFNro4zI_za4hQA9mjllRlIeKGp_ylbyc",
    authDomain: "react-firebase-90d72.firebaseapp.com",
    projectId: "react-firebase-90d72",
    storageBucket: "react-firebase-90d72.appspot.com",
    messagingSenderId: "812396111600",
    appId: "1:812396111600:web:e3cbb60621d9d8d7be4435",
    measurementId: "G-CYBTVDXLNP"
};

    // Initialize Firebase
const app = initializeApp(firebaseConfig);
const storageRef = getStorage(app); // Get storage reference

setStorage(storageRef); // Update the storage state variable

if (storageRef) {
    const imagesListRef = ref(storageRef, "images/"); // Create image list reference
    const foldersListRef = ref(storageRef, "images/"); // Create folders list reference

      // List all files and folders in "images/" path
    Promise.all([listAll(imagesListRef), list(foldersListRef)])
      .then(([imagesRes, foldersRes]) => {
        const imagePromises = imagesRes.items.map((itemRef) => getDownloadURL(itemRef));
        const folderPromises = foldersRes.prefixes.map((prefixRef) => prefixRef.name);
          
        Promise.all([...imagePromises, ...folderPromises])
          .then((urls) => {
            setItems(urls);
          });
      })
      .catch((error) => {
        console.error("Error listing items:", error);
      });
    }
  }, []);

const uploadImage = () => {
  if (imageUpload == null || storage == null || userId.trim() === "") {
    alert("Please enter a valid user ID");
    return;
};

const folderName = `images/${userId}` ;
const imageRef = ref(storage, folderName + "/" + imageUpload.name);

uploadBytes(imageRef, imageUpload)
  .then(() => {
    alert("Image Uploaded");
  })
  .catch((error) => {
    console.error("Error uploading image:", error);
  });
};

const displayImages = () => {
  if (storage == null || userId.trim() === "") {
    alert("Please enter a valid user ID");
    return;
  }

  const folderName = `images/${userId}`;
  const folderRef = ref(storage, folderName);

  // List all files in the folder
  listAll(folderRef)
    .then((result) => {
      const promises = result.items.map((itemRef) => getDownloadURL(itemRef));
      Promise.all(promises)
        .then((urls) => {
          setImages(urls);
        })
        .catch((error) => {
          console.error("Error getting download URLs:", error);
        });
    })
    .catch((error) => {
      console.error("Error listing items in folder:", error);
    });
};

return (
  <div className="App">
    <header className="App-header">
      <h2>Storage Task</h2>
      <div className="upload-container">
        {/* Text box for user to input their ID */}
        <input 
          type="text" 
          placeholder="Enter User ID" 
          value={userId} 
          onChange={(event) => setUserId(event.target.value)}
        />
        {/* Button to upload image */}
        <input type='file' onChange={(event) => { setImageUpload(event.target.files[0]) }}></input>
        <button onClick={uploadImage}>Upload Image</button>
        {/* Button to display images */}
        <button onClick={displayImages}>Display Images</button>
      </div>

      {/* Display images */}
      <div className="images-container">
        {images.map((imageUrl, index) => (
          <img key={index} src={imageUrl} alt={`Image ${index}`} />
        ))}
      </div>
    </header>
  </div>
);
}

export default App;

