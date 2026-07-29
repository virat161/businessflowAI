import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Cta() {
  return (
    <section className="bg-blue-600 py-28">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <span className="font-semibold uppercase tracking-widest text-blue-100">
          Start Today
        </span>

        <h2 className="mt-6 text-5xl font-bold text-white">
          Ready to Build Your AI Workforce?
        </h2>

        <p className="mx-auto mt-6 max-w-3xl text-xl text-blue-100">
          Chat with AI, summarize PDFs, generate professional email replies and
          automate repetitive business tasks from one beautiful dashboard.
        </p>

        <div className="mt-12 flex flex-wrap justify-center gap-5">
          <Link
            to="/signup"
            className="flex items-center gap-2 rounded-xl bg-white px-8 py-4 font-semibold text-blue-600 transition hover:scale-105"
          >
            Get Started Free
            <ArrowRight size={20} />
          </Link>

          <Link
            to="/login"
            className="rounded-xl border border-white px-8 py-4 font-semibold text-white transition hover:bg-white hover:text-blue-600"
          >
            Login
          </Link>
        </div>
      </div>
    </section>
  );
}