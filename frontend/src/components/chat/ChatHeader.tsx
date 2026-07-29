export default function ChatHeader() {
  return (
    <div className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-6">
      <div>
        <h2 className="text-xl font-semibold text-slate-800">
          BusinessFlow AI
        </h2>
        <p className="text-sm text-slate-500">
          Ask anything about your business
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 transition">
          Clear Chat
        </button>
      </div>
    </div>
  );
}