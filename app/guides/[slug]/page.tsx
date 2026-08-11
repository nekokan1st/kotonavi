import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { guideBySlug, guides } from "../data";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return guides.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const guide = guideBySlug((await params).slug);
  if (!guide) return {};
  return {
    title: `${guide.title}｜コトナビ`,
    description: guide.description,
    alternates: { canonical: `/guides/${guide.slug}` },
    openGraph: { title: guide.title, description: guide.description, type: "article" },
  };
}

export default async function GuidePage({ params }: Props) {
  const guide = guideBySlug((await params).slug);
  if (!guide) notFound();
  const url = `https://kotonaviapp.com/guides/${guide.slug}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    datePublished: "2026-08-11",
    dateModified: "2026-08-11",
    author: { "@type": "Organization", name: "コトナビ編集部", url: "https://kotonaviapp.com/info" },
    publisher: { "@type": "Organization", name: "コトナビ", url: "https://kotonaviapp.com" },
    mainEntityOfPage: url,
  };
  return (
    <main className="guide-page article-page">
      <header className="policy-header"><a className="brand" href="/"><span className="brand-mark"><i /><i /><i /></span><span>コトナビ</span></a><a className="policy-back" href="/guides">ガイド一覧 →</a></header>
      <nav className="breadcrumbs" aria-label="パンくず"><a href="/">ホーム</a><span>›</span><a href="/guides">解決ガイド</a><span>›</span><span>{guide.eyebrow}</span></nav>
      <article>
        <header className="article-header"><span className="overline">{guide.eyebrow}</span><h1>{guide.title}</h1><p>{guide.description}</p><small>最終更新：{guide.updated}　編集：コトナビ編集部</small></header>
        <div className="article-body">
          <section className="article-checklist"><h2>最初に確認する3つのこと</h2><ol>{guide.checklist.map((item) => <li key={item}>{item}</li>)}</ol></section>
          {guide.sections.map((section) => <section key={section.heading}><h2>{section.heading}</h2><p>{section.body}</p></section>)}
          <aside className="article-cta"><small>コトナビで探す</small><h2>この困りごとに合うスマホアプリを見る</h2><p>公式サイトとApp Store・Google Playへの導線をまとめています。</p><a href={`/?problem=${guide.problemId}`}>おすすめアプリを確認する →</a></aside>
          <p className="article-note">掲載情報は確認時点の内容です。サービスの料金・機能・対応OSは変更される場合があるため、利用前に公式情報をご確認ください。</p>
        </div>
      </article>
      <footer className="policy-footer"><a href="/guides">← 解決ガイド一覧</a><small>© 2026 Kotonavi.</small></footer>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
    </main>
  );
}
