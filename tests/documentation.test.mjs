import assert from "node:assert/strict";
import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const root = path.resolve(import.meta.dirname, "..");
const scripts = JSON.parse(await readFile(path.join(root, "package.json"), "utf8")).scripts;

async function markdownFiles(directory) {
  const entries = await readdir(path.join(root, directory), { withFileTypes: true });
  const groups = await Promise.all(entries.map(async (entry) => {
    const relative = path.join(directory, entry.name);
    if (entry.isDirectory()) return markdownFiles(relative);
    return entry.name.endsWith(".md") ? [relative] : [];
  }));
  return groups.flat();
}

const files = ["README.md", "AGENTS.md", "PRODUCT.md", "DESIGN.md",
  ...await markdownFiles("docs"), ...await markdownFiles("strategy"),
  ".github/pull_request_template.md"];

test("contributor documentation links to existing repository files", async () => {
  for (const file of files) {
    const content = await readFile(path.join(root, file), "utf8");
    for (const match of content.matchAll(/\[[^\]\n]*\]\(([^\s)]+)\)/g)) {
      const target = match[1].split("#")[0];
      if (!target || /^[a-z][a-z\d+.-]*:/i.test(target)) continue;
      const destination = path.resolve(root, path.dirname(file), decodeURIComponent(target));
      assert.ok(destination.startsWith(`${root}${path.sep}`), `${file}: link leaves repository: ${target}`);
      await assert.doesNotReject(stat(destination), `${file}: missing link target ${target}`);
    }
  }
});

test("documented npm run commands exist in package.json", async () => {
  for (const file of files) {
    const content = await readFile(path.join(root, file), "utf8");
    for (const match of content.matchAll(/\bnpm run ([\w:-]+)/g)) {
      assert.ok(Object.hasOwn(scripts, match[1]), `${file}: unknown npm script ${match[1]}`);
    }
  }
});
