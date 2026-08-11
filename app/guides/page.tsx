import type { Metadata } from "next";
import { guides } from "./data";

export const metadata: Metadata = {
  title: "暮らしの困りごと解決ガイド｜コトナビ",
  description: "引越し、家族のもしも、家計、子育て、食事、ペットなど、暮らしの困りごとを解決までの順番で解説します。",
  alternates: { canonical: "/guides" },
};

export default function GuidesPage() {
  return (
    <main className="guide-page">
      <header className="policy-header"><a className="brand" href="/"><span className="brand-mark"><i /><i /><i /></span><span>コトナビ</span></a><a className="policy-back" href="/">困りごとを探す →</a></header>
      <section className="guide-hero"><span className="overline">KOTONAVI GUIDES</span><h1>暮らしの困りごと<br />解決ガイド</h1><p>アプリを選ぶ前に知っておきたい準備と確認事項を、場面ごとに整理しました。</p></section>
      <section className="guide-list" aria-label="解決ガイド一覧">
        {guides.map((guide) => <article key={guide.slug}><small>{guide.eyebrow}</small><h2><a href={`/guides/${guide.slug}`}>{guide.title}</a></h2><p>{guide.description}</p><a className="guide-link" href={`/guides/${guide.slug}`}>ガイドを読む →</a></article>)}
      </section>
      <footer className="policy-footer"><a href="/">← コトナビへ戻る</a><small>© 2026 Kotonavi.</small></footer>
    </main>
  );
}
