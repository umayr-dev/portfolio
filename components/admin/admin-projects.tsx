"use client"

import { useState } from "react"
import { useLanguage } from "@/components/language-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"
import { Plus, Save, Trash } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function AdminProjects() {
  const { language } = useLanguage()

  // Default projects data
  const defaultProjects = [
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
  ]

  // Get projects from localStorage or use default
  const getInitialProjects = () => {
    if (typeof window !== "undefined") {
      const savedProjects = localStorage.getItem("projects")
      return savedProjects ? JSON.parse(savedProjects) : defaultProjects
    }
    return defaultProjects
  }

  const [projects, setProjects] = useState(getInitialProjects())
  const [currentProject, setCurrentProject] = useState(null)
  const [newTag, setNewTag] = useState("")

  const translations = {
    projectsSettings: {
      en: "Projects Settings",
      ru: "Настройки проектов",
      uz: "Loyihalar sozlamalari",
    },
    manageProjects: {
      en: "Manage your projects",
      ru: "Управление проектами",
      uz: "Loyihalarni boshqarish",
    },
    projectsList: {
      en: "Projects List",
      ru: "Список проектов",
      uz: "Loyihalar ro'yxati",
    },
    editProject: {
      en: "Edit Project",
      ru: "Редактировать проект",
      uz: "Loyihani tahrirlash",
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
    imageUrl: {
      en: "Image URL",
      ru: "URL изображения",
      uz: "Rasm URL",
    },
    demoUrl: {
      en: "Demo URL",
      ru: "URL демо",
      uz: "Demo URL",
    },
    codeUrl: {
      en: "Code URL",
      ru: "URL кода",
      uz: "Kod URL",
    },
    tags: {
      en: "Tags",
      ru: "Теги",
      uz: "Teglar",
    },
    addTag: {
      en: "Add Tag",
      ru: "Добавить тег",
      uz: "Teg qo'shish",
    },
    save: {
      en: "Save Changes",
      ru: "Сохранить изменения",
      uz: "O'zgarishlarni saqlash",
    },
    addProject: {
      en: "Add New Project",
      ru: "Добавить новый проект",
      uz: "Yangi loyiha qo'shish",
    },
    deleteProject: {
      en: "Delete Project",
      ru: "Удалить проект",
      uz: "Loyihani o'chirish",
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
      en: "Projects updated successfully",
      ru: "Проекты успешно обновлены",
      uz: "Loyihalar muvaffaqiyatli yangilandi",
    },
  }

  const handleSelectProject = (project) => {
    setCurrentProject(project)
  }

  const handleChange = (lang, field, value) => {
    setCurrentProject({
      ...currentProject,
      [field]: typeof currentProject[field] === "object" ? { ...currentProject[field], [lang]: value } : value,
    })
  }

  const handleAddTag = () => {
    if (newTag.trim() && !currentProject.tags.includes(newTag.trim())) {
      setCurrentProject({
        ...currentProject,
        tags: [...currentProject.tags, newTag.trim()],
      })
      setNewTag("")
    }
  }

  const handleRemoveTag = (tag) => {
    setCurrentProject({
      ...currentProject,
      tags: currentProject.tags.filter((t) => t !== tag),
    })
  }

  const handleSave = () => {
    if (currentProject) {
      const updatedProjects = currentProject.id
        ? projects.map((p) => (p.id === currentProject.id ? currentProject : p))
        : [...projects, { ...currentProject, id: Date.now() }]

      setProjects(updatedProjects)
      localStorage.setItem("projects", JSON.stringify(updatedProjects))
      toast({
        title: translations.saveSuccess[language],
        duration: 3000,
      })
      setCurrentProject(null)
    }
  }

  const handleAddProject = () => {
    setCurrentProject({
      id: null,
      title: { en: "", ru: "", uz: "" },
      description: { en: "", ru: "", uz: "" },
      image: "/placeholder.svg?height=250&width=500",
      tags: [],
      demoUrl: "#",
      codeUrl: "#",
    })
  }

  const handleDeleteProject = () => {
    if (currentProject && currentProject.id) {
      const updatedProjects = projects.filter((p) => p.id !== currentProject.id)
      setProjects(updatedProjects)
      localStorage.setItem("projects", JSON.stringify(updatedProjects))
      toast({
        title: translations.saveSuccess[language],
        duration: 3000,
      })
      setCurrentProject(null)
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="md:col-span-1">
        <CardHeader>
          <CardTitle>{translations.projectsList[language]}</CardTitle>
          <CardDescription>{translations.manageProjects[language]}</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[500px] pr-4">
            <div className="space-y-2">
              {projects.map((project) => (
                <Button
                  key={project.id}
                  variant={currentProject && currentProject.id === project.id ? "default" : "outline"}
                  className="w-full justify-start text-left h-auto py-3"
                  onClick={() => handleSelectProject(project)}
                >
                  {project.title[language] || project.title.en}
                </Button>
              ))}
            </div>
          </ScrollArea>

          <Button onClick={handleAddProject} className="w-full mt-4 flex items-center gap-2">
            <Plus className="h-4 w-4" />
            {translations.addProject[language]}
          </Button>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>{translations.editProject[language]}</CardTitle>
          <CardDescription>{translations.manageProjects[language]}</CardDescription>
        </CardHeader>
        <CardContent>
          {currentProject ? (
            <Tabs defaultValue="en" className="w-full">
              <TabsList className="grid grid-cols-3 mb-8">
                <TabsTrigger value="en">{translations.english[language]}</TabsTrigger>
                <TabsTrigger value="ru">{translations.russian[language]}</TabsTrigger>
                <TabsTrigger value="uz">{translations.uzbek[language]}</TabsTrigger>
              </TabsList>

              {["en", "ru", "uz"].map((lang) => (
                <TabsContent key={lang} value={lang} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor={`title-${lang}`}>{translations.title[language]}</Label>
                    <Input
                      id={`title-${lang}`}
                      value={currentProject.title[lang]}
                      onChange={(e) => handleChange(lang, "title", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`description-${lang}`}>{translations.description[language]}</Label>
                    <Textarea
                      id={`description-${lang}`}
                      value={currentProject.description[lang]}
                      onChange={(e) => handleChange(lang, "description", e.target.value)}
                      rows={4}
                    />
                  </div>
                </TabsContent>
              ))}

              <div className="space-y-4 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="image">{translations.imageUrl[language]}</Label>
                  <Input
                    id="image"
                    value={currentProject.image}
                    onChange={(e) => handleChange("", "image", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="demoUrl">{translations.demoUrl[language]}</Label>
                  <Input
                    id="demoUrl"
                    value={currentProject.demoUrl}
                    onChange={(e) => handleChange("", "demoUrl", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="codeUrl">{translations.codeUrl[language]}</Label>
                  <Input
                    id="codeUrl"
                    value={currentProject.codeUrl}
                    onChange={(e) => handleChange("", "codeUrl", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>{translations.tags[language]}</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {currentProject.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                        {tag}
                        <button onClick={() => handleRemoveTag(tag)} className="ml-1 text-xs hover:text-destructive">
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      placeholder="React, Next.js, etc."
                      onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
                    />
                    <Button type="button" onClick={handleAddTag}>
                      {translations.addTag[language]}
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <Button
                  variant="destructive"
                  onClick={handleDeleteProject}
                  className="flex items-center gap-2"
                  disabled={!currentProject.id}
                >
                  <Trash className="h-4 w-4" />
                  {translations.deleteProject[language]}
                </Button>

                <Button onClick={handleSave} className="flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  {translations.save[language]}
                </Button>
              </div>
            </Tabs>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              {translations.projectsList[language]} {translations.manageProjects[language].toLowerCase()}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
