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

///////////// For Slider articleShorts------------------------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", function () {
  const articleCarousel = document.querySelector(".article-carousel");
  const articles = document.querySelectorAll(".article-summary");
  const firstCardWidth = articles[0].offsetWidth;
  const arrowBtns = document.querySelectorAll(".slider-btn i");

  // Calculate the number of cards per view based on current width
  let cardPerView = calculateCardPerView();

  // Function to calculate number of visible cards per view based on current width
  function calculateCardPerView() {
    if (window.matchMedia("(max-width: 1245px)").matches) {
      return Math.round(articleCarousel.offsetWidth / (300 + 20)); // Adjust based on your article width and margin
    } else if (window.matchMedia("(max-width: 900px)").matches) {
      return Math.round(articleCarousel.offsetWidth / (300 / 2 + 20));
    } else if (window.matchMedia("(max-width: 610px)").matches) {
      return Math.round(articleCarousel.offsetWidth / (300 + 20)); // Adjust for full width on smaller screens
    } else {
      return Math.round(articleCarousel.offsetWidth / (300 / 4 + 12));
    }
  }
  // Insert additional articles for the slider effect
  articles.forEach((article, index) => {
    const clone = article.cloneNode(true);
    articleCarousel.appendChild(clone);
  });

  // Function to handle scrolling left or right
  arrowBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const scrollAmount = firstCardWidth;
      articleCarousel.scrollBy({
        left: btn.id === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    });
  });
  // Adjust number of cards per view on window resize
  window.addEventListener("resize", () => {
    cardPerView = calculateCardPerView();
  });
});

//Testimonies------------------------------------------------------------------------------------------
const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const arrowBtns = document.querySelectorAll(".wrapper i");
const carouselChildrens = [...carousel.children];

let isDragging = false,
  isAutoPlay = true,
  startX,
  startScrollLeft,
  timeoutId;

// Get the number of cards that can fit in the carousel at once
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

// Insert copies of the last few cards to beginning of carousel for infinite scrolling
carouselChildrens
  .slice(-cardPerView)
  .reverse()
  .forEach((card) => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
  });

// Insert copies of the first few cards to end of carousel for infinite scrolling
carouselChildrens.slice(0, cardPerView).forEach((card) => {
  carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Scroll the carousel at appropriate postition to hide first few duplicate cards on Firefox
carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");

// Add event listeners for the arrow buttons to scroll the carousel left and right
arrowBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
  });
});

const dragStart = (e) => {
  isDragging = true;
  carousel.classList.add("dragging");
  // Records the initial cursor and scroll position of the carousel
  startX = e.pageX;
  startScrollLeft = carousel.scrollLeft;
};

const dragging = (e) => {
  if (!isDragging) return; // if isDragging is false return from here
  // Updates the scroll position of the carousel based on the cursor movement
  carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
};

const dragStop = () => {
  isDragging = false;
  carousel.classList.remove("dragging");
};

const infiniteScroll = () => {
  // If the carousel is at the beginning, scroll to the end
  if (carousel.scrollLeft === 0) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.scrollWidth - 2 * carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  }
  // If the carousel is at the end, scroll to the beginning
  else if (
    Math.ceil(carousel.scrollLeft) ===
    carousel.scrollWidth - carousel.offsetWidth
  ) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  }

  // Clear existing timeout & start autoplay if mouse is not hovering over carousel
  clearTimeout(timeoutId);
  if (!wrapper.matches(":hover")) autoPlay();
};

const autoPlay = () => {
  if (window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
  // Autoplay the carousel after every 2500 ms
  timeoutId = setTimeout(() => (carousel.scrollLeft += firstCardWidth), 2500);
};
autoPlay();

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);
