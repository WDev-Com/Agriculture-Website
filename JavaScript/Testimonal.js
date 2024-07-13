// Testimonies------------------------------------------------------------------------------------------
// Testimonial Carousel------------------------------------------------------------------------------------------
const testimonialWrapper = document.querySelector(".wrapper");
const testimonialCarousel = document.querySelector(".carousel");
const firstTestimonialCardWidth =
  testimonialCarousel.querySelector(".card").offsetWidth;
const arrowTestimonialBtns = document.querySelectorAll(".wrapper i");
const testimonialCarouselChildren = [...testimonialCarousel.children];

let isDragging = false,
  startX,
  startScrollLeft;

// Get the number of cards that can fit in the carousel at once
let cardTestimonialPerView = Math.round(
  testimonialCarousel.offsetWidth / firstTestimonialCardWidth
);

// Insert copies of the last few cards to beginning of carousel for infinite scrolling
testimonialCarouselChildren
  .slice(-cardTestimonialPerView)
  .reverse()
  .forEach((card) => {
    testimonialCarousel.insertAdjacentHTML("afterbegin", card.outerHTML);
  });

// Insert copies of the first few cards to end of carousel for infinite scrolling
testimonialCarouselChildren.slice(0, cardTestimonialPerView).forEach((card) => {
  testimonialCarousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Scroll the carousel at appropriate position to hide first few duplicate cards on Firefox
testimonialCarousel.classList.add("no-transition");
testimonialCarousel.scrollLeft = testimonialCarousel.offsetWidth;
testimonialCarousel.classList.remove("no-transition");

// Add event listeners for the arrow buttons to scroll the carousel left and right
arrowTestimonialBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    testimonialCarousel.scrollLeft +=
      btn.id === "left"
        ? -firstTestimonialCardWidth
        : firstTestimonialCardWidth;
  });
});

const dragStart = (e) => {
  isDragging = true;
  testimonialCarousel.classList.add("dragging");
  console.log(e);
  startX = e.pageX;
  startScrollLeft = testimonialCarousel.scrollLeft;
};
const dragging = (e) => {
  if (!isDragging) return;
  testimonialCarousel.scrollLeft = startScrollLeft - (e.pageX - startX);
};
const dragStop = () => {
  isDragging = false;
  testimonialCarousel.classList.remove("dragging");
};

testimonialCarousel.addEventListener("mousedown", dragStart);
testimonialCarousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
