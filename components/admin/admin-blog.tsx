"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/components/language-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"
import { Plus, Save, Trash, Eye, Heart, MessageCircle, AlertTriangle } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

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
  author: string
  authorImage: string
  likes: number
  comments: number
  views: number
}

export default function AdminBlog() {
  const { language } = useLanguage()

  // Default blog posts data
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
  ]

  // Get blog posts from localStorage or use default
  const getInitialPosts = () => {
    if (typeof window !== "undefined") {
      const savedPosts = localStorage.getItem("blogPosts")
      if (savedPosts) {
        try {
          const parsedPosts = JSON.parse(savedPosts)
          // Add views field if it doesn't exist
          return parsedPosts.map((post: any) => ({
            ...post,
            views: post.views || 0,
          }))
        } catch (error) {
          console.error("Error parsing saved posts:", error)
          return defaultPosts
        }
      }
    }
    return defaultPosts
  }

  const [posts, setPosts] = useState<BlogPost[]>(getInitialPosts())
  const [currentPost, setCurrentPost] = useState<BlogPost | null>(null)
  const [isFormValid, setIsFormValid] = useState(true)
  const [validationErrors, setValidationErrors] = useState<string[]>([])

  useEffect(() => {
    setPosts(getInitialPosts())
  }, [])

  const translations = {
    blogSettings: {
      en: "Blog Settings",
      ru: "Настройки блога",
      uz: "Blog sozlamalari",
    },
    manageBlog: {
      en: "Manage your blog posts",
      ru: "Управление записями блога",
      uz: "Blog yozuvlarini boshqarish",
    },
    postsList: {
      en: "Blog Posts",
      ru: "Записи блога",
      uz: "Blog yozuvlari",
    },
    editPost: {
      en: "Edit Post",
      ru: "Редактировать запись",
      uz: "Yozuvni tahrirlash",
    },
    title: {
      en: "Title",
      ru: "Заголовок",
      uz: "Sarlavha",
    },
    description: {
      en: "Description",
      ru: "Описание",
      uz: "Tavsif",
    },
    content: {
      en: "Content (HTML)",
      ru: "Содержание (HTML)",
      uz: "Tarkib (HTML)",
    },
    author: {
      en: "Author",
      ru: "Автор",
      uz: "Muallif",
    },
    authorImage: {
      en: "Author Image URL",
      ru: "URL изображения автора",
      uz: "Muallif rasmi URL",
    },
    date: {
      en: "Date",
      ru: "Дата",
      uz: "Sana",
    },
    save: {
      en: "Save Changes",
      ru: "Сохранить изменения",
      uz: "O'zgarishlarni saqlash",
    },
    addPost: {
      en: "Add New Post",
      ru: "Добавить новую запись",
      uz: "Yangi yozuv qo'shish",
    },
    deletePost: {
      en: "Delete Post",
      ru: "Удалить запись",
      uz: "Yozuvni o'chirish",
    },
    english: {
      en: "English",
      ru: "Английский",
      uz: "Ingliz tili",
    },
    russian: {
      en: "Russian",
      ru: "Русский",
      uz: "Rus tili",
    },
    uzbek: {
      en: "Uzbek",
      ru: "Узбекский",
      uz: "O'zbek tili",
    },
    saveSuccess: {
      en: "Blog post updated successfully",
      ru: "Запись блога успешно обновлена",
      uz: "Blog yozuvi muvaffaqiyatli yangilandi",
    },
    deleteSuccess: {
      en: "Blog post deleted successfully",
      ru: "Запись блога успешно удалена",
      uz: "Blog yozuvi muvaffaqiyatli o'chirildi",
    },
    addSuccess: {
      en: "New blog post added successfully",
      ru: "Новая запись блога успешно добавлена",
      uz: "Yangi blog yozuvi muvaffaqiyatli qo'shildi",
    },
    views: {
      en: "Views",
      ru: "Просмотры",
      uz: "Ko'rishlar",
    },
    likes: {
      en: "Likes",
      ru: "Лайки",
      uz: "Layklar",
    },
    comments: {
      en: "Comments",
      ru: "Комментарии",
      uz: "Izohlar",
    },
    stats: {
      en: "Statistics",
      ru: "Статистика",
      uz: "Statistika",
    },
    deleteConfirm: {
      en: "Are you sure you want to delete this post?",
      ru: "Вы уверены, что хотите удалить эту запись?",
      uz: "Haqiqatan ham bu yozuvni o'chirib tashlamoqchimisiz?",
    },
    deleteWarning: {
      en: "This will permanently delete the post and all its comments. This action cannot be undone.",
      ru: "Это навсегда удалит запись и все комментарии к ней. Это действие нельзя отменить.",
      uz: "Bu yozuv va uning barcha izohlari butunlay o'chiriladi. Bu amalni qaytarib bo'lmaydi.",
    },
    cancel: {
      en: "Cancel",
      ru: "Отмена",
      uz: "Bekor qilish",
    },
    confirm: {
      en: "Delete",
      ru: "Удалить",
      uz: "O'chirish",
    },
    validationErrors: {
      en: "Please fix the following errors:",
      ru: "Пожалуйста, исправьте следующие ошибки:",
      uz: "Iltimos, quyidagi xatolarni tuzating:",
    },
    titleRequired: {
      en: "Title is required in all languages",
      ru: "Заголовок требуется на всех языках",
      uz: "Barcha tillarda sarlavha talab qilinadi",
    },
    descriptionRequired: {
      en: "Description is required in all languages",
      ru: "Описание требуется на всех языках",
      uz: "Barcha tillarda tavsif talab qilinadi",
    },
    contentRequired: {
      en: "Content is required in all languages",
      ru: "Содержание требуется на всех языках",
      uz: "Barcha tillarda tarkib talab qilinadi",
    },
    authorRequired: {
      en: "Author name is required",
      ru: "Имя автора обязательно",
      uz: "Muallif ismi talab qilinadi",
    },
    dateRequired: {
      en: "Date is required",
      ru: "Дата обязательна",
      uz: "Sana talab qilinadi",
    },
  }

  const handleSelectPost = (post: BlogPost) => {
    setCurrentPost(post)
    setIsFormValid(true)
    setValidationErrors([])
  }

  const handleChange = (lang: string, field: string, value: string) => {
    if (!currentPost) return

    if (typeof currentPost[field] === "object") {
      setCurrentPost({
        ...currentPost,
        [field]: {
          ...currentPost[field],
          [lang]: value,
        },
      })
    } else {
      setCurrentPost({
        ...currentPost,
        [field]: value,
      })
    }
  }

  const validateForm = (): boolean => {
    if (!currentPost) return false

    const errors: string[] = []

    // Check title in all languages
    if (!currentPost.title.en || !currentPost.title.ru || !currentPost.title.uz) {
      errors.push(translations.titleRequired[language])
    }

    // Check description in all languages
    if (!currentPost.description.en || !currentPost.description.ru || !currentPost.description.uz) {
      errors.push(translations.descriptionRequired[language])
    }

    // Check content in all languages
    if (!currentPost.content.en || !currentPost.content.ru || !currentPost.content.uz) {
      errors.push(translations.contentRequired[language])
    }

    // Check author
    if (!currentPost.author) {
      errors.push(translations.authorRequired[language])
    }

    // Check date
    if (!currentPost.date) {
      errors.push(translations.dateRequired[language])
    }

    setValidationErrors(errors)
    return errors.length === 0
  }

  const handleSave = () => {
    if (!currentPost) return

    // Validate form
    if (!validateForm()) {
      setIsFormValid(false)
      toast({
        title: translations.validationErrors[language],
        description: validationErrors.join(", "),
        variant: "destructive",
      })
      return
    }

    try {
      // Check if we need to update comments
      let updatedComments = currentPost.comments || 0

      // If this is an existing post, get its comments
      if (currentPost.id) {
        const savedComments = localStorage.getItem(`comments_${currentPost.id}`)
        if (savedComments) {
          updatedComments = JSON.parse(savedComments).length
        }
      }

      const updatedPost = {
        ...currentPost,
        comments: updatedComments,
      }

      // Update or add post
      let updatedPosts: BlogPost[]
      let successMessage: string

      if (currentPost.id) {
        // Update existing post
        updatedPosts = posts.map((p) => (p.id === currentPost.id ? updatedPost : p))
        successMessage = translations.saveSuccess[language]
      } else {
        // Add new post with ID and default stats
        const newPost = {
          ...updatedPost,
          id: Date.now(),
          views: 0,
          likes: 0,
          comments: 0,
        }
        updatedPosts = [...posts, newPost]
        successMessage = translations.addSuccess[language]
      }

      setPosts(updatedPosts)
      localStorage.setItem("blogPosts", JSON.stringify(updatedPosts))

      toast({
        title: successMessage,
        duration: 3000,
      })

      setCurrentPost(null)
    } catch (error) {
      console.error("Error saving blog post:", error)
      toast({
        title: "Error",
        description: "There was a problem saving the blog post",
        variant: "destructive",
      })
    }
  }

  const handleAddPost = () => {
    const today = new Date().toISOString().split("T")[0]
    setCurrentPost({
      id: 0, // Will be replaced with timestamp when saved
      title: { en: "", ru: "", uz: "" },
      description: { en: "", ru: "", uz: "" },
      content: { en: "", ru: "", uz: "" }, // Ensure content is initialized
      date: today,
      author: "John Doe",
      authorImage: "/placeholder.svg?height=40&width=40",
      likes: 0,
      comments: 0,
      views: 0,
    })
    setIsFormValid(true)
    setValidationErrors([])
  }

  const handleDeletePost = () => {
    if (!currentPost || !currentPost.id) return

    try {
      // Delete post
      const updatedPosts = posts.filter((p) => p.id !== currentPost.id)
      setPosts(updatedPosts)
      localStorage.setItem("blogPosts", JSON.stringify(updatedPosts))

      // Delete comments for this post
      localStorage.removeItem(`comments_${currentPost.id}`)

      toast({
        title: translations.deleteSuccess[language],
        duration: 3000,
      })

      setCurrentPost(null)
    } catch (error) {
      console.error("Error deleting blog post:", error)
      toast({
        title: "Error",
        description: "There was a problem deleting the blog post",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="md:col-span-1">
        <CardHeader>
          <CardTitle>{translations.postsList[language]}</CardTitle>
          <CardDescription>{translations.manageBlog[language]}</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[500px] pr-4">
            <div className="space-y-2">
              {posts.map((post) => (
                <Button
                  key={post.id}
                  variant={currentPost && currentPost.id === post.id ? "default" : "outline"}
                  className="w-full justify-start text-left h-auto py-3"
                  onClick={() => handleSelectPost(post)}
                >
                  <div className="w-full">
                    <div className="font-medium">{post.title[language] || post.title.en}</div>
                    <div className="text-xs text-muted-foreground">{post.date}</div>
                    <div className="flex gap-2 mt-1">
                      <Badge variant="outline" className="text-xs flex items-center gap-1">
                        <Eye className="h-3 w-3" /> {post.views}
                      </Badge>
                      <Badge variant="outline" className="text-xs flex items-center gap-1">
                        <Heart className="h-3 w-3" /> {post.likes}
                      </Badge>
                      <Badge variant="outline" className="text-xs flex items-center gap-1">
                        <MessageCircle className="h-3 w-3" /> {post.comments}
                      </Badge>
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </ScrollArea>

          <Button onClick={handleAddPost} className="w-full mt-4 flex items-center gap-2">
            <Plus className="h-4 w-4" />
            {translations.addPost[language]}
          </Button>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>{translations.editPost[language]}</CardTitle>
          <CardDescription>{translations.manageBlog[language]}</CardDescription>
        </CardHeader>
        <CardContent>
          {currentPost ? (
            <>
              {!isFormValid && validationErrors.length > 0 && (
                <div className="mb-6 p-4 border border-destructive/50 bg-destructive/10 rounded-md">
                  <div className="flex items-center gap-2 text-destructive font-medium mb-2">
                    <AlertTriangle className="h-5 w-5" />
                    {translations.validationErrors[language]}
                  </div>
                  <ul className="list-disc pl-5 text-sm text-destructive">
                    {validationErrors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}

              <Tabs defaultValue="en" className="w-full">
                <TabsList className="grid grid-cols-3 mb-8">
                  <TabsTrigger value="en">{translations.english[language]}</TabsTrigger>
                  <TabsTrigger value="ru">{translations.russian[language]}</TabsTrigger>
                  <TabsTrigger value="uz">{translations.uzbek[language]}</TabsTrigger>
                </TabsList>

                {["en", "ru", "uz"].map((lang) => (
                  <TabsContent key={lang} value={lang} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor={`title-${lang}`} className="flex items-center gap-1">
                        {translations.title[language]}
                        <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id={`title-${lang}`}
                        value={currentPost.title[lang]}
                        onChange={(e) => handleChange(lang, "title", e.target.value)}
                        className={!isFormValid && !currentPost.title[lang] ? "border-destructive" : ""}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`description-${lang}`} className="flex items-center gap-1">
                        {translations.description[language]}
                        <span className="text-destructive">*</span>
                      </Label>
                      <Textarea
                        id={`description-${lang}`}
                        value={currentPost.description[lang]}
                        onChange={(e) => handleChange(lang, "description", e.target.value)}
                        rows={2}
                        className={!isFormValid && !currentPost.description[lang] ? "border-destructive" : ""}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`content-${lang}`} className="flex items-center gap-1">
                        {translations.content[language]}
                        <span className="text-destructive">*</span>
                      </Label>
                      <Textarea
                        id={`content-${lang}`}
                        value={currentPost.content[lang]}
                        onChange={(e) => handleChange(lang, "content", e.target.value)}
                        rows={10}
                        className={`font-mono text-sm ${
                          !isFormValid && !currentPost.content[lang] ? "border-destructive" : ""
                        }`}
                      />
                    </div>
                  </TabsContent>
                ))}

                <div className="space-y-4 mt-6">
                  <div className="space-y-2">
                    <Label htmlFor="author" className="flex items-center gap-1">
                      {translations.author[language]}
                      <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="author"
                      value={currentPost.author}
                      onChange={(e) => handleChange("", "author", e.target.value)}
                      className={!isFormValid && !currentPost.author ? "border-destructive" : ""}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="authorImage">{translations.authorImage[language]}</Label>
                    <Input
                      id="authorImage"
                      value={currentPost.authorImage}
                      onChange={(e) => handleChange("", "authorImage", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="date" className="flex items-center gap-1">
                      {translations.date[language]}
                      <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="date"
                      type="date"
                      value={currentPost.date}
                      onChange={(e) => handleChange("", "date", e.target.value)}
                      className={!isFormValid && !currentPost.date ? "border-destructive" : ""}
                    />
                  </div>

                  {currentPost.id !== 0 && (
                    <div className="mt-6 p-4 bg-muted rounded-lg">
                      <h3 className="font-medium mb-2">{translations.stats[language]}</h3>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="flex flex-col items-center p-3 bg-background rounded-md">
                          <Eye className="h-5 w-5 mb-1 text-blue-500" />
                          <span className="text-lg font-bold">{currentPost.views}</span>
                          <span className="text-xs text-muted-foreground">{translations.views[language]}</span>
                        </div>
                        <div className="flex flex-col items-center p-3 bg-background rounded-md">
                          <Heart className="h-5 w-5 mb-1 text-red-500" />
                          <span className="text-lg font-bold">{currentPost.likes}</span>
                          <span className="text-xs text-muted-foreground">{translations.likes[language]}</span>
                        </div>
                        <div className="flex flex-col items-center p-3 bg-background rounded-md">
                          <MessageCircle className="h-5 w-5 mb-1 text-green-500" />
                          <span className="text-lg font-bold">{currentPost.comments}</span>
                          <span className="text-xs text-muted-foreground">{translations.comments[language]}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-between mt-8">
                  {currentPost.id !== 0 ? (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" className="flex items-center gap-2">
                          <Trash className="h-4 w-4" />
                          {translations.deletePost[language]}
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>{translations.deleteConfirm[language]}</AlertDialogTitle>
                          <AlertDialogDescription>{translations.deleteWarning[language]}</AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>{translations.cancel[language]}</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={handleDeletePost}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            {translations.confirm[language]}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  ) : (
                    <div></div> // Empty div to maintain flex layout
                  )}

                  <Button onClick={handleSave} className="flex items-center gap-2">
                    <Save className="h-4 w-4" />
                    {translations.save[language]}
                  </Button>
                </div>
              </Tabs>
            </>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              {translations.postsList[language]} {translations.manageBlog[language].toLowerCase()}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
