import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/chat/Sidebar";
import ChatHeader from "../components/chat/ChatHeader";
import ChatMessages from "../components/chat/ChatMessages";
import ChatInput from "../components/chat/ChatInput";
import type { Conversation } from "../types/chat";
import {
  createConversation,
  getConversations,
  sendChatMessage,
  updateConversation,
  deleteConversation,
  clearConversation,
} from "../services/api";

function getApiErrorMessage(error: unknown, fallback: string) {
  if (axios.isAxiosError<{ detail?: unknown }>(error)) {
    const detail = error.response?.data?.detail;

    if (typeof detail === "string") return detail;
  }

  return fallback;
}

export default function ChatPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<number | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadConversations = async () => {
      try {
        const savedConversations = await getConversations();

        if (!isMounted) return;

        if (savedConversations.length) {
          setConversations(savedConversations);
          setActiveConversationId(savedConversations[0].id);
          return;
        }

        const conversation = await createConversation("New Chat");

        if (isMounted) {
          setConversations([conversation]);
          setActiveConversationId(conversation.id);
        }
      } catch (loadError) {
        console.error("Failed to load conversations:", loadError);

        if (isMounted) {
          setError(getApiErrorMessage(
            loadError,
            "Could not connect to the BusinessFlow API. Start the backend and try again.",
          ));
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    void loadConversations();

    return () => {
      isMounted = false;
    };
  }, []);

  const activeConversation = conversations.find(
    (conversation) => conversation.id === activeConversationId,
  );

  const handleNewChat = async () => {
    try {
      setError(null);
      const conversation = await createConversation("New Chat");

      setConversations((previous) => [conversation, ...previous]);
      setActiveConversationId(conversation.id);
    } catch (createError) {
      console.error("Failed to create conversation:", createError);
      setError(getApiErrorMessage(
        createError,
        "Could not create a new chat. Please try again.",
      ));
    }
  };
  const handleDeleteConversation = async (id: number) => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this conversation?"
  );

  if (!confirmed) return;

  try {
    await deleteConversation(id);

    const updatedConversations = conversations.filter(
      (conversation) => conversation.id !== id
    );

    setConversations(updatedConversations);

    if (activeConversationId === id) {
      if (updatedConversations.length > 0) {
        setActiveConversationId(updatedConversations[0].id);
      } else {
        const newConversation = await createConversation("New Chat");

        setConversations([newConversation]);

        setActiveConversationId(newConversation.id);
      }
    }
  } catch (error) {
    console.error(error);

    alert("Failed to delete conversation.");
  }
};
const handleClearChat = async () => {
  if (!activeConversationId) return;

  const confirmed = window.confirm(
    "Clear all messages from this chat?"
  );

  if (!confirmed) return;

  try {
    await clearConversation(activeConversationId);

    setConversations((previous) =>
      previous.map((conversation) =>
        conversation.id === activeConversationId
          ? {
              ...conversation,
              messages: [],
            }
          : conversation
      )
    );
  } catch (error) {
    console.error(error);

    alert("Failed to clear chat.");
  }
};
  const handleSendMessage = async (message: string) => {
    if (!message.trim() || !activeConversationId) return;
    const conversationId = activeConversationId;
    const trimmedMessage = message.trim();
    const shouldUpdateTitle = activeConversation?.title === "New Chat";
    const title = trimmedMessage.length > 30
      ? `${trimmedMessage.slice(0, 30)}...`
      : trimmedMessage;

    setError(null);
    setIsTyping(true);

    try {
      const chatResponse = await sendChatMessage(
        conversationId,
        trimmedMessage,
      );
      const updatedConversation = shouldUpdateTitle
        ? await updateConversation(conversationId, title)
        : null;

      setConversations((previous) => previous.map((conversation) => (
        conversation.id === conversationId
          ? {
              ...conversation,
              title: updatedConversation?.title ?? conversation.title,
              updated_at: updatedConversation?.updated_at
                ?? chatResponse.assistant_message.created_at,
              messages: [
                ...conversation.messages,
                chatResponse.user_message,
                chatResponse.assistant_message,
              ],
            }
          : conversation
      )));
    } catch (sendError) {
      console.error("Failed to send message:", sendError);
      setError(getApiErrorMessage(
        sendError,
        "Your message could not be saved. Please try again.",
      ));
    } finally {
      setIsTyping(false);
    }
  };

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  if (error && !activeConversation) {
    return (
      <div className="flex h-screen items-center justify-center px-6 text-center text-red-600">
        {error}
      </div>
    );
  }

  if (!activeConversation) return null;

  return (
    <div className="flex h-screen bg-slate-100">
      <Sidebar
        conversations={conversations}
        activeConversationId={activeConversationId}
        onSelectConversation={setActiveConversationId}
        onNewChat={handleNewChat}
        onDeleteConversation={handleDeleteConversation}
      />
      <div className="flex flex-1 flex-col">
        <ChatHeader 
          onClearChat={handleClearChat}
        />
        {error && (
          <p className="border-b border-red-200 bg-red-50 px-6 py-3 text-sm text-red-700">
            {error}
          </p>
        )}
        <ChatMessages
          messages={activeConversation.messages}
          isTyping={isTyping}
          
        />
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}
