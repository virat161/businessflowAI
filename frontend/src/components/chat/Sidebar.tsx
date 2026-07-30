import { Plus, MessageSquare, Trash2 } from "lucide-react";
import type { Conversation } from "../../types/chat";

type SidebarProps = {
  conversations: Conversation[];
  activeConversationId: number | null;
  onSelectConversation: (id: number) => void;
  onNewChat: () => void;
  onDeleteConversation: (id: number) => void;
};

export default function Sidebar({
  conversations,
  activeConversationId,
  onSelectConversation,
  onNewChat,
  onDeleteConversation,
}: SidebarProps) {
  return (
    <aside className="w-72 bg-slate-900 text-white flex flex-col">
      {/* New Chat Button */}
      <div className="p-4 border-b border-slate-800">
        <button
          onClick={onNewChat}
          className="w-full flex items-center justify-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition px-4 py-3 font-medium"
        >
          <Plus className="h-4 w-4" />
          New Chat
        </button>
      </div>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {conversations.map((conversation) => (
          <div
            key={conversation.id}
            onClick={() => onSelectConversation(conversation.id)}
            className={`group flex items-start justify-between rounded-lg px-3 py-3 cursor-pointer transition ${
              activeConversationId === conversation.id
                ? "bg-slate-700"
                : "hover:bg-slate-800"
            }`}
          >
            <div className="flex gap-3 min-w-0">
              <MessageSquare className="h-4 w-4 mt-1 shrink-0" />

              <div className="min-w-0">
                <p className="truncate text-sm font-medium">
                  {conversation.title}
                </p>

                <p className="text-xs text-slate-400">
                  {new Date(conversation.updated_at).toLocaleDateString()}
                </p>
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();

                onDeleteConversation(conversation.id);
              }}
              className="opacity-0 group-hover:opacity-100 transition p-1 rounded hover:bg-red-500/20"
            >
              <Trash2 className="h-4 w-4 text-red-400 hover:text-red-500" />
            </button>
          </div>
        ))}
      </div>
    </aside>
  );
}