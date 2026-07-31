import {
  MessageSquare,
  FileText,
  Mail,
  Brain,
} from "lucide-react";

const cards = [
  {
    title: "AI Chat",
    desc: "Ask AI anything related to your work.",
    icon: MessageSquare,
  },
  {
    title: "PDF Summarizer",
    desc: "Upload PDFs and get concise summaries.",
    icon: FileText,
  },
  {
    title: "Email Generator",
    desc: "Generate professional email replies.",
    icon: Mail,
  },
  {
    title: "Business Memory",
    desc: "AI remembers previous business context.",
    icon: Brain,
  },
];

export default function DashboardPreview() {
  return (
    <section className="py-28 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}

        <div className="text-center">

          <span className="text-blue-600 font-semibold uppercase tracking-widest">
            Dashboard Preview
          </span>

          <h2 className="text-5xl font-bold mt-4">
            Everything in one dashboard
          </h2>

          <p className="text-gray-500 text-lg mt-6 max-w-2xl mx-auto">
            Chat with AI, summarize PDFs, generate email replies and manage
            every AI workflow from one beautiful workspace.
          </p>

        </div>

        {/* Dashboard Mockup */}

        <div className="mt-20 rounded-3xl overflow-hidden border border-slate-200 shadow-2xl">

          {/* Browser Bar */}

          <div className="bg-slate-800 px-6 py-3 flex items-center gap-2">

            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-400"></div>

            <div className="ml-6 bg-slate-700 rounded-full px-4 py-1 text-xs text-slate-300">
              app.businessflow.ai/dashboard
            </div>

          </div>

          {/* Dashboard */}

          <div className="bg-slate-100 pointer-events-none select-none">

            {/* Navbar */}

            <header className="bg-white border-b shadow-sm">

              <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">

                <h1 className="text-2xl font-bold text-blue-600">
                  BusinessFlow AI
                </h1>

                <div className="text-sm text-slate-400 font-medium">
                  Dashboard Preview
                </div>

              </div>

            </header>

            {/* Main */}

            <main className="px-8 py-10">

              <h2 className="text-4xl font-bold">
                Welcome Back 👋
              </h2>

              <p className="text-slate-500 mt-2">
                Manage all your AI tools from one dashboard.
              </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">

                {cards.map((card) => {
                  const Icon = card.icon;

                  return (

                    <div
                      key={card.title}
                      className="bg-white rounded-2xl p-6 shadow"
                    >

                      <Icon className="w-10 h-10 text-blue-600 mb-5" />

                      <h3 className="text-xl font-semibold">
                        {card.title}
                      </h3>

                      <p className="text-slate-500 mt-2">
                        {card.desc}
                      </p>

                    </div>

                  );
                })}

              </div>

            </main>

          </div>

        </div>

      </div>

    </section>
  );
}