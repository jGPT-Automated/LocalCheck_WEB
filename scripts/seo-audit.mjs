// Usage: node scripts/seo-audit.mjs [origin] [report.json]
// Checks response HTML without executing JavaScript. Timings are HTTP timings,
// not browser load time or Core Web Vitals.
import { writeFile } from "node:fs/promises";
import { performance } from "node:perf_hooks";

const origin = new URL(process.argv[2] || "https://localchecksports.com").origin;
const canonicalOrigin = "https://localchecksports.com";
const errors = [];
const decode = (value) => value.replaceAll("&amp;", "&").replaceAll("&quot;", '"');

async function request(path) {
  const start = performance.now();
  const response = await fetch(new URL(path, origin), { redirect: "manual", signal: AbortSignal.timeout(20000) });
  return { status: response.status, headers: response.headers, html: await response.text(), milliseconds: Math.round(performance.now() - start) };
}

async function pool(items, task) {
  const results = new Array(items.length);
  let cursor = 0;
  await Promise.all(Array.from({ length: Math.min(4, items.length) }, async () => {
    while (cursor < items.length) {
      const index = cursor++;
      results[index] = await task(items[index]);
    }
  }));
  return results;
}

const robots = await request("/robots.txt");
if (robots.status !== 200) errors.push("robots.txt must return 200");
if (!robots.html.includes(`${canonicalOrigin}/sitemap.xml`)) errors.push("robots.txt is missing the sitemap URL");
const groups = robots.html.split(/\n\s*\n/).filter((group) => /User-Agent:\s*(?:\*|Googlebot)\s*$/im.test(group));
if (!groups.length || groups.some((group) => /^Disallow:\s*\/\s*$/im.test(group))) errors.push("Check Googlebot permissions in robots.txt");

const sitemap = await request("/sitemap.xml");
if (sitemap.status !== 200) errors.push("sitemap.xml must return 200");
const urls = [...sitemap.html.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => new URL(decode(match[1])));
if (!urls.length) errors.push("Sitemap is empty");
const paths = urls.map((url) => url.pathname);
if (new Set(paths).size !== paths.length) errors.push("Sitemap contains duplicate paths");
if (urls.some((url) => url.origin !== canonicalOrigin)) errors.push("Sitemap contains a noncanonical hostname");

const pages = await pool(paths, async (path) => {
  try {
    const response = await request(path);
    const html = response.html;
    const canonical = html.match(/<link[^>]*rel="canonical"[^>]*href="([^"]+)"/)?.[1];
    const description = html.match(/<meta[^>]*name="description"[^>]*content="([^"]+)"/)?.[1];
    const h1 = [...html.matchAll(/<h1[\s>]/g)].length;
    const links = [...html.matchAll(/<a\b[^>]*href="([^"]+)"/g)].map((match) => new URL(decode(match[1]), new URL(path, origin)))
      .filter((url) => [origin, canonicalOrigin].includes(url.origin)).map((url) => url.pathname);
    if (response.status !== 200) errors.push(`${path}: status ${response.status}`);
    if (h1 !== 1) errors.push(`${path}: ${h1} H1 elements`);
    if (!description) errors.push(`${path}: missing description`);
    if (canonical?.replace(/\/$/, "") !== `${canonicalOrigin}${path}`.replace(/\/$/, "")) errors.push(`${path}: incorrect canonical ${canonical}`);
    if (/<meta[^>]*name="(?:robots|googlebot)"[^>]*content="[^"]*noindex/i.test(html) || /noindex/i.test(response.headers.get("x-robots-tag") || "")) errors.push(`${path}: noindex`);
    for (const image of html.matchAll(/<img\b[^>]*>/g)) {
      if (!/\balt="[^"]*"/.test(image[0])) errors.push(`${path}: image missing alt attribute`);
      if (!/\bwidth="\d+"/.test(image[0]) || !/\bheight="\d+"/.test(image[0])) errors.push(`${path}: image missing dimensions`);
    }
    for (const schema of html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
      try { JSON.parse(schema[1]); } catch { errors.push(`${path}: invalid JSON-LD`); }
    }
    return { path, status: response.status, milliseconds: response.milliseconds, h1, canonical, description, links };
  } catch (error) {
    errors.push(`${path}: ${error.message}`);
    return { path, links: [] };
  }
});

const byPath = new Map(pages.map((page) => [page.path, page]));
const reachable = new Set(["/"]);
const queue = ["/"];
while (queue.length) {
  for (const link of byPath.get(queue.shift())?.links || []) {
    if (!reachable.has(link)) { reachable.add(link); queue.push(link); }
  }
}
const orphans = paths.filter((path) => !reachable.has(path));
for (const path of orphans) errors.push(`${path}: unreachable from homepage links`);
const extraLinks = [...new Set(pages.flatMap((page) => page.links))].filter((path) => !byPath.has(path));
await pool(extraLinks, async (path) => {
  try {
    const result = await request(path);
    if (result.status >= 400) errors.push(`${path}: internal link status ${result.status}`);
    if (result.status >= 300 && result.status < 400) errors.push(`${path}: internal link redirects to ${result.headers.get("location")}`);
  } catch (error) { errors.push(`${path}: ${error.message}`); }
});
for (const path of ["/seo-audit-missing-page", "/courts/seo-audit-missing-court"]) {
  if ((await request(path)).status !== 404) errors.push(`${path}: unknown route must return 404`);
}

const report = { checkedAt: new Date().toISOString(), origin, sitemapPages: pages.length, orphans, errors, pages };
if (process.argv[3]) await writeFile(process.argv[3], JSON.stringify(report, null, 2) + "\n");
console.log(JSON.stringify({ origin, sitemapPages: pages.length, orphanCount: orphans.length, errors }, null, 2));
process.exitCode = errors.length ? 1 : 0;
