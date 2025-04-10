"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/components/language-provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, Calendar, Eye } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"

// Type definitions
interface BlogPost {
  id: number
  title: {
    en: string
    ru: string
    uz: string
  }
  description: {
    en: string
    ru: string
    uz: string
  }
  content: {
    en: string
    ru: string
    uz: string
  }
  date: string
  likes: number
  comments: number
  views: number
  author: string
  authorImage: string
}

export default function Blog() {
  const { language } = useLanguage()
  const { toast } = useToast()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [likedPosts, setLikedPosts] = useState<number[]>([])

  // Load blog posts from localStorage or use default
  useEffect(() => {
    const loadPosts = () => {
      try {
        // Try to get posts from localStorage
        const savedPosts = localStorage.getItem("blogPosts")
        if (savedPosts) {
          const parsedPosts = JSON.parse(savedPosts)

          // Add views field if it doesn't exist and ensure content exists
          const updatedPosts = parsedPosts.map((post: any) => ({
            ...post,
            views: post.views || 0,
            // If post doesn't have content, initialize it from description
            content: post.content || {
              en: post.description?.en || "",
              ru: post.description?.ru || "",
              uz: post.description?.uz || "",
            },
          }))

          setPosts(updatedPosts)

          // Save the updated structure back to localStorage
          localStorage.setItem("blogPosts", JSON.stringify(updatedPosts))
        } else {
          // Use default posts if none in localStorage
          const defaultPosts = [
            {
              id: 1,
              title: {
                en: "Getting Started with Three.js",
                ru: "Начало работы с Three.js",
                uz: "Three.js bilan ishlashni boshlash",
              },
              description: {
                en: "Learn the basics of 3D web development with Three.js",
                ru: "Изучите основы 3D веб-разработки с Three.js",
                uz: "Three.js yordamida 3D veb-ishlab chiqarishning asoslarini o'rganing",
              },
              content: {
                en: `<p>Three.js is a powerful JavaScript library that makes it easier to create 3D graphics in the browser using WebGL. In this tutorial, we'll explore the basics of setting up a Three.js scene.</p>
              
              <h2>Setting Up Your First Scene</h2>
              
              <p>To get started with Three.js, you need to create three main components: a scene, a camera, and a renderer. The scene is where you place your objects, lights, and cameras. The camera defines what you see, and the renderer displays the scene through the camera's perspective.</p>`,
                ru: `<p>Three.js - это мощная библиотека JavaScript, которая упрощает создание 3D-графики в браузере с использованием WebGL. В этом уроке мы рассмотрим основы настройки сцены Three.js.</p>
              
              <h2>Настройка вашей первой сцены</h2>
              
              <p>Чтобы начать работу с Three.js, вам нужно создать три основных компонента: сцену, камеру и рендерер. Сцена - это место, где вы размещаете объекты, источники света и камеры. Камера определяет то, что вы видите, а рендерер отображает сцену через перспективу камеры.</p>`,
                uz: `<p>Three.js - bu brauzerda WebGL yordamida 3D grafikani yaratishni osonlashtiradigan kuchli JavaScript kutubxonasi. Ushbu qo'llanmada biz Three.js sahnasini sozlashning asoslarini ko'rib chiqamiz.</p>
              
              <h2>Birinchi sahnangizni sozlash</h2>
              
              <p>Three.js bilan ishlashni boshlash uchun siz uchta asosiy komponentni yaratishingiz kerak: sahna, kamera va renderer. Sahna - bu siz ob'ektlarni, chiroqlarni va kameralarni joylashtiriladigan joy. Kamera siz ko'radigan narsani belgilaydi, va renderer sahnani kamera nuqtai nazaridan ko'rsatadi.</p>`,
              },
              date: "2023-12-15",
              likes: 24,
              comments: 8,
              views: 156,
              author: "John Doe",
              authorImage: "/placeholder.svg?height=40&width=40",
            },
            // Add content to other default posts...
            {
              id: 2,
              title: {
                en: "GSAP Animations for Modern Websites",
                ru: "GSAP анимации для современных сайтов",
                uz: "Zamonaviy veb-saytlar uchun GSAP animatsiyalari",
              },
              description: {
                en: "Create smooth animations with GreenSock Animation Platform",
                ru: "Создавайте плавные анимации с помощью GreenSock Animation Platform",
                uz: "GreenSock Animation Platform yordamida silliq animatsiyalarni yarating",
              },
              content: {
                en: `<p>GSAP (GreenSock Animation Platform) is a robust JavaScript animation library that enables developers to create high-performance animations with minimal code. In this article, we'll explore how to use GSAP to create engaging web animations.</p>
              
              <h2>Getting Started with GSAP</h2>
              
              <p>GSAP provides a simple API for animating HTML elements. You can animate CSS properties, SVG, canvas, and more. Let's start with a basic example:</p>`,
                ru: `<p>GSAP (GreenSock Animation Platform) - это надежная библиотека анимации JavaScript, которая позволяет разработчикам создавать высокопроизводительные анимации с минимальным кодом. В этой статье мы рассмотрим, как использовать GSAP для создания привлекательных веб-анимаций.</p>
              
              <h2>Начало работы с GSAP</h2>
              
              <p>GSAP предоставляет простой API для анимации HTML-элементов. Вы можете анимировать свойства CSS, SVG, canvas и многое другое. Давайте начнем с простого примера:</p>`,
                uz: `<p>GSAP (GreenSock Animation Platform) - bu dasturchilarga minimal kod bilan yuqori samarali animatsiyalarni yaratish imkonini beruvchi mustahkam JavaScript animatsiya kutubxonasi. Ushbu maqolada biz jozibali veb-animatsiyalarni yaratish uchun GSAP-dan qanday foydalanishni ko'rib chiqamiz.</p>
              
              <h2>GSAP bilan ishlashni boshlash</h2>
              
              <p>GSAP HTML elementlarini animatsiya qilish uchun oddiy API taqdim etadi. Siz CSS xususiyatlarini, SVG, canvas va boshqalarni animatsiya qilishingiz mumkin. Keling, oddiy misol bilan boshlaymiz:</p>`,
              },
              date: "2024-01-20",
              likes: 36,
              comments: 12,
              views: 203,
              author: "Jane Smith",
              authorImage: "/placeholder.svg?height=40&width=40",
            },
            {
              id: 3,
              title: {
                en: "Building Multilingual Websites with Next.js",
                ru: "Создание многоязычных сайтов с Next.js",
                uz: "Next.js yordamida ko'p tilli veb-saytlarni yaratish",
              },
              description: {
                en: "A comprehensive guide to implementing language switching in Next.js",
                ru: "Полное руководство по реализации переключения языков в Next.js",
                uz: "Next.js-da til almashtirish imkoniyatini amalga oshirish bo'yicha keng qo'llanma",
              },
              content: {
                en: `<p>Creating multilingual websites is essential for reaching a global audience. Next.js provides excellent tools for implementing internationalization (i18n) in your web applications.</p>
              
              <h2>Setting Up i18n in Next.js</h2>
              
              <p>Next.js offers built-in support for internationalized routing and language detection. This makes it easy to create pages that can be served in different languages based on the user's preferences.</p>`,
                ru: `<p>Создание многоязычных веб-сайтов необходимо для охвата глобальной аудитории. Next.js предоставляет отличные инструменты для реализации интернационализации (i18n) в ваших веб-приложениях.</p>
              
              <h2>Настройка i18n в Next.js</h2>
              
              <p>Next.js предлагает встроенную поддержку интернационализированной маршрутизации и определения языка. Это упрощает создание страниц, которые могут отображаться на разных языках в зависимости от предпочтений пользователя.</p>`,
                uz: `<p>Ko'p tilli veb-saytlarni yaratish global auditoriyaga yetib borish uchun muhimdir. Next.js veb-ilovalaringizda xalqarolashtirish (i18n) ni amalga oshirish uchun ajoyib vositalarni taqdim etadi.</p>
              
              <h2>Next.js-da i18n-ni sozlash</h2>
              
              <p>Next.js xalqarolashtirilgan yo'naltirish va tilni aniqlash uchun o'rnatilgan yordamni taklif qiladi. Bu foydalanuvchi afzalliklariga qarab turli tillarda xizmat ko'rsatishi mumkin bo'lgan sahifalarni yaratishni osonlashtiradi.</p>`,
              },
              date: "2024-02-10",
              likes: 18,
              comments: 5,
              views: 127,
              author: "Alex Johnson",
              authorImage: "/placeholder.svg?height=40&width=40",
            },
          ]
          setPosts(defaultPosts)
          localStorage.setItem("blogPosts", JSON.stringify(defaultPosts))
        }

        // Load liked posts
        const savedLikedPosts = localStorage.getItem("likedPosts")
        if (savedLikedPosts) {
          setLikedPosts(JSON.parse(savedLikedPosts))
        }
      } catch (error) {
        console.error("Error loading blog posts:", error)
        toast({
          title: "Error loading blog posts",
          description: "There was a problem loading the blog posts.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    loadPosts()

    // Update visitor count
    updateVisitorCount()
  }, [toast])

  // Update visitor count
  const updateVisitorCount = () => {
    try {
      // Get current visitor count
      let visitorCount = Number.parseInt(localStorage.getItem("totalVisitors") || "0")

      // Check if this is a new session
      const lastVisit = localStorage.getItem("lastVisit")
      const now = new Date().toISOString()

      if (!lastVisit || new Date(lastVisit).getTime() < new Date().getTime() - 30 * 60 * 1000) {
        // If no last visit or last visit was more than 30 minutes ago, count as new visit
        visitorCount++
        localStorage.setItem("totalVisitors", visitorCount.toString())
        localStorage.setItem("lastVisit", now)

        // Dispatch event for footer to update
        window.dispatchEvent(new CustomEvent("visitorCountUpdated", { detail: visitorCount }))
      }
    } catch (error) {
      console.error("Error updating visitor count:", error)
    }
  }

  const handleLike = (id: number) => {
    try {
      // Check if post is already liked
      const isLiked = likedPosts.includes(id)
      let updatedLikedPosts: number[]
      let updatedPosts: BlogPost[]

      if (isLiked) {
        // Unlike the post
        updatedLikedPosts = likedPosts.filter((postId) => postId !== id)
        updatedPosts = posts.map((post) => (post.id === id ? { ...post, likes: Math.max(0, post.likes - 1) } : post))

        toast({
          title: "Post unliked",
          description: "You have removed your like from this post",
        })
      } else {
        // Like the post
        updatedLikedPosts = [...likedPosts, id]
        updatedPosts = posts.map((post) => (post.id === id ? { ...post, likes: post.likes + 1 } : post))

        toast({
          title: "Post liked!",
          description: "Thank you for your feedback",
        })
      }

      // Update state
      setLikedPosts(updatedLikedPosts)
      setPosts(updatedPosts)

      // Save to localStorage
      localStorage.setItem("likedPosts", JSON.stringify(updatedLikedPosts))
      localStorage.setItem("blogPosts", JSON.stringify(updatedPosts))
    } catch (error) {
      console.error("Error liking post:", error)
      toast({
        title: "Error",
        description: "There was a problem with the like action",
        variant: "destructive",
      })
    }
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  const translations = {
    blog: {
      en: "Blog",
      ru: "Блог",
      uz: "Blog",
    },
    readMore: {
      en: "Read More",
      ru: "Читать далее",
      uz: "Batafsil",
    },
    comments: {
      en: "Comments",
      ru: "Комментарии",
      uz: "Izohlar",
    },
    views: {
      en: "Views",
      ru: "Просмотры",
      uz: "Ko'rishlar",
    },
    loading: {
      en: "Loading blog posts...",
      ru: "Загрузка статей блога...",
      uz: "Blog maqolalari yuklanmoqda...",
    },
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold mb-12">{translations.blog[language]}</h1>
          <p>{translations.loading[language]}</p>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <motion.h1
          className="text-4xl font-bold mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {translations.blog[language]}
        </motion.h1>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {posts.map((post) => (
            <motion.div key={post.id} variants={item}>
              <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-300 group">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-2">
                    <Avatar>
                      <AvatarImage src={post.authorImage} alt={post.author} />
                      <AvatarFallback>{post.author.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{post.author}</p>
                      <div className="flex items-center text-muted-foreground text-xs">
                        <Calendar className="h-3 w-3 mr-1" />
                        {post.date}
                      </div>
                    </div>
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors duration-300">
                    {post.title[language]}
                  </CardTitle>
                  <CardDescription>{post.description[language]}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="h-32 bg-muted rounded-md mb-4 flex items-center justify-center overflow-hidden">
                    <img
                      src={`/placeholder.svg?height=200&width=400&text=Blog+${post.id}`}
                      alt="Post thumbnail"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="flex gap-4">
                    <Button
                      variant={likedPosts.includes(post.id) ? "default" : "ghost"}
                      size="sm"
                      className="flex items-center gap-1"
                      onClick={() => handleLike(post.id)}
                    >
                      <Heart className={`h-4 w-4 ${likedPosts.includes(post.id) ? "fill-current" : ""}`} />
                      <span>{post.likes}</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center gap-1">
                      <MessageCircle className="h-4 w-4" />
                      <span>{post.comments}</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      <span>{post.views}</span>
                    </Button>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/blog/${post.id}`}>{translations.readMore[language]}</Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <Footer />
    </div>
  )
}
