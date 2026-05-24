import type { Metadata } from "next";
import DemoClient from "./DemoClient";

export const metadata: Metadata = {
  title: "Dikhao — See Your Business Website in 30 Seconds",
  description:
    "Enter your business details and see a complete website, Google listing, and WhatsApp catalog preview in 30 seconds.",
};

export default function DemoPage() {
  return <DemoClient />;
}
