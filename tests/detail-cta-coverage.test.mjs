import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

test("every published problem has a detail CTA destination and is navigable", async () => {
  const source = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  const indexSource = await readFile(new URL("../app/problems/problems-index-client.tsx", import.meta.url), "utf8");
  assert.match(source, /problemDetailSlugs\[selected\.id\]\s*\?[^\n]+:\s*`\/problems\/view\?problem=\$\{encodeURIComponent\(selected\.id\)\}`/);
  assert.match(source, /export const appProblems/);
  assert.match(source, /export const navigableProblems/);
  assert.match(indexSource, /import \{ navigableProblems, problemDetailSlugs \}/);

  const problemIds = [...source.matchAll(/^    id: "([^"]+)"/gm)].map((match) => match[1]).slice(13);
  const detailSource = source.slice(source.indexOf("export const problemDetailSlugs"));
  const mappedIds = [...detailSource.matchAll(/"([^"]+)":\s*"[^"]+"/g)].map((match) => match[1]);
  assert.deepEqual(new Set(mappedIds), new Set(problemIds));
});
