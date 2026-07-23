export default function Sidebar() {
  return (
    <div className="w-72 h-screen bg-slate-900 text-white flex flex-col">

      <div className="p-6 border-b border-slate-700">
        <h1 className="text-2xl font-bold">BusinessFlow AI</h1>
        <p className="text-sm text-slate-400 mt-1">
          Your Business Assistant
        </p>
      </div>

      <div className="p-4">
        <button className="w-full bg-blue-600 hover:bg-blue-700 rounded-lg py-3 font-medium transition">
          + New Chat
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4">
        <h2 className="text-sm text-slate-400 uppercase mb-3">
          Recent Chats
        </h2>

        <div className="space-y-2">
          <div className="p-3 rounded-lg bg-slate-800 hover:bg-slate-700 cursor-pointer">
            Marketing Strategy
          </div>

          <div className="p-3 rounded-lg bg-slate-800 hover:bg-slate-700 cursor-pointer">
            Sales Report
          </div>

          <div className="p-3 rounded-lg bg-slate-800 hover:bg-slate-700 cursor-pointer">
            Business Plan
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-slate-700">
        <button className="w-full bg-red-600 hover:bg-red-700 rounded-lg py-3 transition">
          Logout
        </button>
      </div>

    </div>
  );
}