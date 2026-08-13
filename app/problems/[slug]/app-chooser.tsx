"use client";

import { useState } from "react";

type AppOption = { name: string; kind: string; body: string; fit: string; caution: string; url: string };

export function AppChooser({ options }: { options: AppOption[] }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = options[selectedIndex];
  if (!selected) return null;

  return <section className="app-chooser" aria-labelledby="app-chooser-title">
    <span>CHOOSE BY YOUR SITUATION</span><h2 id="app-chooser-title">あなたの場合は、どのアプリから見る？</h2><p>気になる項目を選ぶと、すぐ下に特徴・注意点・公式情報への入口が表示されます。迷ったら、いちばん近い困りごとから選んでください。</p>
    <div className="app-choice-list" role="group" aria-label="状況からアプリを選ぶ">{options.map((option, index) => <button key={option.name} type="button" className={selectedIndex === index ? "app-choice active" : "app-choice"} onClick={() => setSelectedIndex(index)} aria-pressed={selectedIndex === index}><span className="app-choice-number">{index + 1}</span><span><strong>{option.fit}</strong><small>{option.name}</small></span><i aria-hidden="true">{selectedIndex === index ? "✓" : "›"}</i></button>)}</div>
    <div className="selected-app" aria-live="polite"><div><small>{selected.kind}</small><h3>{selected.name}</h3><p>{selected.body}</p></div><dl><dt>向いているケース</dt><dd>{selected.fit}</dd><dt>利用前の注意</dt><dd>{selected.caution}</dd></dl><a href={selected.url} target="_blank" rel="noreferrer">{selected.name}の公式情報を確認する <span>↗</span></a></div>
  </section>;
}
