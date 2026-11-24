import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AppChooser } from "./app-chooser";
import { problemPageBySlug, problemPages, relatedProblemPage } from "../data";

const mealsAffiliateUrl = "https://px.a8.net/svt/ejp?a8mat=4BA756+48EZN6+53KW+60WN6";
const mealsAffiliateImpressionUrl = "https://www19.a8.net/0.gif?a8mat=4BA756+48EZN6+53KW+60WN6";
const mealsProblemIds = new Set(["food-recipe", "food-chores"]);

export function generateStaticParams() { return problemPages.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = problemPageBySlug(slug);
  if (!item) return {};
  const title = item.title;
  const description = item.contentType === "information"
    ? `${item.description} 公式情報と相談先を優先した確認手順を整理します。`
    : `${item.description} 確認する順番と、状況に応じたアプリの選び方を公式情報をもとに整理します。`;
  return {
    title: `${title}｜コトナビ`, description,
    alternates: { canonical: `/problems/${item.slug}` },
    ...(item.draft ? { robots: { index: false, follow: true } } : {}),
    openGraph: { title, description, type: "article", url: `/problems/${item.slug}` },
  };
}

export default async function ProblemDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = problemPageBySlug(slug);
  if (!item) notFound();
  const related = item.related.map(relatedProblemPage).filter((value) => value !== undefined);
  const structuredData = {
    "@context": "https://schema.org", "@type": "Article", headline: item.title, description: item.description,
    dateModified: item.reviewedAt, author: { "@type": "Organization", name: "コトナビ編集部" },
    publisher: { "@type": "Organization", name: "コトナビ編集部" }, mainEntityOfPage: `https://kotonaviapp.com/problems/${item.slug}`,
    about: item.contentType === "information"
      ? item.options.map((option) => ({ "@type": "Thing", name: option.name, description: option.kind }))
      : item.options.map((option) => ({ "@type": "SoftwareApplication", name: option.name, applicationCategory: option.kind, operatingSystem: "スマートフォン" })),
  };
  const faqData = item.faq ? {
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: item.faq.map((entry) => ({ "@type": "Question", name: entry.question, acceptedAnswer: { "@type": "Answer", text: entry.answer } })),
  } : null;
  const sections: { id: string; title: string }[] = [
    { id: "steps", title: "確認する順番" },
    { id: "choose", title: item.contentType === "information" ? "公式情報・相談先" : "紹介しているアプリ・サービス" },
    ...(item.comparison ? [{ id: "compare", title: item.comparison.heading }] : []),
    ...(item.seoContent ?? []).map((content, index) => ({ id: `point-${index + 1}`, title: content.heading })),
    ...(item.checklist ? [{ id: "checklist", title: item.checklist.heading }] : []),
    ...(item.faq ? [{ id: "faq", title: "よくある質問" }] : []),
    { id: "notes", title: "利用前の注意" },
  ];
  const no = (id: string) => String(sections.findIndex((section) => section.id === id) + 1).padStart(2, "0");
  return <main className="guide-page problem-detail-page guide-c">
    <header className="gc-top"><a className="gc-brand" href="/">コトナビ<small>困りごとから、次の一歩へ。</small></a><nav><a href="/problems">確認手順一覧</a><a href="/info">運営・掲載方針</a></nav></header>
    <article>
      <header className="gc-hero">
        <nav className="gc-breadcrumb" aria-label="パンくずリスト"><a href="/">トップ</a> <i>›</i> <a href="/problems">確認手順一覧</a> <i>›</i> {item.category}</nav>
        <p className="gc-eyebrow">{item.category}</p>
        <h1>{item.title}</h1>
        <p className="gc-lede">{item.description}</p>
        <p className="gc-meta">最終確認 {item.reviewedAt.replaceAll("-", ".")} ／ 執筆・確認 コトナビ編集部{item.sources ? ` ／ 出典${item.sources.length}件` : ""}</p>
      </header>
      <div className="gc-layout">
        <aside className="gc-side"><nav aria-label="目次"><strong>CONTENTS</strong><ol>{sections.map((section, index) => <li key={section.id}><a href={`#${section.id}`}><b>{String(index + 1).padStart(2, "0")}</b>{section.title}</a></li>)}</ol></nav></aside>
        <div className="article-body gc-body">
          <section className="gc-summary"><p className="gc-label">{item.summary ? "SUMMARY" : "最初に知っておきたいこと"}</p><p>{item.summary ?? item.intro}</p>{item.summary && <p className="gc-intro">{item.intro}</p>}</section>
          <section id="steps" className="gc-steps"><h2><b className="sec-no">{no("steps")}</b>確認する順番</h2><ol>{item.steps.map((step, index) => <li key={step.title}><span>{index + 1}</span><div><strong>{step.title}</strong><p>{step.body}</p></div></li>)}</ol></section>
          <AppChooser options={item.options} information={item.contentType === "information"} number={no("choose")} sectionId="choose" />
          {mealsProblemIds.has(item.problemId) && <aside className="contextual-affiliate" aria-label="この困りごとに関連する広告">
            <span>広告</span>
            <div><b>献立を考えたり調理したりする負担を減らしたい方へ。</b><p>DELISH KITCHENプロデュースの冷凍宅配弁当「Meals」は、管理栄養士監修の食事を自宅へ届けるサービスです。</p><small>配送地域、料金、メニュー、定期購入・解約条件は公式サイトでご確認ください。広告はアプリの掲載順位に影響しません。</small></div>
            <a href={mealsAffiliateUrl} target="_blank" rel="noreferrer nofollow sponsored">サービス内容を確認する ↗</a>
            <img className="affiliate-impression" width="1" height="1" src={mealsAffiliateImpressionUrl} alt="" aria-hidden="true" />
          </aside>}
          {item.comparison && <section id="compare" className="article-comparison"><h2><b className="sec-no">{no("compare")}</b>{item.comparison.heading}</h2><div className="comparison-scroll" role="region" aria-label={item.comparison.caption} tabIndex={0}><table><caption>{item.comparison.caption}</caption><thead><tr>{item.comparison.columns.map((column) => <th key={column} scope="col">{column}</th>)}</tr></thead><tbody>{item.comparison.rows.map((row) => <tr key={row[0]}>{row.map((cell, index) => index === 0 ? <th key={index} scope="row">{cell}</th> : <td key={index}>{cell}</td>)}</tr>)}</tbody></table></div>{item.comparison.note && <p className="comparison-note">{item.comparison.note}</p>}</section>}
          {item.seoContent?.map((content, index) => <section key={content.heading} id={`point-${index + 1}`}><h2><b className="sec-no">{no(`point-${index + 1}`)}</b>{content.heading}</h2><p>{content.body}</p>{item.keyFigures && item.keyFigures.afterHeading === content.heading && <figure className="gc-figures"><div>{item.keyFigures.items.map((figure) => <div key={figure.label} className={figure.emphasis ? "emphasis" : undefined}><span>{figure.label}</span><strong>{figure.value}</strong></div>)}</div><figcaption>{item.keyFigures.caption}</figcaption></figure>}</section>)}
          {item.checklist && <section id="checklist" className="article-precheck"><h2><b className="sec-no">{no("checklist")}</b>{item.checklist.heading}</h2><ul>{item.checklist.items.map((entry) => <li key={entry}>{entry}</li>)}</ul></section>}
          {item.faq && <section id="faq" className="article-faq"><h2><b className="sec-no">{no("faq")}</b>よくある質問</h2>{item.faq.map((entry) => <details key={entry.question}><summary>{entry.question}</summary><p>{entry.answer}</p></details>)}</section>}
          <section id="notes" className="problem-notes"><h2><b className="sec-no">{no("notes")}</b>利用前の注意</h2><ul>{item.notes.map((note) => <li key={note}>{note}</li>)}</ul></section>
          {related.length > 0 && <section><h2>関連する困りごと</h2><div className="related-problems">{related.map((entry) => <a data-track="related" key={entry.slug} href={`/problems/${entry.slug}`}><small>{entry.category}</small><strong>{entry.title}</strong><span>→</span></a>)}</div></section>}
          <section className="source-method"><h2>このページの作成・確認方法</h2><dl><dt>執筆・確認</dt><dd><a href="/info#team">コトナビ編集部</a></dd><dt>情報源</dt><dd>{item.sources ? <ul className="source-list">{item.sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.label}</a>（{source.checkedAt.replaceAll("-", ".")} 確認）</li>)}</ul> : item.contentType === "information" ? "公的機関・相談窓口・事業者の公式案内" : "アプリの公式サイト・公式ストア"}</dd><dt>確認項目</dt><dd>{item.contentType === "information" ? "相談先、緊急時の連絡先、対象者、利用方法、注意事項" : "提供主体、対象者、対応OS、利用方法、料金、注意事項"}</dd><dt>最終確認日</dt><dd>{item.reviewedAt.replaceAll("-", ".")}</dd></dl><p>{item.contentType === "information" ? "緊急時は各窓口の案内を優先してください。誤りや変更は" : "アプリは専門家による個別判断や緊急対応を代替するものではありません。誤りや変更は"}<a href="mailto:kotonavi.info@proton.me">編集部へお知らせください</a>。</p></section>
          <p className="article-note">広告・提携の有無は通常掲載の順位に影響しません。利用条件や受付状況は変わるため、リンク先で最新情報をご確認ください。</p>
        </div>
      </div>
    </article>
    <footer><a className="brand footer-brand" href="/"><span className="brand-mark"><i /><i /><i /></span><span>コトナビ</span></a><p>困りごとから、次の一歩へ。</p><div><a href="/">アプリを探す</a><a href="/problems">確認手順一覧</a><a href="/guides">解決ガイド</a><a href="/info">運営・掲載方針</a></div><small>© 2026 Kotonavi.</small></footer>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
    {faqData && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData).replace(/</g, "\\u003c") }} />}
  </main>;
}
