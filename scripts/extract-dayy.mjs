import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { createRequire } from "node:module";

const moduleRoot = process.env.PLAYWRIGHT_NODE_MODULES
  ? `${process.env.PLAYWRIGHT_NODE_MODULES}/playwright/package.json`
  : import.meta.url;
const require = createRequire(moduleRoot);
const { chromium } = require("playwright");

const url = process.argv[2] || "https://www.dayy.com/en";
const outputDir = process.argv[3] || "design-extractor";
const screenshotsDir = join(outputDir, "screenshots");

mkdirSync(screenshotsDir, { recursive: true });

const browser = await chromium.launch({ channel: "chrome", headless: true });
const context = await browser.newContext({
  viewport: { width: 1440, height: 920 },
  deviceScaleFactor: 1,
  reducedMotion: "no-preference"
});
const page = await context.newPage();

await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45000 });
await page.waitForTimeout(7000);

await page.screenshot({ path: join(screenshotsDir, "01-hero.png"), fullPage: false });
await page.evaluate(() => window.scrollTo(0, Math.round(window.innerHeight * 0.85)));
await page.waitForTimeout(1200);
await page.screenshot({ path: join(screenshotsDir, "02-after-hero.png"), fullPage: false });
await page.evaluate(() => window.scrollTo(0, Math.round(document.body.scrollHeight * 0.45)));
await page.waitForTimeout(1200);
await page.screenshot({ path: join(screenshotsDir, "03-mid.png"), fullPage: false });
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await page.waitForTimeout(1400);
await page.screenshot({ path: join(screenshotsDir, "04-footer.png"), fullPage: false });
await page.screenshot({ path: join(screenshotsDir, "05-fullpage.png"), fullPage: true });

const extracted = await page.evaluate(() => {
  const sampleElements = [...document.querySelectorAll("body *")]
    .filter((el) => {
      const rect = el.getBoundingClientRect();
      const style = getComputedStyle(el);
      return rect.width > 16 && rect.height > 10 && style.visibility !== "hidden" && style.display !== "none";
    })
    .slice(0, 900);

  const colors = new Map();
  const fonts = new Map();
  const radii = new Map();
  const transitions = new Set();
  const textSamples = [];

  function add(map, value) {
    if (!value || value === "rgba(0, 0, 0, 0)" || value === "transparent") return;
    map.set(value, (map.get(value) || 0) + 1);
  }

  for (const el of sampleElements) {
    const style = getComputedStyle(el);
    add(colors, style.color);
    add(colors, style.backgroundColor);
    add(colors, style.borderColor);
    add(fonts, style.fontFamily);
    add(radii, style.borderRadius);
    if (style.transition && style.transition !== "all") transitions.add(style.transition);
    const text = el.textContent?.trim().replace(/\s+/g, " ");
    if (text && text.length > 8 && text.length < 180) {
      textSamples.push({
        tag: el.tagName.toLowerCase(),
        className: typeof el.className === "string" ? el.className : "",
        text,
        fontSize: style.fontSize,
        fontWeight: style.fontWeight,
        lineHeight: style.lineHeight,
        letterSpacing: style.letterSpacing,
        color: style.color
      });
    }
  }

  const components = {};
  for (const [name, selectors] of Object.entries({
    header: ["header", "nav", "[class*='nav']", "[class*='header']"],
    hero: ["main section", "[class*='hero']", "[class*='Hero']"],
    cards: ["[class*='card']", "[class*='project']", "[class*='work']"],
    footer: ["footer", "[class*='footer']"],
    button: ["button", "a[href]"]
  })) {
    const match = selectors.map((selector) => document.querySelector(selector)).find(Boolean);
    if (match) {
      const clone = match.cloneNode(true);
      clone.querySelectorAll("script, style").forEach((node) => node.remove());
      clone.querySelectorAll("img, video, source").forEach((node) => {
        node.removeAttribute("src");
        node.removeAttribute("srcset");
      });
      components[name] = {
        selector: selectors.find((selector) => document.querySelector(selector)),
        html: clone.outerHTML.slice(0, 5000)
      };
    }
  }

  return {
    title: document.title,
    url: location.href,
    bodyClass: document.body.className,
    colors: [...colors.entries()].sort((a, b) => b[1] - a[1]).slice(0, 30),
    fonts: [...fonts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 20),
    radii: [...radii.entries()].sort((a, b) => b[1] - a[1]).slice(0, 20),
    transitions: [...transitions].slice(0, 80),
    textSamples: textSamples.slice(0, 120),
    animLibs: {
      gsap: Boolean(window.gsap || window.GSAP),
      three: Boolean(window.THREE),
      lenis: Boolean(window.Lenis),
      lottie: Boolean(window.lottie),
      motion: Boolean(window.Motion || window.framerMotion)
    },
    components
  };
});

writeFileSync(join(outputDir, "raw.json"), JSON.stringify(extracted, null, 2));
writeFileSync(join(outputDir, "site.css"), `/* Extracted computed design hints from ${url} */\n${JSON.stringify(extracted.colors, null, 2)}\n`);

await browser.close();
console.log(JSON.stringify({
  title: extracted.title,
  colors: extracted.colors.slice(0, 8),
  fonts: extracted.fonts.slice(0, 6),
  radii: extracted.radii.slice(0, 6),
  animLibs: extracted.animLibs
}, null, 2));
