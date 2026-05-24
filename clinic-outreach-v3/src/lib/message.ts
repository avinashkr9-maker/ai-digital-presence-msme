import type { Lead } from "@/lib/supabase";

// Build a ready-to-send WhatsApp outreach message for a clinic lead.
// Clinic-first, single-outcome, ends with an easy yes/no ask.
export function buildWhatsAppMessage(lead: Lead): string {
  const name = lead.business_name || "your clinic";
  return [
    `Hello Doctor,`,
    ``,
    `Patients are searching for ${name} on Google — but without a website, many of them end up booking with another clinic instead.`,
    ``,
    `I've put together a quick website demo for your clinic — takes 30 seconds to see, completely free. Shall I send it across?`,
  ].join("\n");
}

// Build a wa.me link that opens WhatsApp to the lead's number with the
// message pre-filled. Strips non-digits and assumes India (+91) if no
// country code is present.
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
