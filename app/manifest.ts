import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "コトナビ",
    short_name: "コトナビ",
    description: "困りごとから、解決までのステップと役立つサービス・窓口がわかる。",
    start_url: "/",
    display: "standalone",
    background_color: "#f9f8f4",
    theme_color: "#126c51",
    lang: "ja",
    icons: [{ src: "/favicon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
