import "../styles/styles.css";
import "./globals.js";
import "../styles/servicios.css";

import { aboutCtaButtonHandling } from "./utils.js";

aboutCtaButtonHandling();

const animateOnScrollServices = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("intersected-card");
    } else {
      entry.target.classList.remove("intersected-card");
    }
  });
};

// Calculate threshold based on viewport width
const getResponsiveThreshold = () => {
  const height = window.innerHeight;
  if (height < 450) return 0.1; // Mobile
  if (height < 600) return 0.25; // Laptop
  return 0.45; // Desktop
};

const createCardsObserver = () => {
  return new IntersectionObserver(animateOnScrollServices, {
    threshold: getResponsiveThreshold(),
  });
};

// Create initial observer
let cardsObserver = createCardsObserver();

const serviceCardWrapper = document.querySelectorAll(".service-card-wrapper");
const serviceCard = document.querySelectorAll(".service-card");

// Initialize observer for all cards
const initializeCardsObserver = () => {
  serviceCard.forEach((card) => {
    cardsObserver.observe(card);
  });
};

initializeCardsObserver();

// Recreate observer on window resize with debouncing
let cardResizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(cardResizeTimeout);
  cardResizeTimeout = setTimeout(() => {
    // Disconnect old one
    cardsObserver.disconnect();

    // Create new observer with updated threshold
    cardsObserver = createCardsObserver();

    initializeCardsObserver();
  }, 250);
});

serviceCardWrapper.forEach((cardWrapper) => {
  const card = cardWrapper.children[0];
  let hasEntered = false;
  let transitionTimeout = null;

  cardWrapper.addEventListener("mouseenter", () => {
    // Only add transition on first entry
    if (!hasEntered) {
      card.classList.add("entering-transform");
      hasEntered = true;

      // Remove transition class after transition completes
      transitionTimeout = setTimeout(() => {
        card.classList.remove("entering-transform");
      }, 151);
    }
  });

  // Add subtle tilt effect on mouse move
  cardWrapper.addEventListener("mousemove", (e) => {
    const rect = cardWrapper.getBoundingClientRect();

    // Find mouse relative to the card
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Card's center point
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // How far the mouse is from vertical center: ( y - centerY )
    // Normalized value between 1 and -1: ( / centerY )
    // Factorized value in grades of rotation, when mouse at bottom having to rotate backwards, hence the minus sign given that reference to the top of the element instead of the bottom: ( * -2 )
    const rotateX = ((y - centerY) / centerY) * -2.8;
    // Ditto, yet the minus sign is not needed
    const rotateY = ((x - centerX) / centerX) * 2.8;

    card.style.transform = `perspective(1300px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-7px) scale(1.023)`;
  });

  cardWrapper.addEventListener("mouseleave", () => {
    if (transitionTimeout) {
      clearTimeout(transitionTimeout);
    }

    // Add transition for smooth return
    card.classList.add("entering-transform");
    card.style.transform = "";

    transitionTimeout = setTimeout(() => {
      card.classList.remove("entering-transform");
    }, 151);

    // Reset for next entry
    hasEntered = false;
  });
});
