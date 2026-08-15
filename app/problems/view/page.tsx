"use client";

import { useSearchParams } from "next/navigation";
import { appProblems, directStoreLinks } from "../../page";

const isStoreUrl = (url: string) => url.includes("apps.apple.com/") || url.includes("play.google.com/store/apps/");

export default function ProblemViewPage() {
  const searchParams = useSearchParams();
  const problem = appProblems.find((item) => item.id === searchParams.get("problem"));

  if (!problem) {
    return <main className="guide-page"><header className="topbar"><a className="brand" href="/"><span className="brand-mark"><i /><i /><i /></span><span>コトナビ</span></a></header><section className="guide-hero"><h1>困りごとが見つかりません</h1><p><a href="/">トップから困りごとを選び直す →</a></p></section></main>;
  }

  return <main className="guide-page problem-detail-page">
    <header className="topbar"><a className="brand" href="/"><span className="brand-mark"><i /><i /><i /></span><span>コトナビ</span></a><nav className="topnav"><a href={`/?problem=${problem.id}#guide`}>アプリ一覧へ戻る</a><a href="/problems">困りごと一覧</a><a href="/info">運営・掲載方針</a></nav></header>
    <article>
      <header className="article-header"><nav className="breadcrumb"><a href="/">トップ</a> <i>›</i> <span>{problem.title}</span></nav><small>{problem.eyebrow}</small><h1>{problem.title}</h1><p>{problem.description}</p></header>
      <div className="article-body">
        <section className="article-checklist"><h2>確認する順番</h2><ol>{problem.tasks.map((task) => <li key={task.id}><strong>{task.title}</strong><p>{task.note}</p><small>{task.timing}</small></li>)}</ol></section>
        <section className="app-chooser"><span>YOUR APP OPTIONS</span><h2>あなたの場合は、どのアプリから見る？</h2><p>目的に近いものを選び、公式サイトまたはストアで利用条件・対応OSを確認してください。</p><div className="app-choice-list">{problem.services.map((service, index) => {
          const stores = directStoreLinks[service.name] ?? {};
          const official = isStoreUrl(service.href) ? undefined : service.href;
          return <article className="selected-app" key={service.name}><div><small>{service.category}</small><h3>{service.name}</h3><p>{service.description}</p></div><dl><dt>この場合に</dt><dd>{service.fit}</dd><dt>注意点</dt><dd>{service.watch ?? "料金・対象地域・利用条件は公式情報で確認してください。"}</dd></dl><div className="selected-app-links">{official && <a className="official-link" href={official} target="_blank" rel={service.sponsored || service.affiliate ? "noreferrer nofollow sponsored" : "noreferrer"}>公式サイト <span>↗</span></a>}{stores.ios && <a href={stores.ios} target="_blank" rel="noreferrer">App Store <span>↗</span></a>}{stores.android && <a href={stores.android} target="_blank" rel="noreferrer">Google Play <span>↗</span></a>}{!official && !stores.ios && !stores.android && <a className="official-link" href={service.href} target="_blank" rel="noreferrer">公式情報を見る <span>↗</span></a>}</div></article>;
        })}</div></section>
        <section className="problem-notes"><h2>利用前の注意</h2><ul><li>アプリの機能・料金・対応OS・利用条件は変更されることがあります。リンク先の公式情報で最新内容を確認してください。</li><li>緊急性がある場合や専門的な判断が必要な場合は、アプリでの確認より公的窓口・専門機関への相談を優先してください。</li></ul></section>
        <p className="article-note">掲載順は広告・提携の有無で決まりません。アプリの特徴と困りごとへの相性をもとに案内しています。</p>
      </div>
    </article>
    <footer><a className="brand footer-brand" href="/"><span className="brand-mark"><i /><i /><i /></span><span>コトナビ</span></a><p>困りごとから、次の一歩へ。</p><div><a href="/">トップ</a><a href="/problems">困りごと一覧</a><a href="/info">運営・掲載方針</a></div><small>© 2026 Kotonavi.</small></footer>
  </main>;
}
