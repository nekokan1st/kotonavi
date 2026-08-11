import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const host = headerList.get("x-forwarded-host") ?? headerList.get("host") ?? "localhost:3001";
  const protocol = headerList.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;

  return {
    metadataBase: new URL(origin),
    title: {
      default: "コトナビ｜困りごとから、次の一歩へ",
      template: "%s",
    },
    description: "生活の困りごとを解決までの順番に整理し、役立つアプリ・Webサービス・公的窓口を案内します。",
    icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
    manifest: "/manifest.webmanifest",
    alternates: { canonical: "/" },
    robots: { index: true, follow: true },
    openGraph: {
      title: "コトナビ｜困りごとから、次の一歩へ。",
      description: "解決までのステップと、状況に合うアプリ・Webサービス・公的窓口がわかる。",
      type: "website",
      images: [{ url: `${origin}/og-v5.png`, width: 1662, height: 946, alt: "コトナビ 困りごとから、次の一歩へ。" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "コトナビ｜困りごとから、次の一歩へ。",
      description: "解決までのステップと、状況に合うアプリ・Webサービス・公的窓口がわかる。",
      images: [`${origin}/og-v5.png`],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "コトナビ",
    url: "https://kotonaviapp.com",
    description: "生活の困りごとを解決までの順番に整理し、役立つアプリ・Webサービス・公的窓口を案内するサイト。",
    inLanguage: "ja",
  };
  return (
    <html lang="ja">
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      </body>
    </html>
  );
}
