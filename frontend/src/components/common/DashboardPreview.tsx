import {
  MessageSquare,
  FileText,
  Mail,
  Brain,
  BarChart3,
  Bell,
  User,
} from "lucide-react";

export default function DashboardPreview() {
  return (
    <section className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">

          <span className="text-blue-600 font-semibold uppercase tracking-widest">
            Dashboard Preview
          </span>

          <h2 className="text-5xl font-bold mt-4">
            Everything in one dashboard
          </h2>

          <p className="text-gray-500 text-lg mt-6 max-w-2xl mx-auto">
            Chat with AI, summarize PDFs, generate emails and manage your
            business workflows from one beautiful workspace.
          </p>

        </div>

        <div className="mt-20 rounded-3xl overflow-hidden border border-gray-200 shadow-2xl bg-white">

          <div className="grid lg:grid-cols-[260px_1fr]">

            {/* Sidebar */}

            <aside className="bg-slate-900 text-white p-6">

              <h3 className="text-2xl font-bold text-blue-400">
                BusinessFlow AI
              </h3>

              <div className="space-y-4 mt-10">

                <div className="flex items-center gap-3 bg-blue-600 px-4 py-3 rounded-xl">
                  <BarChart3 size={20} />
                  Dashboard
                </div>

                <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800">
                  <MessageSquare size={20} />
                  AI Chat
                </div>

                <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800">
                  <FileText size={20} />
                  PDF Summary
                </div>

                <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800">
                  <Mail size={20} />
                  Email Generator
                </div>

                <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800">
                  <Brain size={20} />
                  Business Memory
                </div>

              </div>

            </aside>

            {/* Main */}

            <div className="bg-slate-100 p-8">

              {/* Top */}

              <div className="flex justify-between items-center">

                <div>

                  <h3 className="text-3xl font-bold">
                    Welcome Back 👋
                  </h3>

                  <p className="text-gray-500 mt-2">
                    Your AI workforce is ready.
                  </p>

                </div>

                <div className="flex items-center gap-4">

                  <Bell className="text-gray-600" />

                  <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow">

                    <User size={18} />

                    <span>Virat</span>

                  </div>

                </div>

              </div>

              {/* Cards */}

              <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5 mt-10">

                <Card
                  icon={<MessageSquare className="text-blue-600" />}
                  title="AI Chat"
                  value="127"
                />

                <Card
                  icon={<FileText className="text-green-600" />}
                  title="PDFs"
                  value="43"
                />

                <Card
                  icon={<Mail className="text-purple-600" />}
                  title="Emails"
                  value="92"
                />

                <Card
                  icon={<Brain className="text-pink-600" />}
                  title="Memory"
                  value="Active"
                />

              </div>

              {/* Bottom */}

              <div className="grid lg:grid-cols-3 gap-6 mt-8">

                {/* Chat */}

                <div className="lg:col-span-2 bg-white rounded-2xl shadow p-6">

                  <h4 className="font-semibold text-lg">
                    AI Conversation
                  </h4>

                  <div className="mt-6 space-y-4">

                    <div className="bg-slate-100 rounded-xl p-4 w-fit">
                      Summarize my quarterly report.
                    </div>

                    <div className="bg-blue-600 text-white rounded-xl p-4 ml-auto w-fit max-w-sm">
                      Sure! Your report highlights a 24% revenue increase,
                      strongest growth in Q3 and improved customer retention.
                    </div>

                  </div>

                </div>

                {/* Activity */}

                <div className="bg-white rounded-2xl shadow p-6">

                  <h4 className="font-semibold text-lg">
                    Recent Activity
                  </h4>

                  <div className="space-y-5 mt-6">

                    <Activity text="PDF summarized" />

                    <Activity text="Email generated" />

                    <Activity text="Memory updated" />

                    <Activity text="AI chat completed" />

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

function Card({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="bg-white rounded-2xl shadow p-6">

      <div className="flex justify-between items-center">

        {icon}

        <span className="text-2xl font-bold">
          {value}
        </span>

      </div>

      <p className="text-gray-500 mt-5">
        {title}
      </p>

    </div>
  );
}

function Activity({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3">

      <div className="w-3 h-3 rounded-full bg-blue-600"></div>

      <span className="text-gray-600">
        {text}
      </span>

    </div>
  );
}