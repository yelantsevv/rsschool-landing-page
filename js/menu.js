import { products } from "./products.js";

const container = document.getElementById("menu-container");

function renderCards(category) {
  const items = products[category];
  if (!items || !container) return;

  container.innerHTML = items
    .map(
      (item) => `
      <article class="card${item["card-none"] ? " card-none" : ""}">
        <div class="card-img-wrapper">
          <img src="${item.image}" alt="${item.name}" />
        </div>
        <div class="card-content">
          <h2 class="card-title">${item.name}</h2>
          <p class="card-description">${item.description}</p>
          <div class="card-price">${item.price}</div>
        </div>
      </article>
    `,
    )
    .join("");
}

const activeTab = document.querySelector(".tab-btn.active");
if (activeTab) {
  renderCards(activeTab.dataset.category);
}

const tabs = document.querySelectorAll(".tab-btn");

tabs.forEach((tab) => {
  tab.addEventListener("click", (e) => {
    e.preventDefault();

    tabs.forEach((t) => t.classList.remove("active"));

    tab.classList.add("active");

    renderCards(tab.dataset.category);
  });
});

const loadMoreBtn = document.getElementById("load-more-btn");

if (loadMoreBtn) {
  loadMoreBtn.addEventListener("click", () => {
    const hiddenCards = document.querySelectorAll(".card.card-none");

    hiddenCards.forEach((card) => {
      card.classList.remove("card-none");
    });

    loadMoreBtn.style.display = "none";
  });
}
