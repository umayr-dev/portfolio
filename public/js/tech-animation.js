// This file will be loaded in the page to animate tech bars
document.addEventListener("DOMContentLoaded", () => {
  // Add the animation class to tech bars when document is loaded
  function animateTechBars() {
    const techBars = document.querySelectorAll(".tech-bar")
    techBars.forEach((bar) => {
      const width = bar.getAttribute("data-width")
      if (width) {
        bar.style.width = width
      }
    })
  }

  // Add scroll animations for staggered elements
  function initScrollAnimations() {
    const scrollObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view")
          }
        })
      },
      { threshold: 0.1 },
    )

    document.querySelectorAll(".scroll-animate").forEach((element) => {
      scrollObserver.observe(element)
    })

    document.querySelectorAll(".stagger-animate").forEach((element) => {
      scrollObserver.observe(element)
    })
  }

  // Initialize animations with a slight delay to ensure DOM is ready
  setTimeout(() => {
    animateTechBars()
    initScrollAnimations()
  }, 500)

  // Handle tab switching to trigger animations
  document.querySelectorAll('[role="tab"]').forEach((tab) => {
    tab.addEventListener("click", () => {
      // Allow time for tab content to become visible
      setTimeout(animateTechBars, 100)
    })
  })
})
