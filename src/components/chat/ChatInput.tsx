import { useState } from "react";

type ChatInputProps = {
  onSendMessage: (message: string) => void;
};

export default function ChatInput({ onSendMessage }: ChatInputProps) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() === "") return;

    onSendMessage(input);
    setInput("");
  };

  return (
    <div className="border-t border-slate-200 bg-white p-4">
      <div className="max-w-4xl mx-auto flex items-center gap-3">
        <input
          type="text"
          placeholder="Message BusinessFlow AI..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 px-5 py-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
        />

        <button
          onClick={handleSend}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}