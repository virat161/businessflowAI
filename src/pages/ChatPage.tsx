import { useState } from "react";
import Sidebar from "../components/chat/Sidebar";
import ChatHeader from "../components/chat/ChatHeader";
import ChatMessages from "../components/chat/ChatMessages";
import ChatInput from "../components/chat/ChatInput";

type Message = {
  sender: "user" | "ai";
  message: string;
};

type Conversation = {
  id: number;
  title: string;
  messages: Message[];
};

export default function ChatPage() {
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: 1,
      title: "New Chat",
      messages: [
        {
          sender: "ai",
          message: "Hello! I am BusinessFlow AI. How can I help you today?",
        },
      ],
    },
  ]);

  const [activeConversationId, setActiveConversationId] = useState(1);
  const [isTyping, setIsTyping] = useState(false);

  const activeConversation = conversations.find(
    (chat) => chat.id === activeConversationId
  );

  const handleNewChat = () => {
    const newConversation: Conversation = {
      id: Date.now(),
      title: `New Chat ${conversations.length + 1}`,
      messages: [
        {
          sender: "ai",
          message: "Hello! I am BusinessFlow AI. How can I help you today?",
        },
      ],
    };

    setConversations((prev) => [...prev, newConversation]);
    setActiveConversationId(newConversation.id);
  };

  const handleSendMessage = (message: string) => {
    setConversations((prev) =>
      prev.map((chat) =>
        chat.id === activeConversationId
          ? {
              ...chat,
              messages: [
                ...chat.messages,
                {
                  sender: "user",
                  message,
                },
              ],
            }
          : chat
      )
    );

    setIsTyping(true);

    setTimeout(() => {
      setConversations((prev) =>
        prev.map((chat) =>
          chat.id === activeConversationId
            ? {
                ...chat,
                messages: [
                  ...chat.messages,
                  {
                    sender: "ai",
                    message:
                      "This is a fake AI response. Later we'll replace this with Gemini AI.",
                  },
                ],
              }
            : chat
        )
      );

      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="flex h-screen bg-slate-100">
      <Sidebar
        conversations={conversations}
        activeConversationId={activeConversationId}
        onSelectConversation={setActiveConversationId}
        onNewChat={handleNewChat}
      />

      <div className="flex-1 flex flex-col">
        <ChatHeader />

        <ChatMessages
          messages={activeConversation?.messages || []}
          isTyping={isTyping}
        />

        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}