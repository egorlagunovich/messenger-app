import React from "react";
import { useState } from "react";
import Navbar from "./components/Navbar";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { config } from "./config/config";
import ChatBox from "./components/ChatBox";
import { getAuth } from "firebase/auth";
import Home from "./components/Home";
import Footer from "./components/Footer";

const app = initializeApp(config.firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);

function App() {
  const [currentAuth, setCurrentAuth] = useState(auth);
  const [isLogIn, setIsLogin] = useState(false);
  return (
    <div className="bg-homeGrey relative min-h-screen flex flex-col justify-normal items-center ">
      <Navbar
        setIsLogin={setIsLogin}
        isLogIn={isLogIn}
        // currentAuth={currentAuth}
      />
      {isLogIn ? <ChatBox /> : <Home />}
      <Footer />
    </div>
  );
}

export default App;
