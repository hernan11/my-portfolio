//Menu
(() => {
  const $headerButton = document.getElementById("header-button");
  const $headerNav = document.getElementById("header-nav");

  $headerButton.addEventListener("click", () => {
    $headerButton.firstElementChild.classList.toggle("none");
    $headerButton.lastElementChild.classList.toggle("none");
    $headerNav.classList.toggle("is-active");
  });

  document.addEventListener("click", (event) => {
    if (!event.target.matches(".header__link")) return false;

    $headerButton.firstElementChild.classList.remove("none");
    $headerButton.lastElementChild.classList.add("none");
    $headerNav.classList.remove("is-active");
  });
})();

// Contact Form
(() => {
  const $contactForm = document.getElementById("contact-form");
  const $contactFormLoader = document.getElementById("contact-form-loader");
  const $contactFormResponse = document.getElementById("contact-form-response");

  $contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    $contactFormLoader.classList.remove("none");
    fetch("https://formsubmit.co/ajax/robleshernan91@gmail.com", {
      method: "POST",
      body: new FormData(event.target),
    })
      .then((res) => {
        res.ok ? res.json() : Promise.reject(res);
      })
      .then(() => {
        location.hash = "#thanks";
        $contactForm.reset();
      })
      .then((err) => {
        let message =
          err.statusText || "Ocurrió un error al enviar, intenta nuevamente";
        $contactFormResponse.querySelector(
          "h3"
        ).innerHTML = `Error ${err.status}: ${message}`;
      })
      .finally(() => {
        $contactFormLoader.classList.add("none");
        setTimeout(() => {
          location.hash = "#close";
        }, 3000);
      });
  });
})();
