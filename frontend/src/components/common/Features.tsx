import {
  Bot,
  Mail,
  FileText,
  MessageSquare,
  Shield,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: Bot,
    title: "AI Assistant",
    desc: "Smart AI that helps you complete business tasks faster.",
  },
  {
    icon: Mail,
    title: "Email Reply Generator",
    desc: "Generate professional email replies in seconds.",
  },
  {
    icon: FileText,
    title: "PDF Summarizer",
    desc: "Upload PDFs and get concise AI-generated summaries.",
  },
  {
    icon: MessageSquare,
    title: "AI Chat",
    desc: "Chat with documents and your business knowledge.",
  },
  {
    icon: Shield,
    title: "Secure",
    desc: "Your business data stays protected and encrypted.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    desc: "Instant AI responses with optimized performance.",
  },
];

export default function Features() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center">
          Everything your business needs
        </h2>

        <p className="text-center text-gray-600 mt-4">
          Powerful AI tools designed to automate your daily workflow.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition"
              >
                <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center">
                  <Icon className="text-blue-600" size={28} />
                </div>

                <h3 className="text-xl font-bold mt-6">
                  {feature.title}
                </h3>

                <p className="text-gray-600 mt-3">
                  {feature.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}