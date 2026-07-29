export default function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-md px-5 py-4 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>

          <span
            className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></span>

          <span
            className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
            style={{ animationDelay: "0.4s" }}
          ></span>
        </div>
      </div>
    </div>
  );
}