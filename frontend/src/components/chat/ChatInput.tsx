import { useState,type KeyboardEvent } from "react";
import { SendHorizontal } from "lucide-react";
import { Button } from "../ui/Button";

type ChatInputProps = {
  onSendMessage: (message: string) => void;
};

export default function ChatInput({ onSendMessage }: ChatInputProps) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;

    onSendMessage(message.trim());
    setMessage("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t bg-white px-6 py-4">
      <div className="flex items-end gap-3 rounded-2xl border border-slate-300 bg-white px-4 py-3 shadow-sm focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200 transition">
        <textarea
          rows={1}
          value={message}
          placeholder="Message BusinessFlow AI..."
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 resize-none bg-transparent text-[15px] outline-none placeholder:text-slate-400 max-h-40"
        />

        <Button
  size="icon"
  onClick={handleSend}
  disabled={!message.trim()}
  className="shrink-0 rounded-xl bg-blue-600 hover:bg-blue-700 text-white disabled:bg-slate-400"
>
          <SendHorizontal className="size-4" />
        </Button>
      </div>
    </div>
  );
}