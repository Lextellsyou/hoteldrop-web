const menuButton = document.querySelector("[data-menu-button]");
const nav = document.querySelector("[data-nav]");
const year = document.querySelector("[data-year]");
const form = document.querySelector("[data-form]");
const formStatus = document.querySelector("[data-form-status]");

if (year) {
  year.textContent = String(new Date().getFullYear());
}

if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    document.body.classList.toggle("menu-open", isOpen);
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  nav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      nav.classList.remove("is-open");
      document.body.classList.remove("menu-open");
      menuButton.setAttribute("aria-expanded", "false");
    }
  });
}

if (form && formStatus) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const hotel = String(data.get("hotel") || "").trim();
    const phone = String(data.get("phone") || "").trim();

    if (!hotel || !phone) {
      formStatus.textContent = "请留下酒店名称和联系电话。";
      return;
    }

    formStatus.textContent = "已记录合作意向，上线后可接入真实提交接口。";
    form.reset();
  });
}
