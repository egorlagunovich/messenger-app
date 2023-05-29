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
  const [currentUser, setCurrentUser] = useState<any>("{}");
  // const [currentAuth, setCurrentAuth] = useState();
  // useEffect(() => {
  //   AuthCheck();
  //   return () => AuthCheck();
  // }, [auth]);
  // const AuthCheck = onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     console.log("Welcome");
  //   } else {
  //     console.log("log in!");
  //   }
  // });
  const signOutWithGoogle = () => {
    signOut(auth);
    setIsLogin(false);
    setCurrentUser("");
    localStorage.setItem("isLogin", "no");
    localStorage.setItem("currentUser", "");
  };
  const signInWithGoogle = async () => {
    setAuthing(true);
    signInWithPopup(auth, new GoogleAuthProvider())
      .then(() => {
        setIsLogin(true);
        setAuthing(false);
        setCurrentUser(auth.currentUser);
        localStorage.setItem("isLogin", "yes");
        localStorage.setItem("currentUser", JSON.stringify(auth.currentUser));
        console.log(currentUser);
      })
      .catch((error) => {
        console.log(error);
        setAuthing(false);
        setIsLogin(false);
        localStorage.setItem("isLogin", "no");
        localStorage.setItem("currentUser", "");
      });
  };
  useEffect(() => {
    const isCurrentLogin = localStorage.getItem("isLogin");
    if (isCurrentLogin === "yes") setIsLogin(true);
    else setIsLogin(false);

    const currentUser = localStorage.getItem("currentUser");
    setCurrentUser(JSON.parse(currentUser || "{}"));

    if (currentUser === "{}") setIsLogin(false);
  }, []);
  return (
    <nav className="flex flex-row justify-between items-center p-5 bg-navGrey bottom-shadow min-w-full">
      <h1 className="text-mainBlue text-3xl font-bold ">stomachbook</h1>
      {isLogIn ? (
        <div className="flex flex-row">
          <img
            src={currentUser.photoURL}
            alt="avatar"
            className="w-16 h-16 rounded-full"
          />
          <span className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
            {currentUser.displayName}
          </span>
          ;
          <button
            onClick={() => {
              signOutWithGoogle();
            }}
            className="bg-mainBlue text-white px-3 py-1 rounded-lg"
          >
            Sign out
          </button>
        </div>
      ) : (
        <button
          onClick={() => {
            signInWithGoogle();
          }}
          disabled={authing}
        >
          <img
            src={require("./../assets/btn_google_signin_dark_normal_web.png")}
            alt="google auth"
          />
        </button>
      )}
    </nav>
  );
}
