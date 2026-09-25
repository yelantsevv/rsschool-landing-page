import { products } from "./products.js";
import { openModal } from "./modal.js";

const container = document.getElementById("menu-container");
const loadMoreBtn = document.getElementById("load-more-btn");
const tabs = document.querySelectorAll(".tab-btn");

let currentCategory = "coffee";

function renderCards(category) {
  currentCategory = category;
  const items = products[category];
  if (!items || !container) return;

  container.innerHTML = items
    .map(
      (item) => `
      <article class="card${item["card-none"] ? " card-none" : ""}" data-name="${item.name}">
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
} else {
  renderCards("coffee");
}

tabs.forEach((tab) => {
  tab.addEventListener("click", (e) => {
    e.preventDefault();

    tabs.forEach((t) => t.classList.remove("active"));

    tab.classList.add("active");

    renderCards(tab.dataset.category);
  });
});

if (loadMoreBtn) {
  loadMoreBtn.addEventListener("click", () => {
    const hiddenCards = container.querySelectorAll(".card.card-none");
    hiddenCards.forEach((card) => {
      card.classList.remove("card-none");
    });
    loadMoreBtn.style.display = "none";
  });
}

if (container) {
  container.addEventListener("click", (e) => {
    const card = e.target.closest(".card");
    if (!card) return;

    const productName = card.dataset.name;

    const productData = products[currentCategory].find(
      (item) => item.name === productName,
    );

    if (productData) {
      openModal(productData);
    }
  });
}
