import type { Metadata } from "next";
import ProblemsIndexClient from "./problems-index-client";

export const metadata: Metadata = {
  title: "困りごとの確認手順一覧｜コトナビ",
  description: "困りごとごとに、確認する順番とアプリを使う前の注意をまとめています。",
  alternates: { canonical: "/problems" },
};

export default function ProblemsIndex() {
  return <ProblemsIndexClient />;
}
