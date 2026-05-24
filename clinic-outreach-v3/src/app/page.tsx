import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "Dikhao — Your Business, Visible Online",
  description:
    "Dikhao builds your complete digital presence — website, Google listing, WhatsApp catalog — in under 10 minutes. AI-powered, no tech skills needed.",
};

export default function HomePage() {
  return <HomeClient />;
}
