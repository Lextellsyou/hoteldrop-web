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
    const floatingNav = document.querySelector(".floating-nav").getBoundingClientRect();
    const statement = document.querySelector(".statement-section h1").getBoundingClientRect();
    const rail = document.querySelector(".signal-rail");
    const railBox = rail.getBoundingClientRect();
    const railStyle = getComputedStyle(rail);
    const railContentWidth =
      railBox.width - parseFloat(railStyle.paddingLeft) - parseFloat(railStyle.paddingRight);
    return {
      innerWidth,
      bodyWidth: document.body.scrollWidth,
      headerHeight: Math.round(header.height),
      floatingNavWidth: Math.round(floatingNav.width),
      statementWidth: Math.round(statement.width),
      contentWidth: Math.round(railContentWidth)
    };
  });
  await page.screenshot({ path: `tmp-${name}.png`, fullPage: true });
  await page.close();
  return data;
}

const desktop = await inspectViewport("desktop", 1440, 1000);
const wide = await inspectViewport("wide", 2560, 1000);
const mobile = await inspectViewport("mobile", 390, 844);

await browser.close();

console.log(JSON.stringify({ desktop, wide, mobile }, null, 2));

if (desktop.bodyWidth > desktop.innerWidth) {
  throw new Error("Desktop has horizontal overflow");
}

if (mobile.bodyWidth > mobile.innerWidth) {
  throw new Error("Mobile has horizontal overflow");
}

if (wide.bodyWidth > wide.innerWidth) {
  throw new Error("Wide viewport has horizontal overflow");
}

if (wide.contentWidth > 1682) {
  throw new Error("Wide viewport content exceeds 1680px");
}

if (mobile.floatingNavWidth < 220) {
  throw new Error("Mobile floating nav is not visible");
}
