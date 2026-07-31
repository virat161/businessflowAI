import { MessageSquare, FileText, Mail, Brain, Bell, User } from "lucide-react";
import {Link} from "react-router-dom";
const cards = [
  {
    title: "AI Chat",
    desc: "Ask AI anything related to your work.",
    icon: MessageSquare,
    path: "/chat"
  },
  {
    title: "PDF Summarizer",
    desc: "Upload PDFs and get concise summaries.",
    icon: FileText,
    path: "/pdf"
  },
  {
    title: "Email Generator",
    desc: "Generate professional email replies.",
    icon: Mail,
    path: "/reply"
  },
  {
    title: "Business Memory",
    desc: "AI remembers previous business context.",
    icon: Brain,
    path: "/memory"
  },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-100">

      {/* Navbar */}

      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          <h1 className="text-2xl font-bold text-blue-600">
            BusinessFlow AI
          </h1>

          <div className="flex items-center gap-5">

            <Bell className="w-5 h-5 text-gray-600 cursor-pointer" />

            <div className="flex items-center gap-2">

              <User className="w-6 h-6 text-gray-600" />

              <span className="font-medium">
                Virat
              </span>

            </div>

          </div>

        </div>
      </header>

      {/* Main */}

      <main className="max-w-7xl mx-auto px-6 py-8">

        <h2 className="text-4xl font-bold">
          Welcome Back 👋
        </h2>

        <p className="text-gray-500 mt-2">
          Manage all your AI tools from one dashboard.
        </p>

        {/* Cards */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">

          {cards.map((card) => {
            const Icon = card.icon;

            return (
              <Link 
                to={card.path}
                key={card.title}
                className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition cursor-pointer"
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