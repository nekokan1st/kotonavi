import type { Metadata } from "next";
import { problemPages } from "./data";

export const metadata: Metadata = {
  title: "困りごと解決ページ一覧｜コトナビ",
  description: "詐欺電話、救急受診、スマホ紛失、防災、引越しなど、暮らしの困りごと別に確認手順と役立つサービスを案内します。",
  alternates: { canonical: "/problems" },
};

export default function ProblemsIndex() {
  return <main className="guide-page">
    <header className="topbar"><a className="brand" href="/"><span className="brand-mark"><i /><i /><i /></span><span>コトナビ</span></a><nav className="topnav"><a href="/">困りごとから探す</a><a href="/guides">解決ガイド</a><a href="/info">運営・掲載方針</a></nav></header>
    <section className="guide-hero"><span className="overline">PROBLEM PAGES</span><h1>困りごとから、確認する順番を探す。</h1><p>今起きている状況ごとに、最初にすること、使えるサービス、注意点をまとめています。</p></section>
    <section className="guide-list problem-page-list">{problemPages.map((item) => <article key={item.slug}><small>{item.category}</small><h2><a href={`/problems/${item.slug}`}>{item.title}</a></h2><p>{item.description}</p><a className="text-link" href={`/problems/${item.slug}`}>確認手順を見る →</a></article>)}</section>
    <footer><a className="brand footer-brand" href="/"><span className="brand-mark"><i /><i /><i /></span><span>コトナビ</span></a><p>困りごとから、次の一歩へ。</p><div><a href="/">トップ</a><a href="/problems">困りごと一覧</a><a href="/guides">解決ガイド</a><a href="/info">運営・掲載方針</a></div><small>© 2026 Kotonavi.</small></footer>
  </main>;
}
