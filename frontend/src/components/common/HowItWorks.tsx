import {
  Bot,
  Upload,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "Upload",
    description:
      "Upload PDFs, emails or documents in seconds.",
  },
  {
    icon: Bot,
    title: "AI Processes",
    description:
      "BusinessFlow AI analyzes everything automatically.",
  },
  {
    icon: Sparkles,
    title: "Generate Results",
    description:
      "Summaries, replies and insights are generated instantly.",
  },
  {
    icon: CheckCircle2,
    title: "Save Time",
    description:
      "Complete hours of work within minutes.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-28 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">

          <span className="text-blue-600 font-semibold uppercase tracking-wider">
            Workflow
          </span>

          <h2 className="text-5xl font-bold mt-4">
            How It Works
          </h2>

          <p className="text-gray-500 mt-5 text-lg">
            Four simple steps to automate your business.
          </p>

        </div>

        <div className="grid md:grid-cols-4 gap-8 mt-20">

          {steps.map((step, index) => (
            <div
              key={step.title}
              className="relative rounded-3xl border bg-white p-8 shadow-sm hover:shadow-xl transition"
            >

              <div className="absolute -top-4 -left-4 h-10 w-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                {index + 1}
              </div>

              <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center mb-6">
                <step.icon className="text-blue-600 w-7 h-7" />
              </div>

              <h3 className="font-bold text-2xl">
                {step.title}
              </h3>

              <p className="text-gray-500 mt-4 leading-7">
                {step.description}
              </p>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}