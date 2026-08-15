import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

test("every published app problem has a detail CTA destination", async () => {
  const source = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  assert.match(source, /problemDetailSlugs\[selected\.id\]\s*\?[^\n]+:\s*`\/problems\/view\?problem=\$\{encodeURIComponent\(selected\.id\)\}`/);
  assert.match(source, /export const appProblems/);
});
