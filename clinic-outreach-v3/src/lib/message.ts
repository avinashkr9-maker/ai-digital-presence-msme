import type { Lead } from "@/lib/supabase";

type CatCopy = {
  greeting: string;
  audience: string;
  loseTo: string;
  noun: string;
};

const CAT_COPY: Record<string, CatCopy> = {
  clinic: { greeting: "Hello Doctor", audience: "Patients", loseTo: "another clinic", noun: "clinic" },
  dental: { greeting: "Hello Doctor", audience: "Patients", loseTo: "another dental clinic", noun: "clinic" },
  pharmacy: { greeting: "Hello", audience: "Customers", loseTo: "another pharmacy", noun: "pharmacy" },
  gym: { greeting: "Hello", audience: "People looking for a gym", loseTo: "another gym", noun: "gym" },
  salon: { greeting: "Hello", audience: "People looking for a salon", loseTo: "another salon", noun: "salon" },
  tutor: { greeting: "Hello", audience: "Parents and students", loseTo: "another tutor", noun: "coaching" },
  ca: { greeting: "Hello", audience: "People looking for a CA", loseTo: "another firm", noun: "practice" },
  lawyer: { greeting: "Hello", audience: "People looking for a lawyer", loseTo: "another lawyer", noun: "practice" },
  restaurant: { greeting: "Hello", audience: "Hungry customers nearby", loseTo: "another restaurant", noun: "restaurant" },
  boutique: { greeting: "Hello", audience: "Shoppers nearby", loseTo: "another store", noun: "boutique" },
  mechanic: { greeting: "Hello", audience: "People looking for a mechanic", loseTo: "another garage", noun: "garage" },
  other: { greeting: "Hello", audience: "Customers", loseTo: "a competitor", noun: "business" },
};

function copyForCategory(category: string | null): CatCopy {
  const c = (category || "").toLowerCase();
  for (const key of Object.keys(CAT_COPY)) {
    if (c.includes(key)) return CAT_COPY[key];
  }
  if (c.includes("doctor") || c.includes("hospital")) return CAT_COPY.clinic;
  if (c.includes("fitness")) return CAT_COPY.gym;
  if (c.includes("beauty") || c.includes("spa")) return CAT_COPY.salon;
  if (c.includes("coaching") || c.includes("class")) return CAT_COPY.tutor;
  if (c.includes("food") || c.includes("cafe")) return CAT_COPY.restaurant;
  return CAT_COPY.other;
}

export function buildWhatsAppMessage(lead: Lead): string {
  const name = lead.business_name || "your business";
  const c = copyForCategory(lead.category);
  return [
    `${c.greeting},`,
    ``,
    `${c.audience} are searching for ${name} on Google — but without a website, many of them end up going to ${c.loseTo} instead.`,
    ``,
    `I've put together a quick website demo for your ${c.noun} — takes 30 seconds to see, completely free. Shall I send it across?`,
  ].join("\n");
}

export function buildWhatsAppLink(lead: Lead): string | null {
  if (!lead.phone) return null;
  let digits = lead.phone.replace(/\D/g, "");
  if (digits.length === 10) digits = "91" + digits;
  if (digits.length < 11) return null;
  const text = encodeURIComponent(
    lead.message_draft || buildWhatsAppMessage(lead),
  );
  return `https://wa.me/${digits}?text=${text}`;
}