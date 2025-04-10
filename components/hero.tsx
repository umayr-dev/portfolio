"use client"

import { useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"
import { ArrowRight, Github, Linkedin, Twitter } from "lucide-react"
import Link from "next/link"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { gsap } from "gsap"
import { motion } from "framer-motion"

export default function Hero() {
  const { language } = useLanguage()
  const canvasRef = useRef<HTMLDivElement>(null)

  const translations = {
    greeting: {
      en: "Hi, I'm",
      ru: "Привет, я",
      uz: "Salom, men",
    },
    name: {
      en: "Umar Kodirberganov",
      ru: "Умар Кодирберганов",
      uz: "Umar Kodirberganov",
    },
    title: {
      en: "Frontend Developer",
      ru: "Фронтенд-разработчик",
      uz: "Frontend dasturchi",
    },
    description: {
      en: "I build interactive web experiences with modern technologies like React, Three.js, and GSAP.",
      ru: "Я создаю интерактивные веб-приложения с использованием современных технологий, таких как React, Three.js и GSAP.",
      uz: "Men React, Three.js va GSAP kabi zamonaviy texnologiyalar bilan interaktiv veb-tajribalar yarataman.",
    },
    cta: {
      en: "View My Work",
      ru: "Посмотреть мои работы",
      uz: "Ishlarimni ko'rish",
    },
    resume: {
      en: "Resume",
      ru: "Резюме",
      uz: "Rezyume",
    },
  }

  useEffect(() => {
    if (!canvasRef.current) return

    // Scene setup
    const scene = new THREE.Scene()

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 5

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    canvasRef.current.appendChild(renderer.domElement)

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.enableZoom = false

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry()
    const particlesCount = 3000 // Increased particle count

    const posArray = new Float32Array(particlesCount * 3)

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 15 // Increased spread
    }

    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3))

    // Materials
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.03, // Slightly larger particles
      color: new THREE.Color(0x5f5af6),
      transparent: true,
      blending: THREE.AdditiveBlending,
    })

    // Mesh
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particlesMesh)

    // Add stars (smaller particles in the background)
    const starsGeometry = new THREE.BufferGeometry()
    const starsCount = 1000
    const starsArray = new Float32Array(starsCount * 3)

    for (let i = 0; i < starsCount * 3; i++) {
      starsArray[i] = (Math.random() - 0.5) * 30 // Even wider spread for stars
    }

    starsGeometry.setAttribute("position", new THREE.BufferAttribute(starsArray, 3))

    const starsMaterial = new THREE.PointsMaterial({
      size: 0.01,
      color: new THREE.Color(0xffffff),
      transparent: true,
      blending: THREE.AdditiveBlending,
    })

    const starsMesh = new THREE.Points(starsGeometry, starsMaterial)
    scene.add(starsMesh)

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    // Add point light
    const pointLight = new THREE.PointLight(0x5f5af6, 0.8) // Brighter light
    pointLight.position.set(2, 3, 4)
    scene.add(pointLight)

    // Add a second colored light
    const secondLight = new THREE.PointLight(0xff00ff, 0.5)
    secondLight.position.set(-3, -2, 2)
    scene.add(secondLight)

    // Animation
    const clock = new THREE.Clock()

    const animate = () => {
      const elapsedTime = clock.getElapsedTime()

      // Rotate particles
      particlesMesh.rotation.y = elapsedTime * 0.05
      particlesMesh.rotation.x = elapsedTime * 0.02

      // Rotate stars in opposite direction
      starsMesh.rotation.y = -elapsedTime * 0.02
      starsMesh.rotation.z = elapsedTime * 0.01

      // Update controls
      controls.update()

      // Render
      renderer.render(scene, camera)

      // Call animate again on the next frame
      window.requestAnimationFrame(animate)
    }

    animate()

    // GSAP animation for particles
    gsap.to(particlesMesh.rotation, {
      duration: 20,
      y: Math.PI * 4,
      repeat: -1,
      ease: "none",
    })

    // Pulsating effect for stars
    gsap.to(starsMaterial, {
      size: 0.02,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    })

    // Handle resize
    const handleResize = () => {
      // Update camera
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()

      // Update renderer
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    }

    window.addEventListener("resize", handleResize)

    // Mouse movement effect
    const handleMouseMove = (event: MouseEvent) => {
      const mouseX = (event.clientX / window.innerWidth) * 2 - 1
      const mouseY = -(event.clientY / window.innerHeight) * 2 + 1

      gsap.to(particlesMesh.rotation, {
        x: mouseY * 0.1,
        y: mouseX * 0.1,
        duration: 2,
        ease: "power1.out",
      })
    }

    window.addEventListener("mousemove", handleMouseMove)

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
      canvasRef.current?.removeChild(renderer.domElement)
      scene.remove(particlesMesh)
      scene.remove(starsMesh)
      particlesGeometry.dispose()
      particlesMaterial.dispose()
      starsGeometry.dispose()
      starsMaterial.dispose()
    }
  }, [])

  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/70 to-background dark:from-background/0 dark:via-background/80 dark:to-background z-0"></div>
      <div ref={canvasRef} className="absolute inset-0 -z-10" />

      <div className="container mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10">
        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
          <h2 className="text-xl font-medium text-muted-foreground mb-2">{translations.greeting[language]}</h2>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
            {translations.name[language]}
          </h1>
          <h3 className="text-2xl md:text-3xl font-semibold mb-6">{translations.title[language]}</h3>
          <p className="text-muted-foreground text-lg max-w-md mb-8">{translations.description[language]}</p>

          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg" className="gap-2">
              <Link href="#projects">
                {translations.cta[language]}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/resume">{translations.resume[language]}</Link>
            </Button>
          </div>

          <div className="flex gap-4 mt-8">
            <Button variant="ghost" size="icon" asChild>
              <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <Twitter className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative hidden lg:block"
        >
          <div className="aspect-square rounded-full bg-gradient-to-br from-primary/20 to-purple-600/20 flex items-center justify-center backdrop-blur-sm">
            <div className="w-3/4 h-3/4 rounded-full bg-gradient-to-tr from-primary/30 to-purple-600/30 flex items-center justify-center animate-pulse">
              <div className="w-1/2 h-1/2 rounded-full bg-gradient-to-bl from-primary/40 to-purple-600/40" />
            </div>
          </div>

          {/* Floating elements */}
          <div className="absolute top-10 right-10 w-8 h-8 rounded-full bg-primary/30 animate-bounce"></div>
          <div className="absolute bottom-20 left-10 w-6 h-6 rounded-full bg-purple-500/30 animate-pulse"></div>
          <div className="absolute top-1/2 right-0 w-4 h-4 rounded-full bg-blue-500/30 animate-ping"></div>
        </motion.div>
      </div>
    </section>
  )
}
