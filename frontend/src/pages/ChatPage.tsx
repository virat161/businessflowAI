import { useEffect, useState } from "react";
import Sidebar from "../components/chat/Sidebar";
import ChatHeader from "../components/chat/ChatHeader";
import ChatMessages from "../components/chat/ChatMessages";
import ChatInput from "../components/chat/ChatInput";
import type { Conversation } from "../types/chat";
import { chatStorage } from "../services/chatStorage";

export default function ChatPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const stored = chatStorage.load();
    if (stored.length) {
      setConversations(stored);
      setActiveConversationId(stored[0].id);
    } else {
      const initial: Conversation = {
        id: crypto.randomUUID(),
        title: "New Chat",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        messages: [],
      };
      setConversations([initial]);
      setActiveConversationId(initial.id);
    }
  }, []);

  useEffect(() => {
    if (conversations.length) chatStorage.save(conversations);
  }, [conversations]);

  const activeConversation = conversations.find(c => c.id === activeConversationId);

  const handleNewChat = () => {
    const c: Conversation = {
      id: crypto.randomUUID(),
      title: `New Chat ${conversations.length + 1}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      messages: [],
    };
    setConversations(p => [...p, c]);
    setActiveConversationId(c.id);
  };

  const handleSendMessage = (message: string) => {
    if (!message.trim() || !activeConversationId) return;
    const id = activeConversationId;

    setConversations(prev => prev.map(chat => {
      if (chat.id !== id) return chat;
      const title = chat.title.startsWith("New Chat")
        ? (message.length > 30 ? message.slice(0,30) + "..." : message)
        : chat.title;

      return {
        ...chat,
        title,
        updatedAt: new Date().toISOString(),
        messages: [...chat.messages,{
          id: crypto.randomUUID(),
          sender:"user",
          message,
          createdAt:new Date().toISOString()
        }]
      };
    }));

    setIsTyping(true);

    setTimeout(() => {
      setConversations(prev => prev.map(chat =>
        chat.id === id ? {
          ...chat,
          updatedAt:new Date().toISOString(),
          messages:[...chat.messages,{
            id:crypto.randomUUID(),
            sender:"ai",
            message:"This is a fake AI response. Later we'll replace this with Gemini AI.",
            createdAt:new Date().toISOString()
          }]
        } : chat
      ));
      setIsTyping(false);
    },1500);
  };

  if (!activeConversation) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  return (
    <div className="flex h-screen bg-slate-100">
      <Sidebar
        conversations={conversations}
        activeConversationId={activeConversationId}
        onSelectConversation={setActiveConversationId}
        onNewChat={handleNewChat}
      />
      <div className="flex flex-1 flex-col">
        <ChatHeader />
        <ChatMessages
          messages={activeConversation.messages}
          isTyping={isTyping}
          onSuggestionClick={handleSendMessage}
        />
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}
