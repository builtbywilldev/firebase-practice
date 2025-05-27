import { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "./firebase/init";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Monitor auth state
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  function register() {
    setLoading(true);
    createUserWithEmailAndPassword(auth, "email@email.com", "test123")
      .then((res) => setUser(res.user))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }

  function login() {
    setLoading(true);
    signInWithEmailAndPassword(auth, "email@email.com", "test123")
      .then((res) => setUser(res.user))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }

  function logout() {
    setLoading(true);
    signOut(auth)
      .then(() => setUser(null))
      .finally(() => setLoading(false));
  }

  const firstLetter = user?.email?.[0]?.toUpperCase() ?? "";

  return (
    <div className="App">
      {loading ? (
        <span>Loading...</span>
      ) : user ? (
        <button onClick={logout}>{firstLetter}</button>
      ) : (
        <>
          <button onClick={login}>Login</button>
          <button onClick={register}>Register</button>
        </>
      )}
    </div>
  );
}

export default App;
