import {Button} from "../ui/Button";
type Conversation = {
  id: number;
  title: string;
};

type SidebarProps = {
  conversations: Conversation[];
  activeConversationId: number;
  onSelectConversation: (id: number) => void;
  onNewChat: () => void;
};

export default function Sidebar({
  conversations,
  activeConversationId,
  onSelectConversation,
  onNewChat,
}: SidebarProps) {
  return (
    <div className="w-72 h-screen bg-slate-900 text-white flex flex-col">
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-2xl font-bold">BusinessFlow AI</h1>
        <p className="text-sm text-slate-400 mt-1">
          Your Business Assistant
        </p>
      </div>

      <div className="p-4">
        <Button
          onClick={onNewChat}
          className="w-full bg-blue-600 hover:bg-blue-700 rounded-lg py-3 font-medium transition"
        >
          + New Chat
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto px-4">
        <h2 className="text-sm text-slate-400 uppercase mb-3">
          Recent Chats
        </h2>

        <div className="space-y-2">
          {conversations.map((chat) => (
            <Button
              key={chat.id}
              onClick={() => onSelectConversation(chat.id)}
              className={`w-full text-left p-3 rounded-lg transition ${
                activeConversationId === chat.id
                  ? "bg-blue-600"
                  : "bg-slate-800 hover:bg-slate-700"
              }`}
            >
              {chat.title}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}