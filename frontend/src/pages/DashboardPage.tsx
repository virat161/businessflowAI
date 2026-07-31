import {
  MessageSquare,
  FileText,
  Mail,
  Brain,
  Bell,
  User,
  LogOut,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";
import { getCurrentUser, logout } from "../services/authServices";

const cards = [
  {
    title: "AI Chat",
    desc: "Ask AI anything related to your work.",
    icon: MessageSquare,
    path: "/chat",
  },
  {
    title: "PDF Summarizer",
    desc: "Upload PDFs and get concise summaries.",
    icon: FileText,
    path: "/pdf",
  },
  {
    title: "Email Generator",
    desc: "Generate professional business emails.",
    icon: Mail,
    path: "/reply",
  },
  {
    title: "Business Memory",
    desc: "AI remembers previous business context.",
    icon: Brain,
    path: "/memory",
  },
];

export default function DashboardPage() {
  const navigate = useNavigate();

  const user = getCurrentUser();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-100">

      {/* Navbar */}

      <header className="bg-white border-b shadow-sm">

        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          <h1 className="text-3xl font-bold text-blue-600">
            BusinessFlow AI
          </h1>

          <div className="flex items-center gap-6">

            <Bell className="w-5 h-5 text-gray-600 cursor-pointer" />

            <div className="flex items-center gap-2">

              <User className="w-6 h-6 text-gray-600" />

              <span className="font-medium">
                {user?.full_name || "User"}
              </span>

            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
            >
              <LogOut size={18} />
              Logout
            </button>

          </div>

        </div>

      </header>

      {/* Main */}

      <main className="max-w-7xl mx-auto px-6 py-8">

        <h2 className="text-5xl font-bold">
          Welcome Back 👋
        </h2>

        <p className="text-gray-500 mt-2 text-lg">
          Manage all your AI tools from one dashboard.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">

          {cards.map((card) => {
            const Icon = card.icon;

            return (
              <Link
                key={card.title}
                to={card.path}
                className="bg-white rounded-2xl p-6 shadow hover:shadow-xl transition duration-300"
              >
                <Icon className="w-10 h-10 text-blue-600 mb-5" />

                <h3 className="text-xl font-semibold">
                  {card.title}
                </h3>

                <p className="text-gray-500 mt-2">
                  {card.desc}
                </p>
              </Link>
            );
          })}

        </div>

      </main>

    </div>
  );
}