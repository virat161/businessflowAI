export default function Hero() {
  return (
    <section className="py-28 px-6 text-center">
      <div className="max-w-5xl mx-auto">

        <span className="px-4 py-2 rounded-full border text-sm">
          🚀 AI Workforce for Modern Businesses
        </span>

        <h1 className="mt-8 text-6xl font-extrabold leading-tight">
          Your AI Team
          <br />
          Works 24/7
        </h1>

        <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto">
          Chat with AI, summarize PDFs, generate email replies and automate
          repetitive work from one beautiful dashboard.
        </p>

        <div className="mt-10 flex justify-center gap-5">
          <button className="bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700">
            Get Started Free
          </button>

          <button className="border px-8 py-4 rounded-xl">
            Watch Demo
          </button>
        </div>

      </div>
    </section>
  );
}