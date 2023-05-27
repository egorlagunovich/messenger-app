import React from "react";
import Navbar from "./components/navbar/Navbar";
import { initializeApp } from "firebase/app";
import { config } from "./config/config";

initializeApp(config.firebaseConfig);

function App() {
  return (
    <div className="App">
      <Navbar />
    </div>
  );
}

export default App;
