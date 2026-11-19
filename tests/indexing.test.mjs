import assert from "node:assert/strict";
import test from "node:test";

async function render(path) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("indexing", `${process.pid}-${Date.now()}-${path}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request(`https://kotonaviapp.com${path}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

const noindexMeta = /<meta[^>]+name="robots"[^>]+content="[^"]*noindex/i;

test("template-only problem pages are noindex but still reachable", async () => {
  const response = await render("/problems/coordinate-schedules");
  assert.equal(response.status, 200);
  assert.match(await response.text(), noindexMeta);
});

test("written problem pages stay indexable", async () => {
  for (const path of ["/problems/dispose-large-appliances", "/problems/track-parcels-with-apps"]) {
    const response = await render(path);
    assert.equal(response.status, 200, path);
    assert.doesNotMatch(await response.text(), noindexMeta, path);
  }
});

test("sitemap lists written pages and omits template-only pages", async () => {
  const response = await render("/sitemap.xml");
  assert.equal(response.status, 200);
  const xml = await response.text();
  assert.match(xml, /\/problems\/dispose-large-appliances</);
  assert.doesNotMatch(xml, /\/problems\/coordinate-schedules</);
});
