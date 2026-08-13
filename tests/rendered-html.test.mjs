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
  assert.match(html, /困りごとから、/);
  assert.match(html, /次の一歩へ/);
  assert.match(html, /<h1>困りごとから、次の一歩へ。<\/h1>/);
  assert.doesNotMatch(html, /<h1>困りごとから、<br\s*\/>/);
  assert.match(html, /困りごとに合うスマホアプリ/);
  assert.match(html, /スマホアプリに限定/);
  assert.doesNotMatch(html, /RAKURA|全国版救急受診ガイド Q助/);
  assert.match(html, /favicon-48\.png/);
  assert.match(html, /apple-touch-icon\.png/);
  assert.match(html, /manifest\.webmanifest/);
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
  assert.match(page, /"Yahoo!防災速報": \{ ios:.*android:/);
  assert.match(page, /"お薬手帳プラス": \{ ios:.*android:/);
  assert.match(page, /"Zaim": \{ ios:.*android:/);
  assert.match(page, /"ぴよログ": \{ ios:.*android:/);
  assert.match(page, /"Google Authenticator": \{ ios:.*android:/);
  assert.match(page, /"乗換NAVITIME": \{ ios:/);
  assert.match(page, /"DELISH KITCHEN": \{ android:/);
  assert.match(page, /"Shufoo!": \{ ios:.*android:/);
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
  assert.match(page, /広告掲載枠/);
  assert.match(page, /ふたり分の備えを、ひとつのリュックに。/);
  assert.match(page, /セット内容を確認する/);
  assert.match(page, /rel="noreferrer nofollow sponsored"/);
  assert.match(page, /rpx\.a8\.net\/svt\/ejp/);
  assert.match(page, /affiliate-impression/);
  assert.match(page, /const misocaAffiliateUrl = "https:\/\/px\.a8\.net\/svt\/ejp\?a8mat=4BA4T7\+BRWNHU\+2ZJ4\+BW8O2/);
  assert.match(page, /name: "Misoca"[\s\S]*?href: misocaAffiliateUrl[\s\S]*?affiliate: true[\s\S]*?affiliateImpression: misocaAffiliateImpressionUrl/);
  assert.match(page, /service\.affiliate && <em className="ad-label affiliate">広告<\/em>/);
  assert.match(page, /広告提携は掲載順位に影響しません/);
  assert.match(page, /className="contextual-affiliate"/);
  assert.match(css, /(?:^|})footer > div \{ display: flex; flex-wrap: wrap;/);
  assert.match(css, /(?:^|})footer > div a \{ padding: 0 14px; border-left:/);
  assert.match(page, /disasterKitProblemIds\.has\(selected\.id\)/);
  assert.match(page, /この困りごとに関連する広告/);
  assert.match(page, /サービスを見る前に、整理したい\{selected\.tasks\.length\}つのこと/);
  assert.match(page, /サービスや窓口が困りごとのどの部分を助けるのか確認/);
  assert.match(page, /ここで操作や登録をする必要はありません/);
  assert.doesNotMatch(page, /行動の進み具合|setCompleted|completed\.length/);
  assert.match(css, /\.sponsor-slot/);
  assert.match(css, /\.single-phase-context/);
  assert.match(page, /横にスワイプして他のテーマを見る/);
  assert.match(css, /\.category-scroll-hint/);
});

test("server-renders indexable problem landing pages", async () => {
  const indexResponse = await render("/problems");
  assert.equal(indexResponse.status, 200);
  assert.match(await indexResponse.text(), /困りごとから、使えるアプリを探す/);

  const problemResponse = await render("/problems/scam-call-check");
  assert.equal(problemResponse.status, 200);
  const html = await problemResponse.text();
  assert.match(html, /詐欺電話か確認したいとき/);
  assert.match(html, /詐欺バスターLITE/);
  assert.match(html, /あなたの場合は、どのアプリから見る？/);
  assert.match(html, /こんな場合におすすめ/);
  assert.match(html, /application\/ld\+json/);
});

test("sitemap includes all problem landing pages", async () => {
  const [sitemap, data] = await Promise.all([
    readFile(new URL("../app/sitemap.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/problems/data.ts", import.meta.url), "utf8"),
  ]);
  assert.match(sitemap, /problemPages\.map/);
  assert.match(data, /slug: "scam-call-check"/);
  assert.doesNotMatch(data, /全国版救急受診ガイド Q助|slug: "ambulance-or-hospital"/);
  assert.match(data, /slug: "disaster-alert-apps"/);
  assert.match(data, /slug: "choose-household-budget-app"/);
  assert.match(data, /slug: "set-up-two-factor-authentication"/);
  assert.match(data, /slug: "choose-recipe-and-flyer-apps"/);
});

test("server-renders expanded app guide pages", async () => {
  const cases = [
    ["/problems/disaster-alert-apps", /Yahoo!防災速報/],
    ["/problems/choose-household-budget-app", /毎月のお金を把握したい人の家計簿アプリ比較[\s\S]*マネーフォワード ME[\s\S]*Zaim[\s\S]*Moneytree[\s\S]*OsidOri/],
    ["/problems/set-up-two-factor-authentication", /Google Authenticator/],
    ["/problems/choose-recipe-and-flyer-apps", /DELISH KITCHEN/],
  ];
  for (const [path, expected] of cases) {
    const response = await render(path);
    assert.equal(response.status, 200);
    assert.match(await response.text(), expected);
  }
});

test("adds listed app names to every problem guide's search metadata", async () => {
  const response = await render("/problems/manage-medication-app");
  const html = await response.text();
  assert.match(html, /<title>薬と服用履歴をスマホで管理する方法｜お薬手帳プラス・EPARKお薬手帳・頭痛ーる｜コトナビ<\/title>/);
  assert.match(html, /お薬手帳プラス・EPARKお薬手帳・頭痛ーるの向いている状況と注意点/);
});
