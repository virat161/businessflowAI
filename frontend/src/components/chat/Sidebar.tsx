import { Plus, MessageSquare } from "lucide-react";
import type { Conversation } from "../../types/chat";

type SidebarProps = {
  conversations: Conversation[];
  activeConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onNewChat: () => void;
};

export default function Sidebar({
  conversations,
  activeConversationId,
  onSelectConversation,
  onNewChat,
}: SidebarProps) {
  return (
    <aside className="w-72 bg-slate-900 text-white flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-slate-800">
        <button
          onClick={onNewChat}
          className="w-full flex items-center justify-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition px-4 py-3 font-medium"
        >
          <Plus className="h-4 w-4" />
          New Chat
        </button>
      </div>

      {/* Conversations */}
      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {conversations.map((conversation) => (
          <button
            key={conversation.id}
            onClick={() => onSelectConversation(conversation.id)}
            className={`w-full text-left rounded-lg px-3 py-3 transition flex items-start gap-3 ${
              activeConversationId === conversation.id
                ? "bg-slate-700"
                : "hover:bg-slate-800"
            }`}
          >
            <MessageSquare className="h-4 w-4 mt-1 shrink-0" />

            <div className="min-w-0">
              <p className="truncate text-sm font-medium">
                {conversation.title}
              </p>

              <p className="text-xs text-slate-400">
                {new Date(conversation.updatedAt).toLocaleDateString()}
              </p>
            </div>
          </button>
        ))}
      </div>
    </aside>
  );
}