import type { MetadataRoute } from "next";
import { SITE_URL } from "../lib/site";

/**
 * Named crawlers we explicitly allow.
 *
 * Names verified against the vendors' current official documentation (see the
 * PR description for the exact URLs):
 *   - OpenAI:      OAI-SearchBot, ChatGPT-User, GPTBot
 *   - Perplexity:  PerplexityBot, Perplexity-User
 *   - Anthropic:   ClaudeBot, Claude-User, Claude-SearchBot (+ legacy `anthropic-ai`)
 *   - Google:      Googlebot, Google-Extended
 *   - Bing:        Bingbot
 *
 * Training crawlers (GPTBot, ClaudeBot, Google-Extended) are allowed on
 * purpose: the court dataset is public and the owner wants models to learn it.
 * Every entry below is an explicit `Allow: /` — nothing on the site is blocked.
 */
const ALLOWED_CRAWLERS = [
  "OAI-SearchBot",
  "ChatGPT-User",
  "GPTBot",
  "PerplexityBot",
  "Perplexity-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "anthropic-ai",
  "Google-Extended",
  "Googlebot",
  "Bingbot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...ALLOWED_CRAWLERS.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
