import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { FaArrowDown } from "react-icons/fa";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

import Navbar from "../components/Navbar";
import api from "../api/api";

function Chat() {
  const { receiverId } = useParams();

  const loggedUser = JSON.parse(localStorage.getItem("user"));

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [receiver, setReceiver] = useState(null);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const inputRef = useRef(null);
  const bottomRef = useRef(null);
  const chatRef = useRef(null);
  const stompClient = useRef(null);

  // Load old conversation
  const loadMessages = async () => {
    try {
      const res = await api.get(
        `/messages/${loggedUser.id}/${receiverId}`
      );

      setMessages(res.data);

      setTimeout(() => {
        scrollToBottom(false);
      }, 100);
    } catch (err) {
      console.error(err);
    }
  };

  // Load receiver
  const loadReceiver = async () => {
    try {
      const res = await api.get(`/users/${receiverId}`);
      setReceiver(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadMessages();
    loadReceiver();
  }, [receiverId]);

  // WebSocket Connection
  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/chat");

    stompClient.current = new Client({
      webSocketFactory: () => socket,

      reconnectDelay: 5000,

      onConnect: () => {
        console.log("✅ Connected");

        stompClient.current.subscribe(
          "/topic/messages",
          (message) => {
            const newMessage = JSON.parse(message.body);

            if (
              (newMessage.senderId === loggedUser.id &&
                newMessage.receiverId === Number(receiverId)) ||
              (newMessage.senderId === Number(receiverId) &&
                newMessage.receiverId === loggedUser.id)
            ) {
              setMessages((prev) => [...prev, newMessage]);

              const container = chatRef.current;

              if (!container) return;

              const distance =
                container.scrollHeight -
                container.scrollTop -
                container.clientHeight;

              if (distance < 80) {
                setTimeout(() => {
                  scrollToBottom(false);
                }, 100);
              } else {
                setShowScrollButton(true);
              }
            }
          }
        );
      },
    });

    stompClient.current.activate();

    return () => {
      stompClient.current?.deactivate();
    };
  }, [receiverId]);

  // Detect scrolling
  useEffect(() => {
    const container = chatRef.current;

    if (!container) return;

    const handleScroll = () => {
      const distance =
        container.scrollHeight -
        container.scrollTop -
        container.clientHeight;

      setShowScrollButton(distance > 80);
    };

    container.addEventListener("scroll", handleScroll);

    return () =>
      container.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  const scrollToBottom = (smooth = true) => {
    bottomRef.current?.scrollIntoView({
      behavior: smooth ? "smooth" : "auto",
    });

    setShowScrollButton(false);
  };

  const sendMessage = () => {
    if (text.trim() === "") return;

    if (!stompClient.current?.connected) return;

    stompClient.current.publish({
      destination: "/app/send",
      body: JSON.stringify({
        senderId: loggedUser.id,
        receiverId: Number(receiverId),
        message: text,
      }),
    });

    setText("");

    inputRef.current?.focus();

    setTimeout(() => {
      scrollToBottom();
    }, 100);
  };
  return (
  <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950 text-white">
    <Navbar />

    <div className="max-w-4xl mx-auto pt-32 px-6">

      {/* Header */}
      <div className="flex items-center gap-4 mb-8 bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/10">

        <div className="w-14 h-14 rounded-full bg-cyan-500 flex items-center justify-center text-xl font-bold">
          {receiver?.name
            ? receiver.name.charAt(0).toUpperCase()
            : "U"}
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            {receiver?.name || "Loading..."}
          </h1>

          <p className="text-gray-400">
            SkillSwap User
          </p>
        </div>

      </div>

      {/* Chat Container */}
      <div className="relative">

        <div
          ref={chatRef}
          className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/10 h-[500px] overflow-y-auto p-6"
        >

          {messages.length === 0 && (
            <div className="flex justify-center items-center h-full text-gray-400">
              Start your conversation 👋
            </div>
          )}

          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`mb-4 flex ${
                msg.senderId === loggedUser.id
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`max-w-sm px-4 py-3 rounded-2xl shadow-lg ${
                  msg.senderId === loggedUser.id
                    ? "bg-cyan-500 text-white"
                    : "bg-slate-700 text-white"
                }`}
              >
                <p className="break-words">
                  {msg.message}
                </p>

                <p className="text-xs text-right opacity-70 mt-2">
                  {msg.time}
                </p>
              </div>
            </div>
          ))}

          <div ref={bottomRef}></div>

        </div>

        {/* Scroll Down Button */}
        {showScrollButton && (
          <button
            onClick={() => scrollToBottom()}
            className="absolute bottom-6 left-1/2 -translate-x-1/2
                       w-12 h-12 rounded-full
                       bg-cyan-500 hover:bg-cyan-600
                       shadow-2xl
                       flex items-center justify-center
                       text-white
                       animate-bounce
                       transition-all duration-300"
          >
            <FaArrowDown />
          </button>
        )}

      </div>
            {/* Message Input */}
      <div className="flex gap-4 mt-6">

        <input
          ref={inputRef}
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              sendMessage();
            }
          }}
          placeholder="Type a message..."
          className="flex-1 bg-white/10 backdrop-blur-xl border border-white/10 rounded-xl px-5 py-3 outline-none focus:border-cyan-400"
        />

        <button
          onClick={sendMessage}
          className="bg-cyan-500 hover:bg-cyan-600 px-8 rounded-xl font-semibold transition"
        >
          Send
        </button>

      </div>

    </div>
  </div>
);

}

export default Chat;