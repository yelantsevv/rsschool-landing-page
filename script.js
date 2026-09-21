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
