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
import { Save } from "lucide-react"

export default function AdminProfile() {
  const { language } = useLanguage()

  // Default profile data
  const defaultProfile = {
    en: {
      name: "John Doe",
      title: "Frontend Developer",
      description: "I build interactive web experiences with modern technologies like React, Three.js, and GSAP.",
      greeting: "Hi, I'm",
    },
    ru: {
      name: "Джон Доу",
      title: "Фронтенд-разработчик",
      description:
        "Я создаю интерактивные веб-приложения с использованием современных технологий, таких как React, Three.js и GSAP.",
      greeting: "Привет, я",
    },
    uz: {
      name: "Jon Dou",
      title: "Frontend dasturchi",
      description:
        "Men React, Three.js va GSAP kabi zamonaviy texnologiyalar bilan interaktiv veb-tajribalar yarataman.",
      greeting: "Salom, men",
    },
  }

  // Get profile from localStorage or use default
  const getInitialProfile = () => {
    if (typeof window !== "undefined") {
      const savedProfile = localStorage.getItem("profile")
      return savedProfile ? JSON.parse(savedProfile) : defaultProfile
    }
    return defaultProfile
  }

  const [profile, setProfile] = useState(getInitialProfile())

  const translations = {
    profileSettings: {
      en: "Profile Settings",
      ru: "Настройки профиля",
      uz: "Profil sozlamalari",
    },
    editProfile: {
      en: "Edit your profile information",
      ru: "Редактировать информацию профиля",
      uz: "Profil ma'lumotlarini tahrirlash",
    },
    name: {
      en: "Name",
      ru: "Имя",
      uz: "Ism",
    },
    title: {
      en: "Title",
      ru: "Должность",
      uz: "Lavozim",
    },
    greeting: {
      en: "Greeting",
      ru: "Приветствие",
      uz: "Salomlashish",
    },
    description: {
      en: "Description",
      ru: "Описание",
      uz: "Tavsif",
    },
    save: {
      en: "Save Changes",
      ru: "Сохранить изменения",
      uz: "O'zgarishlarni saqlash",
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
      en: "Profile updated successfully",
      ru: "Профиль успешно обновлен",
      uz: "Profil muvaffaqiyatli yangilandi",
    },
  }

  const handleChange = (lang: string, field: string, value: string) => {
    setProfile({
      ...profile,
      [lang]: {
        ...profile[lang],
        [field]: value,
      },
    })
  }

  const handleSave = () => {
    localStorage.setItem("profile", JSON.stringify(profile))
    toast({
      title: translations.saveSuccess[language],
      duration: 3000,
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{translations.profileSettings[language]}</CardTitle>
        <CardDescription>{translations.editProfile[language]}</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="en" className="w-full">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="en">{translations.english[language]}</TabsTrigger>
            <TabsTrigger value="ru">{translations.russian[language]}</TabsTrigger>
            <TabsTrigger value="uz">{translations.uzbek[language]}</TabsTrigger>
          </TabsList>

          {["en", "ru", "uz"].map((lang) => (
            <TabsContent key={lang} value={lang} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor={`name-${lang}`}>{translations.name[language]}</Label>
                <Input
                  id={`name-${lang}`}
                  value={profile[lang].name}
                  onChange={(e) => handleChange(lang, "name", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`greeting-${lang}`}>{translations.greeting[language]}</Label>
                <Input
                  id={`greeting-${lang}`}
                  value={profile[lang].greeting}
                  onChange={(e) => handleChange(lang, "greeting", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`title-${lang}`}>{translations.title[language]}</Label>
                <Input
                  id={`title-${lang}`}
                  value={profile[lang].title}
                  onChange={(e) => handleChange(lang, "title", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`description-${lang}`}>{translations.description[language]}</Label>
                <Textarea
                  id={`description-${lang}`}
                  value={profile[lang].description}
                  onChange={(e) => handleChange(lang, "description", e.target.value)}
                  rows={4}
                />
              </div>
            </TabsContent>
          ))}

          <Button onClick={handleSave} className="mt-6 flex items-center gap-2">
            <Save className="h-4 w-4" />
            {translations.save[language]}
          </Button>
        </Tabs>
      </CardContent>
    </Card>
  )
}
