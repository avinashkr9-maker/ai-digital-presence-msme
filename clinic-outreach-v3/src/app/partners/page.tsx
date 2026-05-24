import type { Metadata } from "next";
import PartnersClient from "./PartnersClient";

export const metadata: Metadata = {
  title: "CA Partner Program — Dikhao",
  description:
    "Chartered Accountants: earn 20% recurring commission by offering Dikhao to your clients. Free to join, no investment needed.",
};

export default function PartnersPage() {
  return <PartnersClient />;
}
