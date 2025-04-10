"use client"

import { useState } from "react"
import { useLanguage } from "@/components/language-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { toast } from "@/components/ui/use-toast"
import { Plus, Save, Trash } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AdminTechnologies() {
  const { language } = useLanguage()

  // Default technologies data
  const defaultTechnologies = {
    frontend: [
      { name: "HTML5", icon: "🌐", level: 95 },
      { name: "CSS3", icon: "🎨", level: 90 },
      { name: "JavaScript", icon: "📜", level: 95 },
      { name: "TypeScript", icon: "📘", level: 85 },
      { name: "React", icon: "⚛️", level: 90 },
      { name: "Next.js", icon: "▲", level: 85 },
      { name: "Three.js", icon: "🧊", level: 80 },
      { name: "GSAP", icon: "🎭", level: 75 },
    ],
    backend: [
      { name: "Node.js", icon: "🟢", level: 80 },
      { name: "Express", icon: "🚂", level: 75 },
      { name: "MongoDB", icon: "🍃", level: 70 },
      { name: "PostgreSQL", icon: "🐘", level: 65 },
    ],
    tools: [
      { name: "Git", icon: "🔄", level: 85 },
      { name: "GitHub", icon: "🐙", level: 85 },
      { name: "VS Code", icon: "📝", level: 90 },
      { name: "Figma", icon: "🎨", level: 75 },
    ],
  }

  // Get technologies from localStorage or use default
  const getInitialTechnologies = () => {
    if (typeof window !== "undefined") {
      const savedTechnologies = localStorage.getItem("technologies")
      return savedTechnologies ? JSON.parse(savedTechnologies) : defaultTechnologies
    }
    return defaultTechnologies
  }

  const [technologies, setTechnologies] = useState(getInitialTechnologies())
  const [currentTech, setCurrentTech] = useState(null)
  const [currentCategory, setCurrentCategory] = useState("frontend")

  const translations = {
    techSettings: {
      en: "Technologies Settings",
      ru: "Настройки технологий",
      uz: "Texnologiyalar sozlamalari",
    },
    manageTech: {
      en: "Manage your technologies",
      ru: "Управление технологиями",
      uz: "Texnologiyalarni boshqarish",
    },
    techList: {
      en: "Technologies List",
      ru: "Список технологий",
      uz: "Texnologiyalar ro'yxati",
    },
    editTech: {
      en: "Edit Technology",
      ru: "Редактировать технологию",
      uz: "Texnologiyani tahrirlash",
    },
    name: {
      en: "Name",
      ru: "Название",
      uz: "Nomi",
    },
    icon: {
      en: "Icon (Emoji)",
      ru: "Иконка (Эмодзи)",
      uz: "Belgi (Emoji)",
    },
    level: {
      en: "Skill Level",
      ru: "Уровень навыка",
      uz: "Mahorat darajasi",
    },
    category: {
      en: "Category",
      ru: "Категория",
      uz: "Kategoriya",
    },
    save: {
      en: "Save Changes",
      ru: "Сохранить изменения",
      uz: "O'zgarishlarni saqlash",
    },
    addTech: {
      en: "Add New Technology",
      ru: "Добавить новую технологию",
      uz: "Yangi texnologiya qo'shish",
    },
    deleteTech: {
      en: "Delete Technology",
      ru: "Удалить технологию",
      uz: "Texnologiyani o'chirish",
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
    saveSuccess: {
      en: "Technologies updated successfully",
      ru: "Технологии успешно обновлены",
      uz: "Texnologiyalar muvaffaqiyatli yangilandi",
    },
  }

  const handleSelectTech = (tech) => {
    setCurrentTech(tech)
  }

  const handleChange = (field, value) => {
    setCurrentTech({
      ...currentTech,
      [field]: value,
    })
  }

  const handleSave = () => {
    if (currentTech) {
      const category = currentCategory
      const updatedTechnologies = { ...technologies }

      if (currentTech.id) {
        // Update existing tech
        updatedTechnologies[category] = technologies[category].map((t) => (t.id === currentTech.id ? currentTech : t))
      } else {
        // Add new tech with ID
        updatedTechnologies[category] = [...technologies[category], { ...currentTech, id: Date.now() }]
      }

      setTechnologies(updatedTechnologies)
      localStorage.setItem("technologies", JSON.stringify(updatedTechnologies))
      toast({
        title: translations.saveSuccess[language],
        duration: 3000,
      })
      setCurrentTech(null)
    }
  }

  const handleAddTech = () => {
    setCurrentTech({
      id: null,
      name: "",
      icon: "🔧",
      level: 50,
    })
  }

  const handleDeleteTech = () => {
    if (currentTech && currentTech.id) {
      const category = currentCategory
      const updatedTechnologies = { ...technologies }
      updatedTechnologies[category] = technologies[category].filter((t) => t.id !== currentTech.id)

      setTechnologies(updatedTechnologies)
      localStorage.setItem("technologies", JSON.stringify(updatedTechnologies))
      toast({
        title: translations.saveSuccess[language],
        duration: 3000,
      })
      setCurrentTech(null)
    }
  }

  // Add IDs to technologies if they don't have them
  const ensureIds = () => {
    const updatedTechnologies = { ...technologies }
    let changed = false

    Object.keys(updatedTechnologies).forEach((category) => {
      updatedTechnologies[category] = updatedTechnologies[category].map((tech) => {
        if (!tech.id) {
          changed = true
          return { ...tech, id: Date.now() + Math.random() }
        }
        return tech
      })
    })

    if (changed) {
      setTechnologies(updatedTechnologies)
    }

    return updatedTechnologies
  }

  const techsWithIds = ensureIds()

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="md:col-span-1">
        <CardHeader>
          <CardTitle>{translations.techList[language]}</CardTitle>
          <CardDescription>{translations.manageTech[language]}</CardDescription>

          <Select value={currentCategory} onValueChange={setCurrentCategory}>
            <SelectTrigger>
              <SelectValue placeholder={translations.category[language]} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="frontend">{translations.frontend[language]}</SelectItem>
              <SelectItem value="backend">{translations.backend[language]}</SelectItem>
              <SelectItem value="tools">{translations.tools[language]}</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[500px] pr-4">
            <div className="space-y-2">
              {techsWithIds[currentCategory].map((tech) => (
                <Button
                  key={tech.id}
                  variant={currentTech && currentTech.id === tech.id ? "default" : "outline"}
                  className="w-full justify-start text-left h-auto py-3"
                  onClick={() => handleSelectTech(tech)}
                >
                  <span className="mr-2">{tech.icon}</span>
                  {tech.name}
                </Button>
              ))}
            </div>
          </ScrollArea>

          <Button onClick={handleAddTech} className="w-full mt-4 flex items-center gap-2">
            <Plus className="h-4 w-4" />
            {translations.addTech[language]}
          </Button>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>{translations.editTech[language]}</CardTitle>
          <CardDescription>{translations.manageTech[language]}</CardDescription>
        </CardHeader>
        <CardContent>
          {currentTech ? (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">{translations.name[language]}</Label>
                <Input id="name" value={currentTech.name} onChange={(e) => handleChange("name", e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="icon">{translations.icon[language]}</Label>
                <Input id="icon" value={currentTech.icon} onChange={(e) => handleChange("icon", e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="level">
                  {translations.level[language]} ({currentTech.level}%)
                </Label>
                <Slider
                  id="level"
                  min={0}
                  max={100}
                  step={5}
                  value={[currentTech.level]}
                  onValueChange={(value) => handleChange("level", value[0])}
                />
              </div>

              <div className="flex justify-between mt-8">
                <Button
                  variant="destructive"
                  onClick={handleDeleteTech}
                  className="flex items-center gap-2"
                  disabled={!currentTech.id}
                >
                  <Trash className="h-4 w-4" />
                  {translations.deleteTech[language]}
                </Button>

                <Button onClick={handleSave} className="flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  {translations.save[language]}
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              {translations.techList[language]} {translations.manageTech[language].toLowerCase()}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
