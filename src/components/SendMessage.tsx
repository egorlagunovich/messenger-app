import React, { useState } from "react";
import { auth, db } from "./../App";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export default function SendMessage() {
  const [currentMessage, setCurrentMessage] = useState<string>("");
  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentMessage.trim().length === 0) {
      alert("enter valid message");
      return;
    }
    const { currentUser } = auth;
    if (currentUser) {
      const uid = currentUser.uid;
      const displayName = currentUser.displayName;
      const photoURL = currentUser.photoURL;
      await addDoc(collection(db, "messages"), {
        text: currentMessage,
        name: displayName,
        avatar: photoURL,
        createdAt: serverTimestamp(),
        uid,
      });
    }
    setCurrentMessage("");
  };
  return (
    <form onSubmit={(e) => sendMessage(e)} className="mb-10 send-message">
      <input
        type="text"
        placeholder="Type message.."
        value={currentMessage}
        className="form-input__input"
        onChange={(e) => {
          setCurrentMessage(e.target.value);
        }}
      />
      <button type="submit">Send</button>
    </form>
  );
}
