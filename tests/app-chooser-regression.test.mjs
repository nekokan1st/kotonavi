import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { problemPages } from "../app/problems/data.ts";
import { directStoreLinks } from "../app/destinations.ts";

test("the lost-item choices have distinct verified App Store IDs and visuals follow the active choice", async () => {
  const [destinations, chooser, visual] = await Promise.all([
    readFile(new URL("../app/destinations.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/problems/[slug]/app-chooser.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/app-store-visual.tsx", import.meta.url), "utf8"),
  ]);
  const appIds = ["MAMORIO", "Tile", "Apple『探す』"].map((name) => {
    const link = destinations.match(new RegExp(`"${name}": \\{ ios: "[^"]*/id(\\d+)`));
    assert.ok(link, `${name} needs a verified App Store ID`);
    return link[1];
  });
  assert.equal(new Set(appIds).size, 3);
  assert.match(chooser, /<AppStoreVisual key=\{selected\.name\} name=\{selected\.name\}/);
  assert.match(visual, /visual\.appId !== appId/);
});

test("information choices use a full-width detail panel without image columns", async () => {
  const [chooser, css] = await Promise.all([
    readFile(new URL("../app/problems/[slug]/app-chooser.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);
  assert.match(chooser, /information \? "selected-app information" : "selected-app"/);
  assert.match(css, /\.selected-app\.information\s*\{\s*grid-template-columns:\s*minmax\(0,\s*1fr\)/);
});

test("renamed apps use the current store identity throughout the site", async () => {
  const home = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  const medicalPage = problemPages.find((page) => page.slug === "online-medical-appointment");
  assert.ok(medicalPage);
  assert.equal(medicalPage.options[0]?.name, "melmo（メルモ）");
  assert.equal(medicalPage.options[0]?.url, "https://melmo-app.com/");
  assert.equal(directStoreLinks["melmo（メルモ）"]?.ios, "https://apps.apple.com/jp/app/id1106261604");
  assert.match(home, /name: "melmo（メルモ）"/);
  assert.doesNotMatch(home, /name: "CLINICS"/);
});

test("new app comparisons remain linked from the navigator with distinct store visuals", async () => {
  const home = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  const expected = new Map([
    ["daily-parcel", ["ヤマト運輸公式アプリ", "郵便局公式アプリ", "佐川急便公式アプリ"]],
    ["digital-scan", ["Adobe Scan", "Google ドライブ"]],
    ["health-sleep", ["Sleep Cycle", "熟睡アラーム"]],
  ]);

  for (const [problemId, names] of expected) {
    assert.match(home, new RegExp(`"${problemId}": "[^"]+"`), `${problemId}: missing detail link`);
    const page = problemPages.find((item) => item.problemId === problemId);
    assert.ok(page, `${problemId}: missing editorial page`);
    assert.deepEqual(page.options.map((option) => option.name), names);
    const storeIds = names.map((name) => {
      assert.match(home, new RegExp(`"${name}"`), `${name}: missing home app allowlist`);
      const stores = directStoreLinks[name];
      assert.ok(stores?.ios?.includes("apps.apple.com/jp/app/id"), `${name}: missing App Store visual source`);
      assert.ok(stores?.android?.includes("play.google.com/store/apps/details?id="), `${name}: missing Google Play link`);
      return stores.ios.match(/id(\d+)/)?.[1];
    });
    assert.equal(new Set(storeIds).size, names.length, `${problemId}: duplicate App Store visual`);
  }
});

test("every editorial problem page renders the correct chooser variant and all choices", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("chooser-audit", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  assert.ok(problemPages.length >= 61);

  for (const page of problemPages) {
    const response = await worker.fetch(
      new Request(`http://localhost/problems/${page.slug}`, { headers: { accept: "text/html" } }),
      { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
      { waitUntil() {}, passThroughOnException() {} },
    );
    assert.equal(response.status, 200, page.slug);
    const html = await response.text();
    const chooserClass = page.contentType === "information" ? "selected-app information" : "selected-app";
    assert.ok(html.includes(`class="${chooserClass}"`), `${page.slug}: wrong chooser layout`);
    assert.equal(
      [...html.matchAll(/class="app-choice(?: active)?"/g)].length,
      page.options.length,
      `${page.slug}: missing choices`,
    );
  }
});
