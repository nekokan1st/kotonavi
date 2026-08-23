"use client";

import { useState } from "react";
import { AppStoreVisual } from "../../app-store-visual";
import { directStoreLinks } from "../../destinations";

type AppOption = { name: string; kind: string; body: string; fit: string; caution: string; url: string };
const platformStoreLinks: Record<string, { ios?: string; android?: string }> = {
  "詐欺バスターLITE": { ios: "https://apps.apple.com/jp/app/id6743839168" },
  "Apple『探す』": { ios: "https://apps.apple.com/jp/app/%E6%8E%A2%E3%81%99/id1514844621?platform=ipad" },
  "Google デバイスを探す": { android: "https://play.google.com/store/apps/details?id=com.google.android.apps.adm" },
};
const affiliateLinks: Record<string, string> = {
  akippa: "https://px.a8.net/svt/ejp?a8mat=4BA5L7+A1E4Z6+3NAY+5YJRM",
};

export function AppChooser({ options, information = false }: { options: AppOption[]; information?: boolean }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = options[selectedIndex];
  if (!selected) return null;
  const stores = directStoreLinks[selected.name] ?? platformStoreLinks[selected.name] ?? {};
  const selectedIsStore = selected.url.includes("apps.apple.com/") || selected.url.includes("play.google.com/store/apps/");
  const ios = stores.ios ?? (selected.url.includes("apps.apple.com/") ? selected.url : undefined);
  const android = stores.android ?? (selected.url.includes("play.google.com/store/apps/") ? selected.url : undefined);
  const affiliate = affiliateLinks[selected.name];

  return <section className="app-chooser" aria-labelledby="app-chooser-title">
    <span>{information ? "OFFICIAL INFORMATION & HELP" : "CHOOSE BY YOUR SITUATION"}</span><h2 id="app-chooser-title">{information ? "公式情報・相談先を確認する" : "あなたの場合は、どのアプリから見る？"}</h2><p>{information ? "緊急時や契約・医療に関する判断では、アプリの案内よりも公的機関・事業者の公式情報を優先します。" : "気になる項目を選ぶと、すぐ下に特徴・注意点・公式情報への入口が表示されます。迷ったら、いちばん近い困りごとから選んでください。"}</p>
    <div className="app-choice-list" role="group" aria-label={information ? "公式情報・相談先を選ぶ" : "状況からアプリを選ぶ"}>{options.map((option, index) => <button key={option.name} type="button" className={selectedIndex === index ? "app-choice active" : "app-choice"} onClick={() => setSelectedIndex(index)} aria-pressed={selectedIndex === index}><span className="app-choice-number">{index + 1}</span><span><strong>{option.fit}</strong><small>{option.name}</small></span><i aria-hidden="true">{selectedIndex === index ? "✓" : "›"}</i></button>)}</div>
    <div className="selected-app" aria-live="polite">{!information && <AppStoreVisual name={selected.name} variant="selected" />}<div className="selected-app-copy"><small>{selected.kind}</small><h3>{selected.name}{affiliate && <em className="ad-label affiliate">広告</em>}</h3><p>{selected.body}</p><dl><dt>{information ? "確認する場面" : "向いているケース"}</dt><dd>{selected.fit}</dd><dt>利用前の注意</dt><dd>{selected.caution}</dd></dl><div className="selected-app-links">{!selectedIsStore && <a className="official-link" href={affiliate ?? selected.url} target="_blank" rel={affiliate ? "noreferrer nofollow sponsored" : "noreferrer"}>{affiliate ? "公式サイト（広告）" : "公式情報"} <span>↗</span></a>}{ios && <a href={ios} target="_blank" rel="noreferrer">App Store <span>↗</span></a>}{android && <a href={android} target="_blank" rel="noreferrer">Google Play <span>↗</span></a>}</div></div></div>
  </section>;
}
