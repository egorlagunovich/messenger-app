import React from "react";
import { useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../App";

type NavbarProps = {
  setIsLogin(arg: boolean): void;
  isLogIn: boolean;
};
export default function Navbar({ setIsLogin, isLogIn }: NavbarProps) {
  const [authing, setAuthing] = useState(false);

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
        setIsLogin(true);
        setAuthing(false);
      })
      .catch((error) => {
        console.log(error);
        setAuthing(false);
      });
  };
  return (
    <nav className="flex flex-row justify-between">
      <h1>Chat App</h1>
      {isLogIn ? (
        <button
          onClick={() => {
            signOutWithGoogle();
          }}
        >
          Sign out
        </button>
      ) : (
        <button
          onClick={() => {
            signInWithGoogle();
          }}
          disabled={authing}
        >
          Sign in
        </button>
      )}
    </nav>
  );
}
