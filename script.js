/* =====================================================
MOBILE MENU
===================================================== */

const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");

if (menuToggle && mobileMenu) {

menuToggle.addEventListener("click", () => {

```
const isOpen =
  mobileMenu.classList.toggle("active");

menuToggle.classList.toggle(
  "active",
  isOpen
);

document.body.style.overflow =
  isOpen ? "hidden" : "";
```

});

mobileMenu
.querySelectorAll("a")
.forEach((link) => {

```
  link.addEventListener("click", () => {

    mobileMenu.classList.remove(
      "active"
    );

    menuToggle.classList.remove(
      "active"
    );

    document.body.style.overflow =
      "";

  });

});
```

}

/* =====================================================
SCROLL REVEAL
===================================================== */

const revealElements =
document.querySelectorAll(
".service-card, .work-card, .intro-content, .section-heading"
);

if ("IntersectionObserver" in window) {

const revealObserver =
new IntersectionObserver(

```
  (entries) => {

    entries.forEach((entry) => {

      if (entry.isIntersecting) {

        entry.target.classList.add(
          "visible"
        );

        revealObserver.unobserve(
          entry.target
        );

      }

    });

  },

  {
    threshold: 0.12
  }

);
```

revealElements.forEach((element) => {

```
element.classList.add(
  "reveal"
);

revealObserver.observe(
  element
);
```

});

}

/* =====================================================
HERO PARALLAX
===================================================== */

const hero =
document.querySelector(".hero");

if (hero) {

window.addEventListener(
"scroll",
() => {

```
  const scrollPosition =
    window.scrollY;


  if (
    scrollPosition <
    window.innerHeight
  ) {

    hero.style.transform =
      `translateY(${scrollPosition * 0.08}px)`;

  }

}
```

);

}

/* =====================================================
PORTFOLIO FILTERS
===================================================== */

const filterButtons =
document.querySelectorAll(
".filter-button"
);

const portfolioCards =
document.querySelectorAll(
".portfolio-card"
);

if (
filterButtons.length &&
portfolioCards.length
) {

filterButtons.forEach(
(button) => {

```
  button.addEventListener(
    "click",
    () => {

      const filter =
        button.dataset.filter;


      filterButtons.forEach(
        (btn) => {

          btn.classList.remove(
            "active"
          );

        }
      );


      button.classList.add(
        "active"
      );


      portfolioCards.forEach(
        (card) => {

          const category =
            card.dataset.category;


          if (
            filter === "all" ||
            category === filter
          ) {

            card.style.display =
              "";

          } else {

            card.style.display =
              "none";

          }

        }
      );

    }
  );

}
```

);

}

/* =====================================================
WHATSAPP CHAT WIDGET
===================================================== */

const whatsappButton =
document.getElementById(
"whatsappButton"
);

const whatsappChatbox =
document.getElementById(
"whatsappChatbox"
);

const closeWhatsapp =
document.getElementById(
"closeWhatsapp"
);

const sendWhatsapp =
document.getElementById(
"sendWhatsapp"
);

const whatsappMessage =
document.getElementById(
"whatsappMessage"
);

if (
whatsappButton &&
whatsappChatbox &&
closeWhatsapp &&
sendWhatsapp &&
whatsappMessage
) {

whatsappButton.addEventListener(
"click",
() => {

```
  whatsappChatbox.classList.toggle(
    "active"
  );

}
```

);

closeWhatsapp.addEventListener(
"click",
() => {

```
  whatsappChatbox.classList.remove(
    "active"
  );

}
```

);

sendWhatsapp.addEventListener(
"click",
() => {

```
  const message =
    whatsappMessage.value.trim();


  if (!message) {

    whatsappMessage.focus();

    return;

  }


  const phoneNumber =
    "254704278052";


  const whatsappURL =
    `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;


  window.open(
    whatsappURL,
    "_blank"
  );

}
```

);

}

/* =====================================================
CONTACT FORM
===================================================== */

const contactForm =
document.getElementById(
"contactForm"
);

const formStatus =
document.getElementById(
"formStatus"
);

if (contactForm) {

contactForm.addEventListener(
"submit",
async (event) => {

```
  event.preventDefault();


  const submitButton =
    contactForm.querySelector(
      "button[type='submit']"
    );


  const name =
    document.getElementById(
      "name"
    ).value;

  const email =
    document.getElementById(
      "email"
    ).value;

  const service =
    document.getElementById(
      "service"
    ).value;

  const message =
    document.getElementById(
      "message"
    ).value;


  submitButton.disabled =
    true;


  submitButton.innerHTML =
    "Sending... <span>↗</span>";


  formStatus.textContent =
    "Sending your enquiry...";


  try {

    const response =
      await fetch(
        "/api/contact",
        {

          method: "POST",

          headers: {
            "Content-Type":
              "application/json"
          },

          body: JSON.stringify({

            name,
            email,
            service,
            message

          })

        }
      );


    const data =
      await response.json();


    if (!response.ok) {

      throw new Error(
        data.message ||
        "Something went wrong."
      );

    }


    formStatus.textContent =
      "Thank you! Your enquiry has been received.";


    contactForm.reset();


    submitButton.innerHTML =
      "Enquiry sent ✓ <span>↗</span>";


  } catch (error) {

    formStatus.textContent =
      "Something went wrong. Please try WhatsApp instead.";


    submitButton.disabled =
      false;


    submitButton.innerHTML =
      "Send enquiry <span>↗</span>";

  }

}
```

);

}
