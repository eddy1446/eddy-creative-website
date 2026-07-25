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

const revealElements = document.querySelectorAll(
".service-card, .work-card, .intro-content, .section-heading"
);

const revealObserver = new IntersectionObserver(
(entries) => {
entries.forEach((entry) => {
if (entry.isIntersecting) {
entry.target.classList.add("visible");
revealObserver.unobserve(entry.target);
}
});
},
{
threshold: 0.12
}
);

revealElements.forEach((element) => {
element.classList.add("reveal");
revealObserver.observe(element);
});

const hero = document.querySelector(".hero");

if (hero) {
window.addEventListener("scroll", () => {
const scrollPosition = window.scrollY;

```
if (scrollPosition < window.innerHeight) {
  hero.style.transform = `translateY(${scrollPosition * 0.08}px)`;
}
```

});
}
