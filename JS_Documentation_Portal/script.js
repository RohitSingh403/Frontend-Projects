document.addEventListener("DOMContentLoaded", () => {
  // 1. Target all interactive structural elements
  const sections = document.querySelectorAll(".main-section");
  const navLinks = document.querySelectorAll(".nav-link");

  // 2. Setup the Scroll Observer parameters
  const observerOptions = {
    root: null, // Tracks movements across the device screen view
    rootMargin: "0px",
    threshold: 0.35, // Triggers state switches when 35% of a section fills the window
  };

  // 3. Write active toggle execution state evaluation loops
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      // Evaluate if entry loop block crosses our threshold mark
      if (entry.isIntersecting) {
        const activeId = entry.target.getAttribute("id");

        // Clear active class from all links first
        navLinks.forEach((link) => link.classList.remove("active"));

        // Find and highlight the link matching the visible section
        const targetLink = document.querySelector(
          `.nav-link[href="#${activeId}"]`,
        );
        if (targetLink) {
          targetLink.classList.add("active");
        }
      }
    });
  }, observerOptions);

  // 4. Attach sections to active observer tracking pipelines
  sections.forEach((section) => observer.observe(section));
});
