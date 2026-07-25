import { useRef, useState } from "react";
import { SendHorizontal } from "lucide-react";

type ChatInputProps = {
  onSendMessage: (message: string) => void;
};

export default function ChatInput({
  onSendMessage,
}: ChatInputProps) {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (!input.trim()) return;

    onSendMessage(input);

    setInput("");

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setInput(e.target.value);

    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  return (
    <div className="border-t border-slate-200 bg-white p-4">
      <div className="max-w-4xl mx-auto">

        <div className="flex items-end rounded-2xl border border-slate-300 bg-white px-4 py-3 shadow-sm focus-within:ring-2 focus-within:ring-blue-500">

          <textarea
            ref={textareaRef}
            rows={1}
            value={input}
            onChange={handleChange}
            placeholder="Message BusinessFlow AI..."
            className="flex-1 resize-none overflow-hidden bg-transparent outline-none"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />

          <button
            onClick={handleSend}
            className="ml-3 rounded-xl bg-blue-600 p-3 text-white transition hover:bg-blue-700"
          >
            <SendHorizontal size={18} />
          </button>

        </div>

      </div>
    </div>
  );
}