"use client";

import { useMemo, useState } from "react";
import { navigableProblems, problemDetailSlugs } from "../page";

const themeLabels: Record<string, string> = {
  daily: "日常生活", home: "引越し・住まい", work: "仕事・フリーランス", family: "家族・もしも",
  health: "健康・介護", money: "お金・契約", parenting: "子育て・学び", digital: "デジタル・安全",
  leisure: "遊び・趣味", mobility: "移動・外出", food: "食事・家事", pets: "ペット", support: "相談・人間関係",
};

const destinationFor = (problemId: string) => problemDetailSlugs[problemId]
  ? `/problems/${problemDetailSlugs[problemId]}`
  : `/problems/view?problem=${encodeURIComponent(problemId)}`;

export default function ProblemsIndexClient() {
  const [query, setQuery] = useState("");
  const [theme, setTheme] = useState("すべて");
  const themes = ["すべて", ...Array.from(new Set(navigableProblems.map((item) => themeLabels[item.theme] ?? item.theme)))];
  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return navigableProblems.filter((item) => {
      const category = themeLabels[item.theme] ?? item.theme;
      const searchable = [item.title, item.description, item.eyebrow, category, ...item.services.flatMap((service) => [service.name, service.category, service.tags.join(" ")])].join(" ").toLowerCase();
      return (theme === "すべて" || category === theme) && (!normalized || searchable.includes(normalized));
    });
  }, [query, theme]);

  return <main className="guide-page">
    <header className="topbar"><a className="brand" href="/"><span className="brand-mark"><i /><i /><i /></span><span>コトナビ</span></a><nav className="topnav"><a href="/">アプリを探す</a><a href="/info">運営・掲載方針</a></nav></header>
    <section className="guide-hero problem-index-hero"><span className="overline">CHECKLIST LIBRARY</span><h1>困りごとの確認手順を読む。</h1><p>アプリを選ぶ前に確認したいことや、状況別の注意点をまとめています。アプリを探すならトップへ進んでください。</p><a className="guide-hero-link" href="/">トップでアプリを探す →</a></section>
    <section className="problem-index-controls" aria-label="確認手順を絞り込む"><label><span>キーワード</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="例：家計、薬、タクシー" /></label><div><span>テーマ</span><div className="problem-theme-filters">{themes.map((item) => <button className={theme === item ? "active" : ""} key={item} onClick={() => setTheme(item)} type="button">{item}</button>)}</div></div><p>{results.length}件の確認手順</p></section>
    <section className="guide-list problem-page-list">{results.map((item) => <article key={item.id}><small>{themeLabels[item.theme] ?? item.theme}</small><h2><a href={destinationFor(item.id)}>{item.title}</a></h2><p>{item.description}</p><a className="text-link" href={destinationFor(item.id)}>確認手順を読む →</a></article>)}{results.length === 0 && <p className="empty-problem-results">該当する確認手順がありません。別の言葉で探すか、トップからアプリを探してください。</p>}</section>
    <footer><a className="brand footer-brand" href="/"><span className="brand-mark"><i /><i /><i /></span><span>コトナビ</span></a><p>困りごとから、次の一歩へ。</p><div><a href="/">アプリを探す</a><a href="/problems">確認手順一覧</a><a href="/guides">解決ガイド</a><a href="/info">運営・掲載方針</a></div><small>© 2026 Kotonavi.</small></footer>
  </main>;
}
