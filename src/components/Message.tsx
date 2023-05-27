import { DocumentData } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import React from "react";
import { auth } from "../App";

interface MessagesProps {
  message: DocumentData;
}

export default function Message({ message }: MessagesProps) {
  const [user] = useAuthState(auth);
  const uid = user ? "user.id" : "";

  return (
    <div className={`chat-bubble ${message.uid === uid ? "right" : ""}`}>
      <img
        className="chat-bubble__left"
        src={message.avatar}
        alt="user avatar"
      />
      <div className="chat-bubble__right">
        <p className="user-name">{message.name}</p>
        <p className="user-message">{message.text}</p>
      </div>
    </div>
  );
}
