import assert from "node:assert/strict";
import test from "node:test";

const env = { ASSETS: { fetch: async () => new Response("asset", { status: 200 }) } };
const ctx = { waitUntil() {}, passThroughOnException() {} };

async function loadWorker() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("security-audit", `${process.pid}-${Date.now()}`);
  return (await import(workerUrl.href)).default;
}

test("pages, redirects and API responses carry security headers", async () => {
  const worker = await loadWorker();
  const requests = [
    new Request("https://kotonaviapp.com/", { headers: { accept: "text/html" } }),
    new Request("https://www.kotonaviapp.com/problems"),
    new Request("https://kotonaviapp.com/neko"),
    new Request("https://kotonaviapp.com/neko/"),
    new Request("https://kotonaviapp.com/api/events", { method: "POST", body: "{}" }),
  ];
  for (const request of requests) {
    const response = await worker.fetch(request, env, ctx);
    const label = `${request.method} ${request.url}`;
    assert.equal(response.headers.get("x-content-type-options"), "nosniff", label);
    assert.equal(response.headers.get("x-frame-options"), "SAMEORIGIN", label);
    assert.match(response.headers.get("strict-transport-security") ?? "", /max-age=31536000/, label);
    assert.match(response.headers.get("content-security-policy") ?? "", /frame-ancestors 'self'/, label);
    assert.ok(response.headers.get("referrer-policy"), label);
  }
});

test("redirects keep their status and location", async () => {
  const worker = await loadWorker();
  const response = await worker.fetch(new Request("https://www.kotonaviapp.com/guides"), env, ctx);
  assert.equal(response.status, 308);
  assert.equal(response.headers.get("location"), "https://kotonaviapp.com/guides");
});

test("staging keeps noindex alongside security headers", async () => {
  const worker = await loadWorker();
  const response = await worker.fetch(new Request("https://staging.kotonaviapp.com/", { headers: { accept: "text/html" } }), env, ctx);
  assert.match(response.headers.get("x-robots-tag") ?? "", /noindex/);
  assert.equal(response.headers.get("x-frame-options"), "SAMEORIGIN");
});
