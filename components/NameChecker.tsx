"use client";

import { useState } from "react";

function mockCheck(name) {
  return {
    name,
    domains: [
      { tld: ".com", available: Math.random() > 0.3 },
      { tld: ".io", available: Math.random() > 0.5 },
      { tld: ".co", available: Math.random() > 0.4 },
      { tld: ".id", available: Math.random() > 0.6 },
      { tld: ".app", available: Math.random() > 0.5 },
    ],
    social: [
      { platform: "Instagram", available: Math.random() > 0.4 },
      { platform: "Twitter/X", available: Math.random() > 0.5 },
      { platform: "TikTok", available: Math.random() > 0.6 },
      { platform: "GitHub", available: Math.random() > 0.3 },
    ],
    trademark: {
      risk: Math.random() > 0.7 ? "low" : Math.random() > 0.5 ? "medium" : "high",
      note: "Mock: Use Deep Check for real trademark search across USPTO, EUIPO, and DGIP.",
    },
  };
}

export default function NameChecker() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [contact, setContact] = useState("");

  const handleCheck = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    setLoading(true);
    setResult(null);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setResult(mockCheck(name));
    setLoading(false);
  };

  const handleManualRequest = (e) => {
    e.preventDefault();
    alert("Request sent! We will check manually and contact you via WhatsApp.");
    setShowForm(false);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-2">LookingForName</h1>
      <p className="text-center text-gray-600 mb-8">
        Check domain, trademark & social handles in 10 seconds
      </p>
      <form onSubmit={handleCheck} className="mb-8">
        <div className="flex gap-2">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value.toLowerCase().replace(/\s/g, ""))}
            placeholder="e.g. yourname"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Scanning..." : "Check"}
          </button>
        </div>
      </form>
      {result && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Domains</h2>
            <div className="grid grid-cols-2 gap-3">
              {result.domains.map((d) => (
                <div key={d.tld} className={`p-3 rounded-lg border ${d.available ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}>
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-sm">{result.name}{d.tld}</span>
                    <span className={`text-sm font-medium ${d.available ? "text-green-600" : "text-red-600"}`}>{d.available ? "Available" : "Taken"}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Social Handles</h2>
            <div className="space-y-2">
              {result.social.map((s) => (
                <div key={s.platform} className="flex justify-between items-center p-2 rounded bg-gray-50">
                  <span>{s.platform}</span>
                  <span className={s.available ? "text-green-600 text-sm" : "text-red-600 text-sm"}>{s.available ? `@${result.name}` : "Taken"}</span>
                </div>
              ))}
            </div>
          </div>
          <div className={`rounded-lg p-4 ${result.trademark.risk === "low" ? "bg-green-50" : result.trademark.risk === "medium" ? "bg-yellow-50" : "bg-red-50"}`}>
            <h2 className="text-lg font-semibold mb-2">Trademark Risk</h2>
            <p className="text-sm">{result.trademark.note}</p>
          </div>
          <div className="text-center">
            <button onClick={() => setShowForm(true)} className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900">🔍 Deep Check ($1 / Rp 15.000)</button>
            <p className="text-xs text-gray-500 mt-2">Full trademark search (US, EU, ID) + all platforms + detailed report via WhatsApp in 5 minutes</p>
          </div>
        </div>
      )}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Request Manual Deep Check</h3>
            <form onSubmit={handleManualRequest} className="space-y-4">
              <div><label className="block text-sm font-medium mb-1">Name to check</label><input type="text" value={name} readOnly className="w-full px-3 py-2 border rounded bg-gray-50" /></div>
              <div><label className="block text-sm font-medium mb-1">Email or WhatsApp</label><input type="text" value={contact} onChange={(e) => setContact(e.target.value)} placeholder="e.g. 62821xxxx or email@..." required className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500" /></div>
              <div className="flex gap-2">
                <button type="button" onClick={() => setShowForm(false)} className="flex-1 px-4 py-2 border rounded hover:bg-gray-50">Cancel</button>
                <button type="submit" className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Send Request</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
