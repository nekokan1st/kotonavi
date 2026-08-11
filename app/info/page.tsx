import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "運営・編集・広告掲載方針｜コトナビ",
  description: "コトナビの運営方針、アプリの選定基準、広告・PR表記、プライバシー、免責事項、お問い合わせについて。",
};

const sections = [
  { href: "#about", label: "コトナビについて" },
  { href: "#editorial", label: "編集方針" },
  { href: "#advertising", label: "広告掲載方針" },
  { href: "#privacy", label: "プライバシー" },
  { href: "#disclaimer", label: "免責事項" },
  { href: "#contact", label: "お問い合わせ" },
];

export default function InfoPage() {
  return (
    <main className="policy-page">
      <header className="policy-header">
        <a className="brand" href="/" aria-label="コトナビ ホーム"><span className="brand-mark"><i /><i /><i /></span><span>コトナビ</span></a>
        <a className="policy-back" href="/">サイトへ戻る →</a>
      </header>

      <section className="policy-hero">
        <span className="overline">TRUST & TRANSPARENCY</span>
        <h1>安心して選べるための<br />運営・掲載方針</h1>
        <p>コトナビがどのように情報を選び、広告や提携を扱い、利用者の情報を守るかをまとめています。</p>
        <nav aria-label="方針ページ内ナビゲーション">{sections.map((section) => <a key={section.href} href={section.href}>{section.label}</a>)}</nav>
      </section>

      <div className="policy-content">
        <section id="about">
          <span className="policy-number">01</span><div><h2>コトナビについて</h2>
          <p>コトナビは、生活上の困りごとを「解決までのステップ」に整理し、その場面で使えるスマホアプリへの入口を提供する情報サイトです。アプリの契約・提供・サポートは各運営事業者が行います。</p>
          <dl><dt>運営主体</dt><dd>コトナビ編集部</dd><dt>屋号</dt><dd>コトナビ</dd><dt>運営開始</dt><dd>2026年</dd><dt>サイトの目的</dt><dd>困りごとから適切な行動とアプリを見つけやすくすること</dd></dl></div>
        </section>

        <section id="editorial">
          <span className="policy-number">02</span><div><h2>編集方針</h2>
          <p>掲載候補は、利用場面との適合性、個人がスマートフォンで利用できること、公式情報を確認できることを基準に選定します。</p>
          <ul><li>広告料の有無だけで通常掲載の順位を決めません。</li><li>対応OS、料金、対象地域、提供状況は公式情報を優先します。</li><li>確認できない情報は断定せず、利用前の公式確認を案内します。</li><li>提供終了や重大な変更を確認した場合は、修正または掲載停止を行います。</li><li>掲載内容には確認日を表示し、定期的な見直しを行います。</li></ul></div>
        </section>

        <section id="advertising">
          <span className="policy-number">03</span><div><h2>広告・PR・アフィリエイト掲載方針</h2>
          <p>コトナビは、運営継続のためにスポンサー掲載や成果報酬型リンクを導入する場合があります。広告または提携関係がある掲載には、利用者が判別できるよう「広告」「PR」「成果報酬」などを明記します。</p>
          <ul><li>通常の編集掲載と有料掲載を区別します。</li><li>報酬を受け取るリンクでも、利用者の追加負担が発生するとは限りません。</li><li>広告主は編集内容や利用者の判断を保証するものではありません。</li><li>提携の有無だけを理由に、事実と異なる評価は掲載しません。</li></ul>
          <div className="policy-status"><b>現在の状態</b><span>公開中のアプリカードに、PRまたは成果報酬として有効化された掲載はありません。提携開始時に対象カードへ表示します。</span></div></div>
        </section>

        <section id="privacy">
          <span className="policy-number">04</span><div><h2>プライバシーについて</h2>
          <p>サイト改善のため、ホスティングサービスがアクセス数やページ閲覧などの利用状況を記録する場合があります。外部リンクを開いた後は、リンク先事業者のプライバシーポリシーが適用されます。</p>
          <ul><li>チェックリストの操作は、現時点ではアカウント情報と結び付けて保存しません。</li><li>問い合わせ機能を追加する際は、取得項目、利用目的、保存期間を明示します。</li><li>広告計測サービスを導入する際は、このページに事業者名と送信項目を追記します。</li><li>機密情報や健康情報などを、このサイトへ入力しないでください。</li></ul></div>
        </section>

        <section id="disclaimer">
          <span className="policy-number">05</span><div><h2>免責事項</h2>
          <p>掲載情報は確認時点の内容です。料金、機能、対応OS、提供地域、利用条件は変更されることがあります。契約や利用の前に、必ず各アプリの公式情報をご確認ください。</p>
          <p>コトナビは各アプリの提供者ではなく、外部サービスの利用結果、契約、障害、損失を保証するものではありません。緊急性がある困りごとでは、アプリよりも公的な緊急窓口や専門機関を優先してください。</p></div>
        </section>

        <section id="contact">
          <span className="policy-number">06</span><div><h2>お問い合わせ</h2>
          <p>掲載情報の修正、提供終了の報告、掲載・提携の相談は、以下のメールアドレスで受け付けています。</p>
          <p><a className="contact-email" href="mailto:kotonavi.info@proton.me">kotonavi.info@proton.me</a></p>
          <div className="contact-types"><span>情報修正</span><span>アプリ掲載</span><span>PR・提携相談</span><span>その他</span></div>
          <p className="policy-needed">通常3営業日以内を目安に確認します。内容によっては返信できない場合があります。</p></div>
        </section>
      </div>

      <footer className="policy-footer"><a href="/">← コトナビへ戻る</a><small>最終更新：2026年8月11日</small></footer>
    </main>
  );
}
