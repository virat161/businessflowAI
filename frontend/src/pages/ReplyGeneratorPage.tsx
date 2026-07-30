import { useState } from "react";
import { generateEmail } from "../services/api";

export default function ReplyGeneratorPage() {
  const [purpose, setPurpose] = useState("");
  const [recipient, setRecipient] = useState("");
  const [tone, setTone] = useState("Professional");
  const [instructions, setInstructions] = useState("");

  const [generatedEmail, setGeneratedEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!purpose.trim() || !recipient.trim()) {
      alert("Please fill Purpose and Recipient.");
      return;
    }

    try {
      setLoading(true);

      const response = await generateEmail({
        purpose,
        recipient,
        tone,
        instructions,
      });

      setGeneratedEmail(response.email);
    } catch (error: any) {
      console.error(error);

      alert(
        error?.response?.data?.detail ??
          "Failed to generate email."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-10">
      <div className="mx-auto max-w-5xl">

        <h1 className="text-4xl font-bold text-slate-800">
          Email Generator
        </h1>

        <p className="mt-2 text-slate-500">
          Generate professional emails using AI.
        </p>

        <div className="mt-8 rounded-2xl bg-white p-8 shadow">

          <div className="grid gap-6">

            <div>
              <label className="mb-2 block font-medium">
                Email Purpose
              </label>

              <input
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                placeholder="Example: Partnership Proposal"
                className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium">
                Recipient
              </label>

              <input
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="Example: John Smith"
                className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium">
                Tone
              </label>

              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full rounded-lg border p-3"
              >
                <option>Professional</option>
                <option>Friendly</option>
                <option>Formal</option>
                <option>Persuasive</option>
                <option>Casual</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block font-medium">
                Additional Instructions
              </label>

              <textarea
                rows={5}
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                placeholder="Anything AI should know..."
                className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
              />
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading}
              className="rounded-xl bg-blue-600 py-3 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              {loading ? "Generating..." : "Generate Email"}
            </button>

          </div>

        </div>

        {generatedEmail && (
          <div className="mt-8 rounded-2xl bg-white p-8 shadow">

            <div className="flex items-center justify-between">

              <h2 className="text-2xl font-semibold">
                Generated Email
              </h2>

              <button
                onClick={() =>
                  navigator.clipboard.writeText(generatedEmail)
                }
                className="rounded-lg bg-slate-800 px-4 py-2 text-white hover:bg-black"
              >
                Copy
              </button>

            </div>

            <pre className="mt-6 whitespace-pre-wrap rounded-lg bg-slate-50 p-5 text-sm leading-7">
              {generatedEmail}
            </pre>

          </div>
        )}

      </div>
    </div>
  );
}