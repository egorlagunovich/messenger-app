import React from "react";
import { useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";

export default function Navbar() {
  const [authing, setAuthing] = useState(false);
  const [isLogIn, setIsLogin] = useState(false);
  const auth = getAuth();

  useEffect(() => {
    AuthCheck();
    return () => AuthCheck();
  }, [auth]);
  const AuthCheck = onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("Welcome");
    } else {
      console.log("log in!");
    }
  });

  const signOutWithGoogle = () => {
    signOut(auth);
    setIsLogin(false);
  };
  const signInWithGoogle = async () => {
    setAuthing(true);
    signInWithPopup(auth, new GoogleAuthProvider())
      .then((response) => {
        console.log(response.user.displayName);
        setIsLogin(true);
        setAuthing(false);
      })
      .catch((error) => {
        console.log(error);
        setAuthing(false);
      });
  };
  return (
    <nav>
      <h1>Chat App</h1>

      <button
        onClick={() => {
          signInWithGoogle();
        }}
        disabled={authing}
      >
        Sign in
      </button>
      <button
        onClick={() => {
          signOutWithGoogle();
        }}
      >
        Sign out
      </button>
      {isLogIn ? "Hello!" : "Please, log in"}
    </nav>
  );
}
