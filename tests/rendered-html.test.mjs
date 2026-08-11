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

test("uses verified destinations, broad search fields, and a bottom sponsor slot", async () => {
  const [page, css] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);

  assert.match(page, /const directStoreLinks/);
  assert.match(page, /"Peatix": \{ ios:/);
  assert.match(page, /"GOOSE": \{ ios:.*android:/);
  assert.match(page, /destinationsFor\(service\)/);
  assert.doesNotMatch(page, /apps\.apple\.com\/jp\/search|play\.google\.com\/store\/search/);
  assert.match(page, /family-medical-share/);
  assert.match(page, /family-access-plan/);
  assert.match(page, /problem\.tasks\.flatMap/);
  assert.match(page, /problem\.services\.flatMap/);
  assert.match(page, /tokens\.every/);
  assert.match(page, /className="sponsor-slot"/);
  assert.match(page, /アプリを見る前に、整理したい\{selected\.tasks\.length\}つのこと/);
  assert.match(page, /アプリが困りごとのどの部分を助けるのか確認/);
  assert.match(page, /ここで操作や登録をする必要はありません/);
  assert.doesNotMatch(page, /行動の進み具合|setCompleted|completed\.length/);
  assert.match(css, /\.sponsor-slot/);
  assert.match(css, /\.single-phase-context/);
});
