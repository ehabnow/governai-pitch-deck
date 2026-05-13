const slides = Array.from(document.querySelectorAll(".slide"));
const progressBar = document.getElementById("progressBar");
const slideCounter = document.getElementById("slideCounter");
const nextSlide = document.getElementById("nextSlide");
const prevSlide = document.getElementById("prevSlide");

function currentSlideIndex() {
  const midpoint = window.scrollY + window.innerHeight * 0.45;
  let active = 0;
  slides.forEach((slide, index) => {
    if (slide.offsetTop <= midpoint) active = index;
  });
  return active;
}

function updateProgress() {
  const active = currentSlideIndex();
  const percent = ((active + 1) / slides.length) * 100;
  progressBar.style.width = `${percent}%`;
  slideCounter.textContent = `${active + 1} / ${slides.length}`;
  document.body.dataset.activeSlide = String(active + 1);
}

function goToSlide(offset) {
  const active = currentSlideIndex();
  const target = Math.max(0, Math.min(slides.length - 1, active + offset));
  slides[target].scrollIntoView({ behavior: "smooth", block: "start" });
}

window.addEventListener("scroll", updateProgress, { passive: true });
window.addEventListener("resize", updateProgress);
nextSlide.addEventListener("click", () => goToSlide(1));
prevSlide.addEventListener("click", () => goToSlide(-1));

window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight" || event.key === "PageDown") goToSlide(1);
  if (event.key === "ArrowLeft" || event.key === "PageUp") goToSlide(-1);
});

updateProgress();
