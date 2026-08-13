import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { problemPageById, problemPageBySlug, problemPages } from "../data";

export function generateStaticParams() { return problemPages.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = problemPageBySlug(slug);
  if (!item) return {};
  const appNames = item.options.map((option) => option.name).join("・");
  const title = item.title.includes(appNames) || !appNames ? item.title : `${item.title}｜${appNames}`;
  const description = appNames ? `${item.description} ${appNames}の向いている状況と注意点を、公式情報をもとに整理します。` : item.description;
  return {
    title: `${title}｜コトナビ`, description,
    alternates: { canonical: `/problems/${item.slug}` },
    openGraph: { title, description, type: "article", url: `/problems/${item.slug}` },
  };
}

export default async function ProblemDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = problemPageBySlug(slug);
  if (!item) notFound();
  const related = item.related.map(problemPageById).filter((value) => value !== undefined);
  const structuredData = {
    "@context": "https://schema.org", "@type": "Article", headline: item.title, description: item.description,
    dateModified: item.reviewedAt, author: { "@type": "Organization", name: "コトナビ編集部" },
    publisher: { "@type": "Organization", name: "コトナビ編集部" }, mainEntityOfPage: `https://kotonaviapp.com/problems/${item.slug}`,
    about: item.options.map((option) => ({ "@type": "SoftwareApplication", name: option.name, applicationCategory: option.kind, operatingSystem: "スマートフォン" })),
  };
  return <main className="guide-page problem-detail-page">
    <header className="topbar"><a className="brand" href="/"><span className="brand-mark"><i /><i /><i /></span><span>コトナビ</span></a><nav className="topnav"><a href="/problems">困りごと一覧</a><a href="/guides">解決ガイド</a><a href="/info">運営・掲載方針</a></nav></header>
    <article>
      <header className="article-header"><nav className="breadcrumb"><a href="/">トップ</a> <i>›</i> <a href="/problems">困りごと一覧</a> <i>›</i> {item.category}</nav><small>{item.category} ・ 最終確認 {item.reviewedAt.replaceAll("-", ".")}</small><h1>{item.title}</h1><p>{item.description}</p></header>
      <div className="article-body">
        <section><h2>最初に知っておきたいこと</h2><p>{item.intro}</p></section>
        <section className="article-checklist"><h2>確認する順番</h2><ol>{item.steps.map((step) => <li key={step.title}><strong>{step.title}</strong><p>{step.body}</p></li>)}</ol></section>
        <aside className="article-cta guide-to-comparison"><span>アプリを比較する</span><h2>条件に合わせて、使うアプリを選ぶ</h2><p>アプリの特徴、向いているケース、対応OSを比較して、いまの状況に合うものを選べます。</p><a href={`/?problem=${item.problemId}#guide`}>条件に合わせてアプリを比較する →</a></aside>
        {item.seoContent?.map((content) => <section key={content.heading}><h2>{content.heading}</h2><p>{content.body}</p></section>)}
        <section className="problem-notes"><h2>利用前の注意</h2><ul>{item.notes.map((note) => <li key={note}>{note}</li>)}</ul></section>
        {related.length > 0 && <section><h2>関連する困りごと</h2><div className="related-problems">{related.map((entry) => <a data-track="related" key={entry.slug} href={`/problems/${entry.slug}`}><small>{entry.category}</small><strong>{entry.title}</strong><span>→</span></a>)}</div></section>}
        <section className="source-method"><h2>このページの作成・確認方法</h2><dl><dt>執筆・確認</dt><dd><a href="/info#team">コトナビ編集部</a></dd><dt>情報源</dt><dd>アプリの公式サイト・公式ストア</dd><dt>確認項目</dt><dd>提供主体、対象者、対応OS、利用方法、料金、注意事項</dd><dt>最終確認日</dt><dd>{item.reviewedAt.replaceAll("-", ".")}</dd></dl><p>アプリは専門家による個別判断や緊急対応を代替するものではありません。誤りや変更は<a href="mailto:kotonavi.info@proton.me">編集部へお知らせください</a>。</p></section>
        <p className="article-note">広告・提携の有無は通常掲載の順位に影響しません。利用条件や受付状況は変わるため、リンク先で最新情報をご確認ください。</p>
      </div>
    </article>
    <footer><a className="brand footer-brand" href="/"><span className="brand-mark"><i /><i /><i /></span><span>コトナビ</span></a><p>困りごとから、次の一歩へ。</p><div><a href="/">トップ</a><a href="/problems">困りごと一覧</a><a href="/guides">解決ガイド</a><a href="/info">運営・掲載方針</a></div><small>© 2026 Kotonavi.</small></footer>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
  </main>;
}
