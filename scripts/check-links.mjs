// 外部リンク監視: app/ 配下のソースからURLを抽出し、HTTP状態を確認する。
// 使い方: node scripts/check-links.mjs > report.md （異常があれば exit code 1）
import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

async function sourceFiles(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...await sourceFiles(path));
    else if (/\.(ts|tsx)$/.test(entry.name)) out.push(path);
  }
  return out;
}

const SKIP = [/^https?:\/\/(localhost|127\.0\.0\.1)/, /\.local(\/|$)/, /\$\{/, /kotonaviapp\.com/, /a8\.net\/0\.gif/, /schema\.org/, /w3\.org/];
const urls = new Map();
for (const file of await sourceFiles("app")) {
  const text = await readFile(file, "utf8");
  for (const match of text.matchAll(/https?:\/\/[^\s"'`<>)\]]+/g)) {
    const url = match[0].replace(/[.,;]+$/, "");
    if (SKIP.some((re) => re.test(url))) continue;
    if (!urls.has(url)) urls.set(url, new Set());
    urls.get(url).add(file);
  }
}

const UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0 Safari/537.36";
async function check(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 20000);
  try {
    const res = await fetch(url, { redirect: "follow", signal: controller.signal, headers: { "user-agent": UA, "accept-language": "ja,en;q=0.8" } });
    await res.body?.cancel();
    return { status: res.status, finalUrl: res.url };
  } catch (error) {
    return { status: 0, error: error.name === "AbortError" ? "timeout" : String(error.cause?.code ?? error.message) };
  } finally {
    clearTimeout(timer);
  }
}

const list = [...urls.keys()];
const results = [];
for (let i = 0; i < list.length; i += 8) {
  results.push(...await Promise.all(list.slice(i, i + 8).map(async (url) => ({ url, ...await check(url) }))));
}

// 403/429などボット対策による拒否はリンク切れと断定しない
const broken = results.filter((r) => r.status === 0 || r.status === 404 || r.status === 410 || r.status >= 500);
const review = results.filter((r) => [401, 403, 429].includes(r.status) || (r.status >= 400 && r.status < 500 && ![404, 410].includes(r.status)));

const row = (r) => `| ${r.url} | ${r.status || r.error} | ${r.finalUrl && r.finalUrl !== r.url ? r.finalUrl : ""} | ${[...urls.get(r.url)].join("<br>")} |`;
const lines = [
  `# 外部リンク監視 ${new Date().toISOString().slice(0, 10)}`,
  "",
  `確認数: ${results.length} / 要対応: ${broken.length} / 目視確認: ${review.length}`,
  "",
];
if (broken.length) lines.push("## 要対応（404・410・5xx・接続失敗）", "", "| URL | 状態 | 転送先 | 掲載ファイル |", "|---|---|---|---|", ...broken.map(row), "");
if (review.length) lines.push("## 目視確認（403・429など。ボット対策の可能性）", "", "| URL | 状態 | 転送先 | 掲載ファイル |", "|---|---|---|---|", ...review.map(row), "");
console.log(lines.join("\n"));
process.exitCode = broken.length ? 1 : 0;
