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

  const handleSendMessage = (message: string) => {
    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        message,
      },
    ]);
  };

  return (
    <div className="flex h-screen bg-slate-100">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <ChatHeader />

        <ChatMessages messages={messages} />

        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}