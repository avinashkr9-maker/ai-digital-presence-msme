"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function FindLeadsPanel() {
  const router = useRouter();
  const [place, setPlace] = useState("Gurugram");
  const [category, setCategory] = useState("Clinic");
  const [limit, setLimit] = useState(20);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  async function runFinder() {
    setLoading(true);
    setMessage("");
    setIsError(false);
    try {
      const res = await fetch("/api/find-leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ place, category, limit }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setIsError(true);
        setMessage(data.error || "Something went wrong.");
      } else {
        const note = data.note ? ` ${data.note}` : "";
        setMessage(
          `Scraped ${data.scraped}, matched ${data.matched} without a website, added ${data.inserted} new leads.${note}`,
        );
        // Refresh the dashboard so the new leads and stats show up.
        router.refresh();
      }
    } catch {
      setIsError(true);
      setMessage("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-[28px] border border-white/70 bg-white/85 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.06)]">
      <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-neutral-500">
        Lead finder
      </div>
      <h2 className="mt-2 text-2xl font-black tracking-[-0.04em]">
        Find clinics with no website
      </h2>
      <p className="mt-2 text-sm leading-6 text-neutral-600">
        Scrapes Google Maps, keeps only clinics that have a phone but no
        website, and adds them to your pipeline.
      </p>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <div>
          <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.16em] text-neutral-500">
            City / Area
          </label>
          <input
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            placeholder="Gurugram"
            className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-emerald-300"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.16em] text-neutral-500">
            Category
          </label>
          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Clinic"
            className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-emerald-300"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.16em] text-neutral-500">
            How many
          </label>
          <input
            type="number"
            min={1}
            max={50}
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
            className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-emerald-300"
          />
        </div>
      </div>

      <button
        onClick={runFinder}
        disabled={loading}
        className="mt-4 w-full rounded-xl bg-neutral-950 px-4 py-3 text-sm font-bold text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:px-8"
      >
        {loading ? "Finding clinics… (can take 1–3 min)" : "Find leads"}
      </button>

      {message ? (
        <div
          className={`mt-4 rounded-xl border px-4 py-3 text-sm font-medium leading-6 ${
            isError
              ? "border-red-200 bg-red-50 text-red-800"
              : "border-emerald-200 bg-emerald-50 text-emerald-900"
          }`}
        >
          {message}
        </div>
      ) : null}
    </div>
  );
}
