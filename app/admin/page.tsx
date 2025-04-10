"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { useLanguage } from "@/components/language-provider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import AdminProfile from "@/components/admin/admin-profile"
import AdminProjects from "@/components/admin/admin-projects"
import AdminTechnologies from "@/components/admin/admin-technologies"
import AdminBlog from "@/components/admin/admin-blog"
import AdminResume from "@/components/admin/admin-resume"

export default function AdminPage() {
  const { isAuthenticated } = useAuth()
  const { language } = useLanguage()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  const translations = {
    adminPanel: {
      en: "Admin Panel",
      ru: "Панель администратора",
      uz: "Admin paneli",
    },
    profile: {
      en: "Profile",
      ru: "Профиль",
      uz: "Profil",
    },
    projects: {
      en: "Projects",
      ru: "Проекты",
      uz: "Loyihalar",
    },
    technologies: {
      en: "Technologies",
      ru: "Технологии",
      uz: "Texnologiyalar",
    },
    blog: {
      en: "Blog",
      ru: "Блог",
      uz: "Blog",
    },
    resume: {
      en: "Resume",
      ru: "Резюме",
      uz: "Rezyume",
    },
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">{translations.adminPanel[language]}</h1>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid grid-cols-5 mb-8">
            <TabsTrigger value="profile">{translations.profile[language]}</TabsTrigger>
            <TabsTrigger value="projects">{translations.projects[language]}</TabsTrigger>
            <TabsTrigger value="technologies">{translations.technologies[language]}</TabsTrigger>
            <TabsTrigger value="blog">{translations.blog[language]}</TabsTrigger>
            <TabsTrigger value="resume">{translations.resume[language]}</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <AdminProfile />
          </TabsContent>

          <TabsContent value="projects">
            <AdminProjects />
          </TabsContent>

          <TabsContent value="technologies">
            <AdminTechnologies />
          </TabsContent>

          <TabsContent value="blog">
            <AdminBlog />
          </TabsContent>

          <TabsContent value="resume">
            <AdminResume />
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  )
}
