const toggleButton = document.querySelector(".toggle-button i");
toggleButton.onclick = function () {
  const navLinks = document.getElementsByClassName("nav-links")[0];
  const auth = document.getElementsByClassName("auth")[0];

  if (navLinks.style.display === "block") {
    navLinks.style.display = "none";
    auth.style.display = "none";
  } else {
    navLinks.style.display = "block";
    auth.style.display = "block";
  }
};

window.onresize = function () {
  const navLinks = document.getElementsByClassName("nav-links")[0];
  const auth = document.getElementsByClassName("auth")[0];

  if (window.innerWidth > 1230) {
    navLinks.style.display = "block";
    auth.style.display = "block";
  } else {
    navLinks.style.display = "none";
    auth.style.display = "none";
  }
};

// Close the navbar when clicking outside of it
document.addEventListener("click", function (event) {
  const navLinks = document.getElementsByClassName("nav-links")[0];
  const auth = document.getElementsByClassName("auth")[0];
  const toggleButton = document.querySelector(".toggle-button i");

  if (
    !navLinks.contains(event.target) &&
    !auth.contains(event.target) &&
    !toggleButton.contains(event.target) &&
    window.innerWidth < 1230
  ) {
    navLinks.style.display = "none";
    auth.style.display = "none";
  }
});

///////////// For Slider articleShorts------------------------------------------------------------------------------------------

// Article Carousel------------------------------------------------------------------------------------------

const articleWrapper = document.querySelector(".articlewrapper");
const articleCarousel = document.querySelector(".articlecarousel");
const firstArticleCardWidth =
  articleCarousel.querySelector(".articlecard").offsetWidth;
const arrowArticleBtns = document.querySelectorAll(".slider-btn i");
const articleCarouselChildren = [...articleCarousel.children];

// Get the number of cards that can fit in the carousel at once
let cardArticlePerView = Math.round(
  articleCarousel.offsetWidth / firstArticleCardWidth
);

// Insert copies of the last few cards to beginning of carousel for infinite scrolling
articleCarouselChildren
  .slice(-cardArticlePerView)
  .reverse()
  .forEach((card) => {
    articleCarousel.insertAdjacentHTML("afterbegin", card.outerHTML);
  });

// Insert copies of the first few cards to end of carousel for infinite scrolling
articleCarouselChildren.slice(0, cardArticlePerView).forEach((card) => {
  articleCarousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Scroll the carousel at appropriate position to hide first few duplicate cards on Firefox
articleCarousel.classList.add("no-transition");
articleCarousel.scrollLeft = articleCarousel.offsetWidth;
articleCarousel.classList.remove("no-transition");

// Add event listeners for the arrow buttons to scroll the carousel left and right
arrowArticleBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    articleCarousel.scrollLeft +=
      btn.id === "left" ? -firstArticleCardWidth : firstArticleCardWidth;
  });
});
