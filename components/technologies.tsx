"use client"

import { useRef, useEffect } from "react"
import { useLanguage } from "@/components/language-provider"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion, useInView } from "framer-motion"

export default function Technologies() {
  const { language } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const translations = {
    title: {
      en: "Technologies",
      ru: "Технологии",
      uz: "Texnologiyalar",
    },
    subtitle: {
      en: "Tools and technologies I work with",
      ru: "Инструменты и технологии, с которыми я работаю",
      uz: "Men ishlaydigan vositalar va texnologiyalar",
    },
    frontend: {
      en: "Frontend",
      ru: "Фронтенд",
      uz: "Frontend",
    },
    backend: {
      en: "Backend",
      ru: "Бэкенд",
      uz: "Backend",
    },
    tools: {
      en: "Tools",
      ru: "Инструменты",
      uz: "Vositalar",
    },
  }

  // Get tech data from localStorage or use default
  const getTechnologies = () => {
    if (typeof window !== "undefined") {
      const savedTechnologies = localStorage.getItem("technologies")
      if (savedTechnologies) {
        return JSON.parse(savedTechnologies)
      }
    }

    return {
      frontend: [
        { name: "HTML5", icon: "🌐", level: 95 },
        { name: "CSS3", icon: "🎨", level: 90 },
        { name: "JavaScript", icon: "📜", level: 95 },
        { name: "TypeScript", icon: "📘", level: 85 },
        { name: "React", icon: "⚛️", level: 90 },
        { name: "Next.js", icon: "▲", level: 85 },
        { name: "Three.js", icon: "🧊", level: 80 },
        { name: "GSAP", icon: "🎭", level: 75 },
        { name: "Tailwind CSS", icon: "🌬️", level: 90 },
        { name: "Framer Motion", icon: "🎬", level: 80 },
      ],
      backend: [
        { name: "Node.js", icon: "🟢", level: 80 },
        { name: "Express", icon: "🚂", level: 75 },
        { name: "MongoDB", icon: "🍃", level: 70 },
        { name: "PostgreSQL", icon: "🐘", level: 65 },
        { name: "Firebase", icon: "🔥", level: 75 },
        { name: "Supabase", icon: "⚡", level: 70 },
        { name: "REST API", icon: "🔄", level: 85 },
        { name: "GraphQL", icon: "📊", level: 70 },
      ],
      tools: [
        { name: "Git", icon: "🔄", level: 85 },
        { name: "GitHub", icon: "🐙", level: 85 },
        { name: "VS Code", icon: "📝", level: 90 },
        { name: "Figma", icon: "🎨", level: 75 },
        { name: "Webpack", icon: "📦", level: 70 },
        { name: "Vite", icon: "⚡", level: 80 },
        { name: "Jest", icon: "🃏", level: 70 },
        { name: "Docker", icon: "🐳", level: 65 },
      ],
    }
  }

  const technologies = getTechnologies()

  // Set up scroll animations for tech bars
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const bars = entry.target.querySelectorAll(".tech-bar")
            bars.forEach((bar, index) => {
              setTimeout(() => {
                bar.classList.add("animate-tech")
              }, index * 100)
            })
          }
        })
      },
      { threshold: 0.2 },
    )

    const tabContents = document.querySelectorAll(".tab-content")
    tabContents.forEach((content) => {
      observer.observe(content)
    })

    return () => {
      tabContents.forEach((content) => observer.unobserve(content))
    }
  }, [])

  return (
    <section id="technologies" className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 scroll-animate fade-up">
          <motion.h2
            className="text-3xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {translations.title[language]}
          </motion.h2>
          <motion.p
            className="text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {translations.subtitle[language]}
          </motion.p>
        </div>

        <div ref={ref} className="scroll-animate fade-up">
          <Tabs defaultValue="frontend" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger
                value="frontend"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300"
              >
                {translations.frontend[language]}
              </TabsTrigger>
              <TabsTrigger
                value="backend"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300"
              >
                {translations.backend[language]}
              </TabsTrigger>
              <TabsTrigger
                value="tools"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300"
              >
                {translations.tools[language]}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="frontend" className="tab-content">
              <Card className="border border-primary/10 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 stagger-animate">
                    {technologies.frontend.map((tech, index) => (
                      <div key={index} className="hover:scale-105 transition-transform duration-300">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-2xl">{tech.icon}</span>
                          <span className="font-medium">{tech.name}</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary tech-bar"
                            style={{
                              width: "0%",
                              transition: "width 1.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
                            }}
                            data-width={`${tech.level}%`}
                          />
                        </div>
                        <div className="text-right text-sm text-muted-foreground mt-1">{tech.level}%</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="backend" className="tab-content">
              <Card className="border border-primary/10 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 stagger-animate">
                    {technologies.backend.map((tech, index) => (
                      <div key={index} className="hover:scale-105 transition-transform duration-300">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-2xl">{tech.icon}</span>
                          <span className="font-medium">{tech.name}</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary tech-bar"
                            style={{
                              width: "0%",
                              transition: "width 1.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
                            }}
                            data-width={`${tech.level}%`}
                          />
                        </div>
                        <div className="text-right text-sm text-muted-foreground mt-1">{tech.level}%</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tools" className="tab-content">
              <Card className="border border-primary/10 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 stagger-animate">
                    {technologies.tools.map((tech, index) => (
                      <div key={index} className="hover:scale-105 transition-transform duration-300">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-2xl">{tech.icon}</span>
                          <span className="font-medium">{tech.name}</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary tech-bar"
                            style={{
                              width: "0%",
                              transition: "width 1.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
                            }}
                            data-width={`${tech.level}%`}
                          />
                        </div>
                        <div className="text-right text-sm text-muted-foreground mt-1">{tech.level}%</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  )
}
