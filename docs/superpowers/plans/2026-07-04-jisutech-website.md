# 即宿科技官网 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a static company and product website for 即宿科技 / 今夜有房.

**Architecture:** Use a static site with `index.html`, `styles.css`, `app.js`, and project-local assets. Add a Node-based content test script so key copy, CTA targets, SEO tags, and design constraints can be verified without a browser framework.

**Tech Stack:** HTML, CSS, vanilla JavaScript, Node.js built-in modules.

---

### Task 1: Test Harness

**Files:**
- Create: `package.json`
- Create: `tests/site-content.test.mjs`

- [ ] **Step 1: Write failing content tests**

Create a Node test that reads `index.html`, `styles.css`, and `app.js`; assert required page content exists and banned design characters are absent.

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test`
Expected: fails because the site files do not exist yet.

### Task 2: Static Site Files

**Files:**
- Create: `index.html`
- Create: `styles.css`
- Create: `app.js`
- Create: `assets/hero-hotel-lobby.png`

- [ ] **Step 1: Implement semantic HTML**

Build the page sections from the design spec: hero, user value, flow, rules, hotel cooperation, company proof, and conversion footer.

- [ ] **Step 2: Implement CSS design system**

Define CSS variables, responsive grid, typography, CTA states, section spacing, and reduced-motion fallback.

- [ ] **Step 3: Implement light JavaScript**

Add mobile menu, smooth anchor navigation, current year insertion, and non-network form feedback.

- [ ] **Step 4: Add generated hero image**

Use a project-local generated bitmap asset for the first viewport visual.

### Task 3: Verification

**Files:**
- Modify: site files only if tests or visual checks reveal defects.

- [ ] **Step 1: Run content tests**

Run: `npm test`
Expected: all tests pass.

- [ ] **Step 2: Start preview server**

Run: `python3 -m http.server 4173`
Expected: site available at `http://localhost:4173/`.

- [ ] **Step 3: Inspect responsive layout**

Check desktop and mobile rendering for overlap, broken navigation, unreadable text, or missing image.
