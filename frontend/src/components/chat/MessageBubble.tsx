type MessageBubbleProps = {
  message: string;
  sender: "user" | "ai";
};

export default function MessageBubble({
  message,
  sender,
}: MessageBubbleProps) {
  const isUser = sender === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-xl px-5 py-3 rounded-2xl ${
          isUser
            ? "bg-blue-600 text-white rounded-br-md"
            : "bg-white border border-slate-200 shadow-sm rounded-bl-md"
        }`}
      >
        {message}
      </div>
    </div>
  );
}