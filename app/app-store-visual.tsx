"use client";

import { useEffect, useState } from "react";
import { directStoreLinks } from "./destinations";

type StoreVisual = { icon: string; screenshot: string };

export function AppStoreVisual({ name, accent = "#1878c9", variant = "card" }: { name: string; accent?: string; variant?: "card" | "selected" }) {
  const iosUrl = directStoreLinks[name]?.ios;
  const appId = iosUrl?.match(/\/id(\d+)/)?.[1];
  const [visual, setVisual] = useState<StoreVisual | null>(null);

  useEffect(() => {
    if (!appId) return;
    const controller = new AbortController();
    fetch(`https://itunes.apple.com/lookup?id=${appId}&country=jp`, { signal: controller.signal })
      .then((response) => response.ok ? response.json() : null)
      .then((data) => {
        const app = data?.results?.[0];
        if (app?.artworkUrl512 && app?.screenshotUrls?.[0]) setVisual({ icon: app.artworkUrl512, screenshot: app.screenshotUrls[0] });
      })
      .catch(() => undefined);
    return () => controller.abort();
  }, [appId]);

  const iconModifier = variant === "selected" ? " selected-app-icon" : "";
  const previewModifier = variant === "selected" ? " selected-app-visual" : "";
  if (!visual) return <><div className={`store-app-icon${iconModifier}`} style={{ background: accent }} aria-label={`${name}のアプリアイコン`}>{name.slice(0, 1)}</div><div className={`service-visual visual-unavailable${previewModifier}`} aria-label={`${name}の公式ストア画面イメージは準備中`}><span>ストア画像<br />準備中</span></div></>;
  return <><img className={`store-app-icon${iconModifier}`} src={visual.icon} alt={`${name}のアプリアイコン`} /><figure className={`service-visual${previewModifier}`}><img className="service-visual-screen" src={visual.screenshot} alt={`${name}の公式ストア画面イメージ`} /><figcaption>公式ストアの画面イメージ</figcaption></figure></>;
}
