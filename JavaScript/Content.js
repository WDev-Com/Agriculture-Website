const contentData = [
  {
    title: "ALL",
    heading: "Benefits of All.",
    benefits: [
      {
        title: "Data Integration",
        description:
          "Integrating various data sources for comprehensive agricultural insights.",
      },
      {
        title: "Decision Support",
        description:
          "Providing tools and resources for informed decision-making in agriculture.",
      },
      {
        title: "Productivity Enhancement",
        description:
          "Implementing advanced techniques to boost agricultural productivity.",
      },
    ],
    cards: [
      {
        title: "Partner",
        description:
          "We provide a complete solution for efficient commodity sourcing and farmer monitoring.",
        image: "./images/card1img.png",
      },
      {
        title: "Markets",
        description:
          "We provide high quality products to support your business development.",
        image: "./images/card2img.png",
      },
      {
        title: "Modal",
        description:
          "Providing access to capital to encourage entrepreneurship in the agricultural sector and support small farmers.",
        image: "./images/card3img.png",
      },
      {
        title: "Agrispedia",
        description:
          "Get new knowledge to develop your agricultural business directly from the experts.",
        image: "./images/card4img.png",
      },
    ],
  },
  {
    title: "Individual",
    heading: "Benefits of Individual",
    benefits: [
      {
        title: "Cultivation Actors",
        description:
          "Farmers, fish farmers, fishermen and livestock breeders who carry out cultivation activities.",
      },
      {
        title: "Agricultural Consumers",
        description:
          "Individuals and entities consuming agricultural products.",
      },
      {
        title: "Agricultural Experts",
        description:
          "Specialists providing insights and knowledge to enhance agricultural practices.",
      },
    ],
    cards: [
      {
        title: "Partner",
        description:
          "We provide a complete solution for efficient commodity sourcing and farmer monitoring.",
        image: "./images/card1img.png",
      },
      {
        title: "Markets",
        description:
          "We provide high quality products to support your business development.",
        image: "./images/card2img.png",
      },
      {
        title: "Modal",
        description:
          "Providing access to capital to encourage entrepreneurship in the agricultural sector and support small farmers.",
        image: "./images/card3img.png",
      },
      {
        title: "Agrispedia",
        description:
          "Get new knowledge to develop your agricultural business directly from the experts.",
        image: "./images/card4img.png",
      },
    ],
  },
  {
    title: "Company",
    heading: "Benefits of Company",
    benefits: [
      {
        title: "Operational Efficiency",
        description:
          "Streamlining operations to enhance business efficiency in the agricultural sector.",
      },
      {
        title: "Market Expansion",
        description: "Strategies and support for expanding into new markets.",
      },
      {
        title: "Financial Growth",
        description:
          "Financial solutions and support to drive business growth.",
      },
    ],
    cards: [
      {
        title: "Operational Efficiency",
        description:
          "Streamlining operations to enhance business efficiency in the agricultural sector.",
        image: "./images/company_card1.png",
      },
      {
        title: "Market Expansion",
        description: "Strategies and support for expanding into new markets.",
        image: "./images/company_card2.png.jpeg",
      },
      {
        title: "Financial Growth",
        description:
          "Financial solutions and support to drive business growth.",
        image: "./images/company_card3.jpg",
      },
      {
        title: "Technology Integration",
        description:
          "Implementing cutting-edge technology solutions for agricultural advancement.",
        image: "./images/company_card4.jpeg",
      },
    ],
  },
];

function updateContent(selectedTitle) {
  var navLinks = document.querySelectorAll(".navigation ul li");
  navLinks[0].classList.add("active");
  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      // Remove 'active' class from all links
      navLinks.forEach(function (item) {
        item.classList.remove("active");
      });

      // Add 'active' class to the clicked link
      this.classList.add("active");

      // Here you can add code to update content based on the category
      var category = this.getAttribute("data-category");
      // console.log("Selected category:", category);
    });
  });

  const selectedContent = contentData.find(
    (item) => item.title === selectedTitle
  );

  // Update heading
  document.getElementById("content-heading").innerText =
    selectedContent.heading;

  // Update benefits
  const accordion = document.getElementById("accordian");
  accordion.innerHTML = "";
  selectedContent.benefits.forEach((benefit, index) => {
    const benefitHTML = `
    <div class="accordian-child" onclick="toggleAccordion(${index})">
      <h4>${index + 1}. ${benefit.title}</h4>
      <p id="p${index}" style="display: none;">
        ${benefit.description}
      </p>
      <div class="arrow">
        <i id="down" class="fa-solid fa-chevron-down"></i>
        <i id="up" class="fa-solid fa-chevron-up" style="display: none;"></i>
      </div>
    </div>
  `;
    accordion.innerHTML += benefitHTML;
  });

  // Update cards
  const cardsContainer = document.getElementById("cards"); // Correct way to select by id
  cardsContainer.innerHTML = ""; // Clear previous content

  selectedContent.cards.forEach((card) => {
    const cardHTML = `
         <div class="card">
              <img src="${card.image}" alt="" />
              <div class="caption">
                <h4>${card.title}</h4>
                <p>
                  ${card.description}
                </p>
                <button id="card-btn">
                  Learn More<i class="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            </div>
    `;
    cardsContainer.insertAdjacentHTML("beforeend", cardHTML); // Append new card HTML
  });
}
// Initialize with "Individual" content
updateContent("ALL");

// Example toggleAccordion function

function toggleAccordion(index) {
  const contents = document.querySelectorAll(".accordian-child");
  contents.forEach((content, idx) => {
    const paragraph = content.querySelector("p");
    const downArrow = content.querySelector("#down");
    const upArrow = content.querySelector("#up");

    if (idx === index) {
      const isDisplayed = paragraph.style.display === "block";
      paragraph.style.display = isDisplayed ? "none" : "block";
      downArrow.style.display = isDisplayed ? "block" : "none";
      upArrow.style.display = isDisplayed ? "none" : "block";
      content.style.backgroundColor = isDisplayed ? "white" : "lightgreen";
    } else {
      paragraph.style.display = "none";
      downArrow.style.display = "block";
      upArrow.style.display = "none";
      content.style.backgroundColor = "white";
    }
  });
}
