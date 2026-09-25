import { coffeeSlider } from "./products.js";

const track = document.getElementById("sliderTrack");

if (track) {
  initSlider();
}

function renderSlides(data) {
  track.innerHTML = data
    .map(
      (item, index) => `
      <article class="slide ${index === 0 ? "active" : ""}">
        <div class="slide__img-wrapper">
          <img src="${item.img}" alt="${item.alt || item.title}" class="slide__img" />
        </div>
        <div class="slide__content">
          <h3 class="slide__title">${item.title}</h3>
          <p class="slide__description">${item.description}</p>
          <span class="slide__price">${item.price}</span>
        </div>
      </article>
    `,
    )
    .join("");
}

function initSlider() {
  renderSlides(coffeeSlider);

  const slides = Array.from(track.children);
  const prevBtn = document.querySelector(".nav-button.prev");
  const nextBtn = document.querySelector(".nav-button.next");
  const sliderElement = document.querySelector(".slider");

  let paginationContainer = document.querySelector(".pagination");
  if (!paginationContainer) {
    paginationContainer = document.createElement("div");
    paginationContainer.classList.add("pagination");
    sliderElement?.after(paginationContainer);
  }

  paginationContainer.innerHTML = "";

  let currentIndex = 0;

  slides.forEach((_, index) => {
    const bar = document.createElement("button");
    bar.classList.add("pagination__bar");
    if (index === 0) bar.classList.add("active");

    bar.addEventListener("click", () => goToSlide(index));
    paginationContainer.appendChild(bar);
  });

  const bars = Array.from(paginationContainer.children);

  function goToSlide(index) {
    if (index < 0) {
      currentIndex = slides.length - 1;
    } else if (index >= slides.length) {
      currentIndex = 0;
    } else {
      currentIndex = index;
    }

    const slideWidth = slides[0].offsetWidth;
    track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;

    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === currentIndex);
    });

    bars.forEach((bar, i) => {
      bar.classList.toggle("active", i === currentIndex);
    });
  }

  if (nextBtn)
    nextBtn.addEventListener("click", () => goToSlide(currentIndex + 1));
  if (prevBtn)
    prevBtn.addEventListener("click", () => goToSlide(currentIndex - 1));

  let startX = 0;
  let isDragging = false;

  track.addEventListener(
    "touchstart",
    (e) => {
      startX = e.touches[0].clientX;
      isDragging = true;
    },
    { passive: true },
  );

  track.addEventListener(
    "touchend",
    (e) => {
      if (!isDragging) return;
      isDragging = false;

      const endX = e.changedTouches[0].clientX;
      const diff = startX - endX;

      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          goToSlide(currentIndex + 1);
        } else {
          goToSlide(currentIndex - 1);
        }
      }
    },
    { passive: true },
  );

  window.addEventListener("resize", () => {
    const slideWidth = slides[0].offsetWidth;
    track.style.transition = "none";
    track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
    setTimeout(() => {
      track.style.transition = "";
    }, 50);
  });

  goToSlide(0);
}
