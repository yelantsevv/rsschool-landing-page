(function () {
  document.documentElement.setAttribute(
    "data-theme",
    localStorage.getItem("data-theme") || "light",
  );
})();

document.addEventListener("DOMContentLoaded", () => {
  const themeToggleBtn = document.getElementById("theme-switch");
  const root = document.documentElement;

  if (!themeToggleBtn) return;

  themeToggleBtn.addEventListener("click", () => {
    const currentTheme = root.getAttribute("data-theme") || "light";
    const newTheme = currentTheme === "light" ? "dark" : "light";

    root.setAttribute("data-theme", newTheme);
    localStorage.setItem("data-theme", newTheme);
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const burgerBtn = document.getElementById("burger-btn");
  const headerMenu = document.querySelector(".header-menu");
  const navLinks = document.querySelectorAll("nav a, .coffee-menu");

  if (burgerBtn && headerMenu) {
    burgerBtn.addEventListener("click", () => {
      headerMenu.classList.toggle("open");
      document.body.classList.toggle("lock-scroll");
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        headerMenu.classList.remove("open");
        document.body.classList.remove("lock-scroll");
      });
    });
  }
});
