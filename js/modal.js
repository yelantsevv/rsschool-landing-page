let activeProduct = null;
let selectedSizeKey = "s";
let selectedAdditivesIndices = [];

const modalOverlay = document.getElementById("modal-overlay");
const modalImg = document.getElementById("modal-img");
const modalTitle = document.getElementById("modal-title");
const modalDescription = document.getElementById("modal-description");
const modalSizes = document.getElementById("modal-sizes");
const modalAdditives = document.getElementById("modal-additives");
const modalTotalPrice = document.getElementById("modal-total-price");
const modalCloseBtn = document.getElementById("modal-close-btn");

export function openModal(product) {
  if (!product || !modalOverlay) return;

  activeProduct = product;
  selectedSizeKey = "s";
  selectedAdditivesIndices = [];

  modalImg.src = product.image;
  modalImg.alt = product.name;
  modalTitle.textContent = product.name;
  modalDescription.textContent = product.description;

  renderSizes();
  renderAdditives();
  updateTotalPrice();

  modalOverlay.classList.add("active");
  document.body.classList.add("no-scroll");
}

function closeModal() {
  if (!modalOverlay) return;
  modalOverlay.classList.remove("active");
  document.body.classList.remove("no-scroll");
}

function renderSizes() {
  modalSizes.innerHTML = "";
  Object.keys(activeProduct.sizes).forEach((key) => {
    const sizeData = activeProduct.sizes[key];
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `modal-option-btn ${key === selectedSizeKey ? "active" : ""}`;
    btn.innerHTML = `<span class="icon-circle">${key.toUpperCase()}</span><span>${sizeData.size}</span>`;

    btn.addEventListener("click", () => {
      selectedSizeKey = key;
      renderSizes();
      updateTotalPrice();
    });

    modalSizes.appendChild(btn);
  });
}

function renderAdditives() {
  modalAdditives.innerHTML = "";
  activeProduct.additives.forEach((additive, index) => {
    const isSelected = selectedAdditivesIndices.includes(index);
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `modal-option-btn ${isSelected ? "active" : ""}`;
    btn.innerHTML = `<span class="icon-circle">${index + 1}</span><span>${additive.name}</span>`;

    btn.addEventListener("click", () => {
      if (isSelected) {
        selectedAdditivesIndices = selectedAdditivesIndices.filter(
          (i) => i !== index,
        );
      } else {
        selectedAdditivesIndices.push(index);
      }
      renderAdditives();
      updateTotalPrice();
    });

    modalAdditives.appendChild(btn);
  });
}

function updateTotalPrice() {
  let basePrice = parseFloat(activeProduct.price.replace("$", ""));
  const sizeAddPrice = parseFloat(
    activeProduct.sizes[selectedSizeKey]["add-price"],
  );
  basePrice += sizeAddPrice;

  selectedAdditivesIndices.forEach((index) => {
    basePrice += parseFloat(activeProduct.additives[index]["add-price"]);
  });

  modalTotalPrice.textContent = `$${basePrice.toFixed(2)}`;
}

if (modalCloseBtn) {
  modalCloseBtn.addEventListener("click", closeModal);
}

if (modalOverlay) {
  modalOverlay.addEventListener("click", (event) => {
    if (event.target === modalOverlay) closeModal();
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modalOverlay?.classList.contains("active")) {
    closeModal();
  }
});
