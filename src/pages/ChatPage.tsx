import { useState } from "react";
import Sidebar from "../components/chat/Sidebar";
import ChatHeader from "../components/chat/ChatHeader";
import ChatMessages from "../components/chat/ChatMessages";
import ChatInput from "../components/chat/ChatInput";

type Message = {
  sender: "user" | "ai";
  message: string;
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "ai",
      message: "Hello! I am BusinessFlow AI. How can I help you today?",
    },
  ]);

  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = (message: string) => {
    // User Message
    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        message,
      },
    ]);

    // Typing Start
    setIsTyping(true);

    // Fake AI Reply
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          message:
            "This is a fake AI response. Later we'll replace this with Gemini AI.",
        },
      ]);

      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="flex h-screen bg-slate-100">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <ChatHeader />

        <ChatMessages
          messages={messages}
          isTyping={isTyping}
        />

        <ChatInput
          onSendMessage={handleSendMessage}
        />
      </div>
    </div>
  );
}