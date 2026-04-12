import "../styles/styles.css";
import "./globals.js";
import "../styles/galerias.css";

const cardAnchor = document.querySelectorAll(".card-anchor");
const cardHoverDelay = 1200;

cardAnchor.forEach((cardAn) => {
  const card = cardAn.children[0];
  let enteredEnough = false;
  let leftEnough = null;

  cardAn.addEventListener("mouseenter", () => {
    if (leftEnough === null || leftEnough) {
      card.classList.add("card-animated-hover");
      card.classList.remove("card-animated-hover-reverse");

      setTimeout(() => {
        enteredEnough = true;
        leftEnough = false;
      }, cardHoverDelay);
    }
  });

  cardAn.addEventListener("mouseleave", () => {
    if (enteredEnough) {
      card.classList.add("card-animated-hover-reverse");
      card.classList.remove("card-animated-hover");
      enteredEnough = false;

      setTimeout(() => {
        leftEnough = true;
      }, cardHoverDelay);
    }
  });
});
