import { useEffect, useState } from "react";
import "./App.css";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, db } from "./firebase/init";
import React from "react";

function App() {
  const [user, setUser] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  async function updatePost() {
    const hardcodeId = "TGYxezvGGjZkgXT5EtKG8tEgzeA2";
    const postRef = doc(db, "posts", hardcodeId);
    const post = await getPostById(hardcodeId)
    console.log(post)
    const newPost = {
      ...post,
      title: "land $1,000,200 job"
    }
    updateDoc(postRef, newPost)
  }

  function deletePost(){
    const hardcodeId = "TGYxezvGGjZkgXT5EtKG8tEgzeA2";
    const postRef = doc(db, "posts", hardcodeId)
    deleteDoc(postRef)
  }



  function createPost() {
    const post = {
      title: "code bang code",
      description: "always",
      uid: user.uid,
    };
    addDoc(collection(db, "posts"), post);
  }

  async function getAllPosts() {
    const { docs } = await getDocs(collection(db, "posts"));
    const posts = docs.map((elem) => ({ ...elem.data(), id: elem.id }));
    console.log(posts);
  }

  async function getPostById(id) {
    const postRef = doc(db, "posts", id);
    const postSnap = await getDoc(postRef);
    return postSnap.data();
  }

  async function getPostByUid() {
    const postCollectionRef = await query(
      collection(db, "posts"),
      where("uid", "==", user.uid)
    );
    const { docs } = await getDocs(postCollectionRef);
    console.log(docs.map((doc) => doc.data()));
  }

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setLoading(false);
      if (user) {
        setUser(user);
      }
    });
  }, []);

  function register() {
    console.log("register");
    createUserWithEmailAndPassword(auth, "email@email.com", "test123")
      .then(({ user }) => {
        console.log(user);
        setUser(user);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function login() {
    signInWithEmailAndPassword(auth, "email@email.com", "test123")
      .then(({ user }) => {
        console.log(user);
        setUser(user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  function logout() {
    signOut(auth);
    setUser({});
  }

  return (
    <div className="App">
      <button onClick={register}>Register</button>
      <button onClick={login}>Login</button>
      <button onClick={logout}>Logout</button>
      {loading ? "Loading..." : user.email}
      <button onClick={createPost}>Create Post</button>
      <button onClick={getAllPosts}>Get all posts</button>
      <button onClick={getPostById}>Get post by id</button>
      <button onClick={getPostByUid}>Get post by Uid</button>
      <button onClick={updatePost}>Update Post</button>
      <button onClick={deletePost}>Delete Post</button>
    </div>
  );
}

export default App;

// import { useEffect, useState } from "react";
// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   signOut,
//   onAuthStateChanged,
// } from "firebase/auth";
// import { auth } from "./firebase/init";

// function App() {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Monitor auth state
//   useEffect(() => {
//     const unsub = onAuthStateChanged(auth, (user) => {
//       setUser(user);
//       setLoading(false);
//     });
//     return () => unsub();
//   }, []);

//   function register() {
//     setLoading(true);
//     createUserWithEmailAndPassword(auth, "email@email.com", "test123")
//       .then((res) => setUser(res.user))
//       .catch((err) => console.log(err))
//       .finally(() => setLoading(false));
//   }

//   function login() {
//     setLoading(true);
//     signInWithEmailAndPassword(auth, "email@email.com", "test123")
//       .then((res) => setUser(res.user))
//       .catch((err) => console.log(err))
//       .finally(() => setLoading(false));
//   }

//   function logout() {
//     setLoading(true);
//     signOut(auth)
//       .then(() => setUser(null))
//       .finally(() => setLoading(false));
//   }

//   const firstLetter = user?.email?.[0]?.toUpperCase() ?? "";

//   return (
//     <div className="App">
//       {loading ? (
//         <span>Loading...</span>
//       ) : user ? (
//         <button onClick={logout}>{firstLetter}</button>
//       ) : (
//         <>
//           <button onClick={login}>Login</button>
//           <button onClick={register}>Register</button>
//         </>
//       )}
//     </div>
//   );
// }

// export default App;
