"use client"

import { useRef, useEffect } from "react"
import { useLanguage } from "@/components/language-provider"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, Github } from "lucide-react"
import { motion, useInView } from "framer-motion"
import Link from "next/link"

export default function Projects() {
  const { language } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const translations = {
    title: {
      en: "Projects",
      ru: "Проекты",
      uz: "Loyihalar",
    },
    subtitle: {
      en: "Check out some of my recent work",
      ru: "Ознакомьтесь с некоторыми из моих недавних работ",
      uz: "Mening so'nggi ishlarimdan ba'zilari bilan tanishing",
    },
    viewProject: {
      en: "View Project",
      ru: "Посмотреть проект",
      uz: "Loyihani ko'rish",
    },
    viewCode: {
      en: "View Code",
      ru: "Посмотреть код",
      uz: "Kodni ko'rish",
    },
  }

  // Get projects from localStorage or use default
  const getProjects = () => {
    if (typeof window !== "undefined") {
      const savedProjects = localStorage.getItem("projects")
      if (savedProjects) {
        return JSON.parse(savedProjects)
      }
    }

    return [
      {
        id: 1,
        title: {
          en: "3D Product Configurator",
          ru: "3D Конфигуратор продукта",
          uz: "3D Mahsulot konfiguratori",
        },
        description: {
          en: "Interactive 3D product configurator built with Three.js and React. Users can customize colors, materials, and add accessories in real-time.",
          ru: "Интерактивный 3D-конфигуратор продукта, созданный с помощью Three.js и React. Пользователи могут настраивать цвета, материалы и добавлять аксессуары в режиме реального времени.",
          uz: "Three.js va React yordamida yaratilgan interaktiv 3D mahsulot konfiguratori. Foydalanuvchilar ranglarni, materiallarni sozlashlari va real vaqt rejimida aksessuarlar qo'shishlari mumkin.",
        },
        image: "/placeholder.svg?height=250&width=500",
        tags: ["Three.js", "React", "WebGL", "GSAP"],
        demoUrl: "#",
        codeUrl: "#",
      },
      {
        id: 2,
        title: {
          en: "E-commerce Dashboard",
          ru: "Панель управления E-commerce",
          uz: "E-tijorat boshqaruv paneli",
        },
        description: {
          en: "A comprehensive dashboard for e-commerce businesses with sales analytics, inventory management, and customer insights.",
          ru: "Комплексная панель управления для предприятий электронной коммерции с аналитикой продаж, управлением запасами и информацией о клиентах.",
          uz: "Savdo tahlillari, inventarizatsiyani boshqarish va mijozlar ma'lumotlari bilan elektron tijorat biznesi uchun keng qamrovli boshqaruv paneli.",
        },
        image: "/placeholder.svg?height=250&width=500",
        tags: ["Next.js", "Tailwind CSS", "Chart.js", "Supabase"],
        demoUrl: "#",
        codeUrl: "#",
      },
      {
        id: 3,
        title: {
          en: "Multilingual Blog Platform",
          ru: "Многоязычная блог-платформа",
          uz: "Ko'p tilli blog platformasi",
        },
        description: {
          en: "A blog platform with support for multiple languages, rich text editing, and social sharing features.",
          ru: "Блог-платформа с поддержкой нескольких языков, редактированием форматированного текста и функциями обмена в социальных сетях.",
          uz: "Bir nechta tillarni qo'llab-quvvatlash, boy matn tahrirlash va ijtimoiy tarmoqlarda ulashish imkoniyatlari bilan blog platformasi.",
        },
        image: "/placeholder.svg?height=250&width=500",
        tags: ["Next.js", "i18n", "MDX", "Vercel"],
        demoUrl: "#",
        codeUrl: "#",
      },
      {
        id: 4,
        title: {
          en: "Interactive Data Visualization",
          ru: "Интерактивная визуализация данных",
          uz: "Interaktiv ma'lumotlarni vizualizatsiya qilish",
        },
        description: {
          en: "A data visualization tool that transforms complex datasets into interactive and insightful visual representations.",
          ru: "Инструмент визуализации данных, который преобразует сложные наборы данных в интерактивные и содержательные визуальные представления.",
          uz: "Murakkab ma'lumotlar to'plamlarini interaktiv va mazmunli vizual ko'rinishlarga aylantiradigan ma'lumotlarni vizualizatsiya qilish vositasi.",
        },
        image: "/placeholder.svg?height=250&width=500",
        tags: ["D3.js", "React", "TypeScript", "REST API"],
        demoUrl: "#",
        codeUrl: "#",
      },
    ]
  }

  const projects = getProjects()

  // Set up scroll animations
  useEffect(() => {
    const cards = document.querySelectorAll(".project-card")

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("scroll-animate", "zoom-in", "in-view")
            }, index * 150) // Staggered animation
          }
        })
      },
      { threshold: 0.1 },
    )

    cards.forEach((card) => {
      card.classList.add("scroll-animate", "zoom-in")
      observer.observe(card)
    })

    return () => {
      cards.forEach((card) => observer.unobserve(card))
    }
  }, [])

  return (
    <section id="projects" className="py-16 bg-muted/50">
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

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-8 stagger-animate">
          {projects.map((project, index) => (
            <div key={project.id} className="project-card h-full">
              <Card className="overflow-hidden h-full flex flex-col hover:shadow-lg transition-shadow duration-300 group">
                <div className="aspect-video bg-muted overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title[language]}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="group-hover:text-primary transition-colors duration-300">
                    {project.title[language]}
                  </CardTitle>
                  <CardDescription>{project.description[language]}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="secondary" className="bg-primary/10 text-primary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button asChild variant="default" size="sm" className="gap-1">
                    <Link href={project.demoUrl}>
                      {translations.viewProject[language]}
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="sm" className="gap-1">
                    <Link href={project.codeUrl}>
                      {translations.viewCode[language]}
                      <Github className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
