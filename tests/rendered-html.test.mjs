import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the Kotonavi home page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>コトナビ/);
  assert.match(html, /困りごとから/);
  assert.doesNotMatch(html, /Your site is taking shape|Building your site/);
});

test("server-renders the policy page", async () => {
  const response = await render("/info");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /広告・PR・アフィリエイト掲載方針/);
  assert.match(html, /プライバシー/);
  assert.match(html, /コトナビ編集部/);
  assert.match(html, /kotonavi\.info@proton\.me/);
});

test("uses the production domain in crawl metadata", async () => {
  const [layout, sitemap, robots] = await Promise.all([
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/sitemap.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/robots.ts", import.meta.url), "utf8"),
  ]);
  for (const source of [layout, sitemap, robots]) {
    assert.match(source, /https:\/\/kotonaviapp\.com/);
    assert.doesNotMatch(source, /kotonavi-moving-guide\.maronnu\.chatgpt\.site/);
  }
});

test("server-renders the guide index and search landing pages", async () => {
  const indexResponse = await render("/guides");
  assert.equal(indexResponse.status, 200);
  assert.match(await indexResponse.text(), /暮らしの困りごと解決ガイド/);

  const guideResponse = await render("/guides/move-in-photo-record");
  assert.equal(guideResponse.status, 200);
  const html = await guideResponse.text();
  assert.match(html, /入居時の傷や汚れを記録する方法/);
  assert.match(html, /コトナビ編集部/);
  assert.match(html, /application\/ld\+json/);
});

test("every guide CTA targets an existing problem", async () => {
  const [page, guideData] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/guides/data.ts", import.meta.url), "utf8"),
  ]);
  const problemIds = new Set([...page.matchAll(/\bid:\s*"([^"]+)"\s*,\s*theme:/g)].map((match) => match[1]));
  const guideProblemIds = [...guideData.matchAll(/\bproblemId:\s*"([^"]+)"/g)].map((match) => match[1]);
  assert.ok(guideProblemIds.length > 0);
  for (const problemId of guideProblemIds) {
    assert.ok(problemIds.has(problemId), `guide CTA target does not exist: ${problemId}`);
  }
});

test("uses verified destinations, broad search fields, and a bottom sponsor slot", async () => {
  const [page, css] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);

  assert.match(page, /const directStoreLinks/);
  assert.match(page, /"Peatix": \{ ios:/);
  assert.match(page, /"GOOSE": \{ ios:.*android:/);
  assert.match(page, /"母子モ": \{ ios:.*android:/);
  assert.match(page, /"Google One バックアップ": \{ ios:.*android:/);
  assert.match(page, /"PetBacker": \{ ios:.*android:/);
  assert.match(page, /destinationsFor\(service\)/);
  assert.match(page, /className="official-link"/);
  assert.doesNotMatch(css, /\.app-links a:first-child/);
  assert.doesNotMatch(page, /apps\.apple\.com\/jp\/search|play\.google\.com\/store\/search/);
  assert.match(page, /family-medical-share/);
  assert.match(page, /family-access-plan/);
  assert.match(page, /problem\.tasks\.flatMap/);
  assert.match(page, /problem\.services\.flatMap/);
  assert.match(page, /tokens\.every/);
  assert.match(page, /className="sponsor-slot has-affiliate"/);
  assert.match(page, /広告・アフィリエイト掲載枠/);
  assert.match(page, /ふたり分の備えを、ひとつのリュックに。/);
  assert.match(page, /セット内容を確認する/);
  assert.match(page, /rel="noreferrer nofollow sponsored"/);
  assert.match(page, /rpx\.a8\.net\/svt\/ejp/);
  assert.match(page, /affiliate-impression/);
  assert.match(page, /className="contextual-affiliate"/);
  assert.match(css, /(?:^|})footer > div \{ display: flex; flex-wrap: wrap;/);
  assert.match(css, /(?:^|})footer > div a \{ padding: 0 14px; border-left:/);
  assert.match(page, /disasterKitProblemIds\.has\(selected\.id\)/);
  assert.match(page, /この困りごとに関連する広告/);
  assert.match(page, /アプリを見る前に、整理したい\{selected\.tasks\.length\}つのこと/);
  assert.match(page, /アプリが困りごとのどの部分を助けるのか確認/);
  assert.match(page, /ここで操作や登録をする必要はありません/);
  assert.doesNotMatch(page, /行動の進み具合|setCompleted|completed\.length/);
  assert.match(css, /\.sponsor-slot/);
  assert.match(css, /\.single-phase-context/);
  assert.match(page, /横にスワイプして他のテーマを見る/);
  assert.match(css, /\.category-scroll-hint/);
});
