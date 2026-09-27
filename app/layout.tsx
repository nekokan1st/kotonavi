import type { Metadata } from "next";
import { headers } from "next/headers";
import Script from "next/script";
import "./globals.css";
import Analytics from "./analytics";
import GoogleAnalyticsPageView from "./google-analytics";

const GA_MEASUREMENT_ID = "G-3QE4Z77S21";
const SITE_DESCRIPTION =
  "家計、健康、防災、子育て、引っ越し、仕事など、生活の困りごとを解決までの順番に整理。確認すべき手順、公的な相談先、状況に合うスマホアプリを分かりやすく案内します。";

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
    description: SITE_DESCRIPTION,
    icons: {
      icon: [
        { url: "/favicon-48.png", type: "image/png", sizes: "48x48" },
        { url: "/favicon.svg", type: "image/svg+xml", sizes: "any" },
      ],
      shortcut: "/favicon-48.png",
      apple: [{ url: "/apple-touch-icon.png", type: "image/png", sizes: "180x180" }],
    },
    manifest: "/manifest.webmanifest",
    alternates: { canonical: "/" },
    robots: { index: true, follow: true },
    openGraph: {
      title: "コトナビ｜困りごとから、次の一歩へ。",
      description: SITE_DESCRIPTION,
      type: "website",
      images: [{ url: `${origin}/og-kotonavi-next-step-v2.png`, width: 1731, height: 909, alt: "コトナビ 困りごとから、次の一歩へ。" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "コトナビ｜困りごとから、次の一歩へ。",
      description: SITE_DESCRIPTION,
      images: [`${origin}/og-kotonavi-next-step-v2.png`],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "コトナビ",
    url: "https://kotonaviapp.com",
    description: SITE_DESCRIPTION,
    inLanguage: "ja",
  };
  return (
    <html lang="ja">
      <body>
        <Analytics />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}');`}
        </Script>
        <GoogleAnalyticsPageView />
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      </body>
    </html>
  );
}
