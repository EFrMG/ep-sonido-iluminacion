export function aboutCtaButtonHandling() {
  const aboutCta = document.getElementById("about-cta");
  const ctaObserver = new IntersectionObserver(animateOnScroll, {
    threshold: 0.85,
  });

  // Add fade-in animation class to elements
  function animateOnScroll(entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("intersected");
        // Stop observing after animation
        observer.unobserve(entry.target);
      }
    });
  }

  if (aboutCta) {
    ctaObserver.observe(aboutCta);
  }

  const ctaButton = document.querySelector(".about-cta-button");
  const ctaButtonWrapper = document.querySelector(".about-cta-button-wrapper");
  if (ctaButtonWrapper && ctaButton) {
    ctaButtonWrapper.addEventListener("mouseenter", () => {
      // Subtle _plop_ feedback
      ctaButton.style.scale = "0.94";
      setTimeout(() => {
        ctaButton.style.scale = "1";
      }, 270);
    });
  }
}
