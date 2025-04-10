"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useTheme } from "next-themes"
import { useLanguage } from "@/components/language-provider"
import { useAuth } from "@/components/auth-provider"
import {
  Menu,
  Moon,
  Sun,
  Globe,
  Home,
  User,
  Briefcase,
  FileText,
  Code,
  MessageSquare,
  LogIn,
  LogOut,
  Settings,
} from "lucide-react"
import { motion } from "framer-motion"

export default function Navbar() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const { language, setLanguage } = useLanguage()
  const { user, isAuthenticated, logout } = useAuth()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const translations = {
    home: {
      en: "Home",
      ru: "Главная",
      uz: "Asosiy",
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
    contact: {
      en: "Contact",
      ru: "Контакты",
      uz: "Aloqa",
    },
    resume: {
      en: "Resume",
      ru: "Резюме",
      uz: "Rezyume",
    },
    login: {
      en: "Login",
      ru: "Вход",
      uz: "Kirish",
    },
    logout: {
      en: "Logout",
      ru: "Выход",
      uz: "Chiqish",
    },
    admin: {
      en: "Admin",
      ru: "Админ",
      uz: "Admin",
    },
  }

  const navItems = [
    { href: "/", label: translations.home, icon: Home },
    { href: "/#projects", label: translations.projects, icon: Briefcase },
    { href: "/#technologies", label: translations.technologies, icon: Code },
    { href: "/blog", label: translations.blog, icon: MessageSquare },
    { href: "/#contact", label: translations.contact, icon: User },
    { href: "/resume", label: translations.resume, icon: FileText },
  ]

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(path)
  }

  if (!isMounted) {
    return null
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <motion.div
            className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            P
          </motion.div>
          <span className="font-bold text-xl">Portfolio</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive(item.href) ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {item.label[language]}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            aria-label="Toggle theme"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="bg-background hover:bg-muted transition-colors"
          >
            {theme === "dark" ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5 text-primary" />}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle language"
            onClick={() => {
              const languages = ["en", "ru", "uz"]
              const currentIndex = languages.indexOf(language)
              const nextIndex = (currentIndex + 1) % languages.length
              setLanguage(languages[nextIndex])
            }}
          >
            <Globe className="h-5 w-5" />
          </Button>

          {isAuthenticated ? (
            <>
              <Button asChild variant="ghost" size="sm" className="gap-1">
                <Link href="/admin">
                  <Settings className="h-4 w-4 mr-1" />
                  {translations.admin[language]}
                </Link>
              </Button>
              <Button variant="ghost" size="sm" className="gap-1" onClick={logout}>
                <LogOut className="h-4 w-4 mr-1" />
                {translations.logout[language]}
              </Button>
            </>
          ) : (
            <Button asChild variant="ghost" size="sm" className="gap-1">
              <Link href="/login">
                <LogIn className="h-4 w-4 mr-1" />
                {translations.login[language]}
              </Link>
            </Button>
          )}

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4 mt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary ${
                      isActive(item.href) ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label[language]}
                  </Link>
                ))}

                {isAuthenticated ? (
                  <>
                    <Link
                      href="/admin"
                      className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary"
                    >
                      <Settings className="h-4 w-4" />
                      {translations.admin[language]}
                    </Link>
                    <button
                      onClick={logout}
                      className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary text-muted-foreground text-left"
                    >
                      <LogOut className="h-4 w-4" />
                      {translations.logout[language]}
                    </button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary text-muted-foreground"
                  >
                    <LogIn className="h-4 w-4" />
                    {translations.login[language]}
                  </Link>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
