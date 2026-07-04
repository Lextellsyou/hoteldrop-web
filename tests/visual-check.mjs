import { createRequire } from "node:module";

const moduleRoot = process.env.PLAYWRIGHT_NODE_MODULES
  ? `${process.env.PLAYWRIGHT_NODE_MODULES}/playwright/package.json`
  : import.meta.url;
const require = createRequire(moduleRoot);
const { chromium } = require("playwright");

const browser = await chromium.launch({ channel: "chrome", headless: true });

async function inspectViewport(name, width, height) {
  const page = await browser.newPage({ viewport: { width, height } });
  await page.goto("http://localhost:4173/", { waitUntil: "networkidle" });
  const data = await page.evaluate(() => {
    const header = document.querySelector(".site-header").getBoundingClientRect();
    const nav = document.querySelector(".site-nav").getBoundingClientRect();
    const menu = document.querySelector("[data-menu-button]").getBoundingClientRect();
    const heroImage = document.querySelector(".hero-media").getBoundingClientRect();
    const cta = document.querySelector(".button-primary").getBoundingClientRect();
    return {
      innerWidth,
      bodyWidth: document.body.scrollWidth,
      headerHeight: Math.round(header.height),
      navHeight: Math.round(nav.height),
      menuWidth: Math.round(menu.width),
      heroImageWidth: Math.round(heroImage.width),
      ctaWidth: Math.round(cta.width)
    };
  });
  await page.screenshot({ path: `tmp-${name}.png`, fullPage: true });
  await page.close();
  return data;
}

const desktop = await inspectViewport("desktop", 1440, 1000);
const mobile = await inspectViewport("mobile", 390, 844);

await browser.close();

console.log(JSON.stringify({ desktop, mobile }, null, 2));

if (desktop.bodyWidth > desktop.innerWidth) {
  throw new Error("Desktop has horizontal overflow");
}

if (mobile.bodyWidth > mobile.innerWidth) {
  throw new Error("Mobile has horizontal overflow");
}

if (mobile.menuWidth < 40) {
  throw new Error("Mobile menu button is not visible");
}
