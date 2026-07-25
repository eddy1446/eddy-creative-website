/* =========================
MOBILE MENU
========================= */

const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");

if (menuToggle && mobileMenu) {
menuToggle.addEventListener("click", () => {
const isOpen = mobileMenu.classList.toggle("active");

```
menuToggle.classList.toggle("active", isOpen);

document.body.style.overflow = isOpen ? "hidden" : "";
```

});

mobileMenu.querySelectorAll("a").forEach((link) => {
link.addEventListener("click", () => {
mobileMenu.classList.remove("active");
menuToggle.classList.remove("active");
document.body.style.overflow = "";
});
});
}

/* =========================
PORTFOLIO FILTERS
========================= */

const filterButtons = document.querySelectorAll(".filter-button");
const portfolioCards = document.querySelectorAll(".portfolio-card");

if (filterButtons.length && portfolioCards.length) {
filterButtons.forEach((button) => {
button.addEventListener("click", () => {

```
  const selectedFilter = button.dataset.filter;


  /* Remove active state from all buttons */

  filterButtons.forEach((filterButton) => {
    filterButton.classList.remove("active");
  });


  /* Activate selected button */

  button.classList.add("active");


  /* Filter projects */

  portfolioCards.forEach((card) => {

    const cardCategory = card.dataset.category;

    if (
      selectedFilter === "all" ||
      cardCategory === selectedFilter
    ) {
      card.style.display = "block";

      setTimeout(() => {
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
      }, 50);

    } else {
      card.style.opacity = "0";
      card.style.transform = "translateY(20px)";

      setTimeout(() => {
        card.style.display = "none";
      }, 300);
    }

  });

});
```

});
}

/* =========================
SCROLL REVEAL ANIMATIONS
========================= */

const revealElements = document.querySelectorAll(
".service-card, .work-card, .portfolio-card, .intro-content, .section-heading"
);

const revealObserver = new IntersectionObserver(
(entries) => {

```
entries.forEach((entry) => {

  if (entry.isIntersecting) {

    entry.target.classList.add("visible");

    revealObserver.unobserve(entry.target);

  }

});
```

},
{
threshold: 0.12
}
);

revealElements.forEach((element) => {

element.classList.add("reveal");

revealObserver.observe(element);

});

/* =========================
HERO PARALLAX
========================= */

const hero = document.querySelector(".hero");

if (hero) {

window.addEventListener("scroll", () => {

```
const scrollPosition = window.scrollY;

if (scrollPosition < window.innerHeight) {

  hero.style.transform =
    `translateY(${scrollPosition * 0.08}px)`;

}
```

});

}
