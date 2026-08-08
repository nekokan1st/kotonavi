import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const host = headerList.get("x-forwarded-host") ?? headerList.get("host") ?? "localhost:3001";
  const protocol = headerList.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;

  return {
    title: "コトナビ｜困りごとから、次にやることがわかる",
    description: "生活の53の困りごとから、次にやることと状況に合うサービスがわかる。",
    icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
    openGraph: {
      title: "コトナビ｜困ったとき、次にやることがわかる。",
      description: "生活の53の困りごとから、この場合に合うサービスまで具体的にわかる。",
      type: "website",
      images: [{ url: `${origin}/og-v4.png`, width: 1662, height: 946, alt: "コトナビ この場合は、これ。" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "コトナビ｜困ったとき、次にやることがわかる。",
      description: "生活の53の困りごとから、この場合に合うサービスまで具体的にわかる。",
      images: [`${origin}/og-v4.png`],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
