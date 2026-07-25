import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";

type Message = {
  sender: "user" | "ai";
  message: string;
};

type ChatMessagesProps = {
  messages: Message[];
  isTyping: boolean;
};

export default function ChatMessages({
  messages,
  isTyping,
}: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isTyping]);

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-slate-50">
      <div className="max-w-4xl mx-auto space-y-6">
        {messages.map((msg, index) => (
          <MessageBubble
            key={index}
            sender={msg.sender}
            message={msg.message}
          />
        ))}

        {isTyping && <TypingIndicator />}

        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}