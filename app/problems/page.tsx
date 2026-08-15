import type { Metadata } from "next";
import ProblemsIndexClient from "./problems-index-client";

export const metadata: Metadata = {
  title: "困りごと一覧｜コトナビ",
  description: "暮らしの困りごとを一覧から探し、確認手順と役立つスマホアプリを確認できます。",
  alternates: { canonical: "/problems" },
};

export default function ProblemsIndex() {
  return <ProblemsIndexClient />;
}
