import { useState } from "react";

export default function BusinessPage() {
  const [companyName, setCompanyName] = useState("");
  const [industry, setIndustry] = useState("");
  const [products, setProducts] = useState("");
  const [audience, setAudience] = useState("");
  const [tone, setTone] = useState("Professional");
  const [website, setWebsite] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");

  const handleSave = () => {
    alert("Backend integration coming next.");
  };

  return (
    <div className="min-h-screen bg-slate-100 p-10">
      <div className="mx-auto max-w-5xl">

        <h1 className="text-4xl font-bold text-slate-800">
          Business Memory
        </h1>

        <p className="mt-2 text-slate-500">
          Save your business details once. AI will automatically use them for
          Chat and Email Generator.
        </p>

        <div className="mt-8 rounded-2xl bg-white p-8 shadow">
          <div className="grid gap-6">

            <div>
              <label className="mb-2 block font-medium">Company Name</label>
              <input
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="BusinessFlow AI"
                className="w-full rounded-lg border p-3"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium">Industry</label>
              <input
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                placeholder="AI Software"
                className="w-full rounded-lg border p-3"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium">
                Products / Services
              </label>
              <textarea
                rows={3}
                value={products}
                onChange={(e) => setProducts(e.target.value)}
                placeholder="AI Chat, PDF Summarizer..."
                className="w-full rounded-lg border p-3"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium">
                Target Audience
              </label>
              <input
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                placeholder="Startups, Agencies..."
                className="w-full rounded-lg border p-3"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium">Brand Tone</label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full rounded-lg border p-3"
              >
                <option>Professional</option>
                <option>Friendly</option>
                <option>Formal</option>
                <option>Confident</option>
                <option>Casual</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block font-medium">Website</label>
              <input
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="https://example.com"
                className="w-full rounded-lg border p-3"
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">

              <div>
                <label className="mb-2 block font-medium">Email</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="contact@example.com"
                  className="w-full rounded-lg border p-3"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium">Phone</label>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 XXXXX XXXXX"
                  className="w-full rounded-lg border p-3"
                />
              </div>

            </div>

            <div>
              <label className="mb-2 block font-medium">
                Additional Notes
              </label>
              <textarea
                rows={5}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any extra information AI should always remember..."
                className="w-full rounded-lg border p-3"
              />
            </div>

            <button
              onClick={handleSave}
              className="rounded-xl bg-blue-600 py-3 text-white hover:bg-blue-700"
            >
              Save Business Memory
            </button>

          </div>
        </div>

      </div>
    </div>
  );
}