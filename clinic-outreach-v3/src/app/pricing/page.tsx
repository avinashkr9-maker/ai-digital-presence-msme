import type { Metadata } from "next";
import PricingClient from "./PricingClient";

export const metadata: Metadata = {
  title: "Dikhao — Pricing | Plans from ₹299/month",
  description:
    "Simple, honest pricing for your digital presence. Website, Google listing, WhatsApp catalog and more — starting at ₹299/month. No setup fees, cancel anytime.",
};

export default function PricingPage() {
  return <PricingClient />;
}
