import React, { useEffect, useState } from "react";
import ChatMessage from "./ChatMessage";
import { db } from "../config/firebase";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import "./Chat.css";

export default function Chat({ user }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const messagesRef = collection(db, "messages");

  const handleSubmit = async () => {
    const date = new Date();
    await addDoc(messagesRef, {
      text,
      email: user.email,
      logo: user.photoUrl,
      name: user.displayName,
      date,
    });
    setText("");
    setTimeout(
      () =>
        document
          .querySelector("#copyright")
          .scrollIntoView({ behavior: "smooth" }),
      0.5
    );
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(messagesRef, (querySnapshot) => {
      const newMessages = querySnapshot.docs
        .map((doc) => doc.data())
        .sort((a, b) => a.date - b.date);
      setMessages(newMessages);
      setTimeout(
        () =>
          document
            .querySelector("#copyright")
            .scrollIntoView({ behavior: "smooth" }),
        0.5
      );
    });
    return () => unsubscribe();
  }, []);
  return (
<div>
  <div className="justify-content-center">
    <h2 className="text-primary">Chat App</h2>
  </div>
  <div className="row mt-4">
    <div className="col-xl-4 col-lg-4 col-sm-3 col-2"> </div>
    <div className="col-xl-4 col-lg-4 col-sm-6 col-8 chat-message">
      {messages.map((message) => (
        <ChatMessage {...message} user={user} />
      ))}

      {/* Input Box with Round Send Button on the Right */}
      <div className="position-relative">
        <input
          type="text"
          className="form-control rounded-pill pe-5" /* pe-5 adds padding for button space */
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="btn send-btn position-absolute" onClick={handleSubmit}>
          <i className="fas fa-paper-plane">Send</i>
        </button>
      </div>

      <div id="copyright" className="mt-3">
        Copyrights reserved John
      </div>
    </div>
  </div>
</div>




  
  );
}
