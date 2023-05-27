import { useEffect, useRef, useState } from "react";
import {
  query,
  collection,
  orderBy,
  onSnapshot,
  limit,
  QuerySnapshot,
  DocumentData,
} from "firebase/firestore";
import { db } from "./../App";
import Message from "./Message";
import SendMessage from "./SendMessage";

interface Messages {
  data?: DocumentData;
  id: string;
}

export default function ChatBox() {
  const [initialMessages, setInitialMessages] = useState<Messages[]>([]);
  useEffect(() => {
    const q = query(
      collection(db, "messages"),
      orderBy("createdAt"),
      limit(50)
    );

    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let messages: Messages[] = [];
      QuerySnapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setInitialMessages(messages);
    });
    return () => unsubscribe();
  }, []);

  return (
    <main>
      <div>
        {initialMessages?.map((message) => (
          <Message key={message.id} message={message} />
        ))}
      </div>
      <SendMessage />
    </main>
  );
}
