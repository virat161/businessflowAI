import { useEffect, useState } from "react";
import {
  getBusinessMemory,
  saveBusinessMemory,
} from "../services/api";

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

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadBusinessMemory();
  }, []);

  async function loadBusinessMemory() {
    try {
      const data = await getBusinessMemory();

      if (!data) return;

      setCompanyName(data.company_name);
      setIndustry(data.industry);
      setProducts(data.products);
      setAudience(data.target_audience);
      setTone(data.brand_tone);
      setWebsite(data.website);
      setEmail(data.email);
      setPhone(data.phone);
      setNotes(data.notes);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleSave() {
    if (
      !companyName ||
      !industry ||
      !products ||
      !audience
    ) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      setLoading(true);

      await saveBusinessMemory({
        company_name: companyName,
        industry,
        products,
        target_audience: audience,
        brand_tone: tone,
        website,
        email,
        phone,
        notes,
      });

      alert("Business Memory saved successfully.");
    } catch (error) {
      console.error(error);
      alert("Failed to save Business Memory.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 p-10">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-4xl font-bold text-slate-800">
          Business Memory
        </h1>

        <p className="mt-2 text-slate-500">
          Save your business information once.
          BusinessFlow AI will automatically use it while
          chatting and generating emails.
        </p>

        <div className="mt-8 rounded-2xl bg-white p-8 shadow">
          <div className="grid gap-6">

            <div>
              <label className="mb-2 block font-medium">
                Company Name
              </label>
              <input
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full rounded-lg border p-3"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium">
                Industry
              </label>
              <input
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
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
                className="w-full rounded-lg border p-3"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium">
                Brand Tone
              </label>

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
              <label className="mb-2 block font-medium">
                Website
              </label>

              <input
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="w-full rounded-lg border p-3"
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">

              <div>
                <label className="mb-2 block font-medium">
                  Email
                </label>

                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border p-3"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium">
                  Phone
                </label>

                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
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
                className="w-full rounded-lg border p-3"
              />
            </div>

            <button
              onClick={handleSave}
              disabled={loading}
              className="rounded-xl bg-blue-600 py-3 text-white hover:bg-blue-700 disabled:bg-gray-400"
            >
              {loading ? "Saving..." : "Save Business Memory"}
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}