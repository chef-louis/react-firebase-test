import { useState, useEffect } from "react";
import "./App.css";

import { Auth } from "./components/auth";
import { db, auth, storage } from "./config/firebase";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";

function App() {
  const [movieList, setMovieList] = useState([]);

  // New Movie States
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newReleaseDate, setNewReleaseDate] = useState(0);
  const [isNewMovieOscar, setIsNewMovieOscar] = useState(false);

  // Update Title State
  const [updatedTitle, setUpdatedTitle] = useState("");

  // File Upload State
  const [fileUpload, setFileUpload] = useState(null);

  const moviesCollectionRef = collection(db, "movies");

  async function getMovieList() {
    try {
      const data = await getDocs(moviesCollectionRef);
      const filteredData = data.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMovieList(filteredData);
    } catch (err) {
      console.error(err);
    }
  }

  async function onSubmitMovie() {
    try {
      await addDoc(moviesCollectionRef, {
        title: newMovieTitle,
        releaseDate: newReleaseDate,
        receivedOscar: isNewMovieOscar,
        userId: auth?.currentUser?.uid,
      });

      getMovieList();
    } catch (err) {
      console.error(err);
    }
  }

  async function deleteMovie(movieId) {
    const movieDoc = doc(db, "movies", movieId);
    try {
      await deleteDoc(movieDoc);

      getMovieList();
    } catch (err) {
      console.error(err);
    }
  }

  async function updateMovieTitle(movieId) {
    const movieDoc = doc(db, "movies", movieId);
    try {
      await updateDoc(movieDoc, { title: updatedTitle });

      getMovieList();
    } catch (err) {
      console.error(err);
    }
  }

  async function uploadFile() {
    if (!fileUpload) return;
    const filesUploadRef = ref(storage, `projectFiles/${fileUpload.name}`);
    try {
      await uploadBytes(filesUploadRef, fileUpload);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getMovieList();
  }, []);

  return (
    <div className="App">
      <Auth />
      <div>
        <input
          type="text"
          placeholder="Movie title..."
          onChange={e => setNewMovieTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="Release Date..."
          onChange={e => setNewReleaseDate(Number(e.target.value))}
        />
        <input
          type="checkbox"
          checked={isNewMovieOscar}
          onChange={e => setIsNewMovieOscar(e.target.checked)}
        />
        <label htmlFor="">Received an Oscar</label>
        <button onClick={onSubmitMovie}>Submit Movie</button>
      </div>
      <div>
        {movieList.map(movie => (
          <div key={movie.id}>
            <h1 style={{ color: movie.receivedOscar ? "green" : "red" }}>
              {movie.title}
            </h1>
            <p>Date: {movie.releaseDate}</p>
            <button onClick={() => deleteMovie(movie.id)}>Delete Movie</button>

            <input
              type="text"
              placeholder="New Title..."
              onChange={e => setUpdatedTitle(e.target.value)}
            />
            <button onClick={() => updateMovieTitle(movie.id)}>
              Update Title
            </button>
          </div>
        ))}
      </div>
      <div>
        <input type="file" onChange={e => setFileUpload(e.target.files[0])} />
        <button onClick={() => uploadFile()}>Upload File</button>
      </div>
    </div>
  );
}

export default App;
