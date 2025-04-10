"use client"

import { useEffect } from "react"
import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import Projects from "@/components/projects"
import Technologies from "@/components/technologies"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import { useTheme } from "next-themes"

export default function Home() {
  const { theme } = useTheme()

  useEffect(() => {
    // Add stars for the cosmos theme
    if (document.querySelectorAll(".star").length === 0) {
      const starsContainer = document.createElement("div")
      starsContainer.className = "stars-container fixed inset-0 pointer-events-none z-0"

      // Create 20 stars
      for (let i = 0; i < 20; i++) {
        const star = document.createElement("div")
        star.className = "star"
        starsContainer.appendChild(star)
      }

      document.body.appendChild(starsContainer)
    }

    // Add decorative elements for light mode
    if (document.querySelectorAll(".light-decoration").length === 0) {
      for (let i = 0; i < 3; i++) {
        const decoration = document.createElement("div")
        decoration.className = "light-decoration"
        document.body.appendChild(decoration)
      }
    }

    // Add waving effect
    if (!document.querySelector(".animated-wave")) {
      const wave = document.createElement("div")
      wave.className = "animated-wave"
      document.body.appendChild(wave)
    }

    // Set up scroll animations
    const scrollAnimateElements = document.querySelectorAll(".scroll-animate")
    const staggerAnimateElements = document.querySelectorAll(".stagger-animate")

    const checkInView = () => {
      const windowHeight = window.innerHeight
      const scrollY = window.scrollY

      scrollAnimateElements.forEach((element) => {
        const elementPosition = element.getBoundingClientRect().top + scrollY
        if (scrollY > elementPosition - windowHeight + 100) {
          element.classList.add("in-view")
        }
      })

      staggerAnimateElements.forEach((element) => {
        const elementPosition = element.getBoundingClientRect().top + scrollY
        if (scrollY > elementPosition - windowHeight + 100) {
          element.classList.add("in-view")
        }
      })
    }

    // Run once on load
    setTimeout(checkInView, 100)

    // Add scroll listener
    window.addEventListener("scroll", checkInView)

    return () => {
      // Cleanup function
      window.removeEventListener("scroll", checkInView)

      const starsContainer = document.querySelector(".stars-container")
      if (starsContainer) {
        document.body.removeChild(starsContainer)
      }

      const decorations = document.querySelectorAll(".light-decoration")
      decorations.forEach((decoration) => {
        document.body.removeChild(decoration)
      })

      const wave = document.querySelector(".animated-wave")
      if (wave) {
        document.body.removeChild(wave)
      }
    }
  }, [])

  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />

      {/* Section divider */}
      <div className="section-divider wave">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fillOpacity="1"
            d="M0,32L48,48C96,64,192,96,288,106.7C384,117,480,107,576,101.3C672,96,768,96,864,106.7C960,117,1056,139,1152,133.3C1248,128,1344,96,1392,80L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>

      <Projects />

      {/* Another section divider */}
      <div className="section-divider">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fillOpacity="1"
            d="M0,160L48,165.3C96,171,192,181,288,181.3C384,181,480,171,576,144C672,117,768,75,864,64C960,53,1056,75,1152,90.7C1248,107,1344,117,1392,122.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>

      <Technologies />

      {/* Another section divider */}
      <div className="section-divider">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fillOpacity="1"
            d="M0,288L48,272C96,256,192,224,288,213.3C384,203,480,213,576,213.3C672,213,768,203,864,202.7C960,203,1056,213,1152,218.7C1248,224,1344,224,1392,224L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>

      <Contact />
      <Footer />
    </main>
  )
}
