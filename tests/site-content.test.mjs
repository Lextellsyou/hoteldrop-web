import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import assert from "node:assert/strict";

const root = process.cwd();
const htmlPath = join(root, "index.html");
const cssPath = join(root, "styles.css");
const jsPath = join(root, "app.js");

for (const path of [htmlPath, cssPath, jsPath]) {
  assert.equal(existsSync(path), true, `${path} should exist`);
}

const html = readFileSync(htmlPath, "utf8");
const css = readFileSync(cssPath, "utf8");
const js = readFileSync(jsPath, "utf8");
const allText = `${html}\n${css}\n${js}`;

const requiredHtml = [
  "即宿科技",
  "今夜有房",
  "西安即宿信息服务有限公司",
  "jisutech.space",
  "小程序码暂无",
  "酒店合作",
  "商务联系",
  "jisugroup@126.com",
  "合作表单暂无",
  "ICP 备案号",
  "16:00",
  "15 分钟",
  "信息服务费",
  "到店付房费",
  "普通订房用户",
  "酒店经营者"
];

for (const text of requiredHtml) {
  assert.equal(html.includes(text), true, `index.html should include ${text}`);
}

assert.match(html, /<meta\s+name="description"/s, "SEO description should exist");
assert.match(html, /<main id="main"/, "main landmark should exist");
assert.match(html, /<img[^>]+alt="/, "images should include alt attribute");
assert.equal(html.includes("—"), false, "visible content should not use em dash");
assert.equal(html.includes("–"), false, "visible content should not use en dash");
assert.equal(html.includes("business@jisutech.space"), false, "old email should be removed");
assert.equal(html.includes("微信"), false, "wechat placeholder should be removed");
assert.equal(html.includes("电话"), false, "phone placeholder should be removed");
assert.equal(/\.hero\b/.test(css), true, "hero styles should exist");
assert.equal(/prefers-reduced-motion/.test(css), true, "reduced motion styles should exist");
assert.equal(/addEventListener/.test(js), true, "small interactions should be wired");
