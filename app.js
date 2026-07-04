const navLinks = [...document.querySelectorAll("[data-nav-link]")];
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

if ("IntersectionObserver" in window && sections.length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) return;

      navLinks.forEach((link) => {
        link.classList.toggle("is-active", link.getAttribute("href") === `#${visible.target.id}`);
      });
    },
    { rootMargin: "-35% 0px -45% 0px", threshold: [0.15, 0.35, 0.6] }
  );

  sections.forEach((section) => observer.observe(section));
}

document.addEventListener("keydown", (event) => {
  if (event.key !== "Tab") return;
  document.documentElement.classList.add("keyboard-user");
});
