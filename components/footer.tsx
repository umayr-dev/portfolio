"use client"

import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Github, Linkedin, Twitter, Heart, Users } from "lucide-react"
import { useState, useEffect } from "react"

export default function Footer() {
  const { language } = useLanguage()
  const [visitorCount, setVisitorCount] = useState(0);

useEffect(() => {
  if (!sessionStorage.getItem("visited")) {
    sessionStorage.setItem("visited", "true");

    const storedCount = localStorage.getItem("totalVisitors");
    const newCount = storedCount ? Number.parseInt(storedCount) + 1 : 1;
    localStorage.setItem("totalVisitors", newCount.toString());
    setVisitorCount(newCount);

    // CustomEvent orqali yangilash
    const event = new CustomEvent("visitorCountUpdated", { detail: newCount });
    window.dispatchEvent(event);
  } else {
    // Faqat localStorage dan o‘qib olish
    const storedCount = localStorage.getItem("totalVisitors");
    setVisitorCount(storedCount ? Number.parseInt(storedCount) : 0);
  }
}, []);

useEffect(() => {
  // Listen for visitor count updates
  const handleVisitorCountUpdate = (event: CustomEvent) => {
    setVisitorCount(event.detail);
  };

  window.addEventListener("visitorCountUpdated", handleVisitorCountUpdate as EventListener);

  return () => {
    window.removeEventListener("visitorCountUpdated", handleVisitorCountUpdate as EventListener);
  };
}, []);

  const translations = {
    rights: {
      en: "All rights reserved",
      ru: "Все права защищены",
      uz: "Barcha huquqlar himoyalangan",
    },
    madeWith: {
      en: "Made with",
      ru: "Сделано с",
      uz: "Ishlab chiqilgan",
    },
    navigation: {
      en: "Navigation",
      ru: "Навигация",
      uz: "Navigatsiya",
    },
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
    social: {
      en: "Social",
      ru: "Социальные сети",
      uz: "Ijtimoiy tarmoqlar",
    },
    visitors: {
      en: "Total Visitors",
      ru: "Всего посетителей",
      uz: "Jami tashrif buyuruvchilar",
    },
  }

  return (
    <footer className="bg-background border-t py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                P
              </div>
              <span className="font-bold text-xl">Portfolio</span>
            </Link>
            <p className="text-muted-foreground text-sm mb-4">
              A creative developer focused on building modern and responsive web applications.
            </p>
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Portfolio. {translations.rights[language]}.
            </p>
            <p className="text-sm text-muted-foreground flex items-center gap-1 mt-2">
              {translations.madeWith[language]} <Heart className="h-3 w-3 text-red-500" /> using Next.js & Three.js
            </p>

            {/* Visitor counter */}
            <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>
                {translations.visitors[language]}: <strong>{visitorCount.toLocaleString()}</strong>
              </span>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-4">{translations.navigation[language]}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  {translations.home[language]}
                </Link>
              </li>
              <li>
                <Link href="/#projects" className="text-muted-foreground hover:text-foreground transition-colors">
                  {translations.projects[language]}
                </Link>
              </li>
              <li>
                <Link href="/#technologies" className="text-muted-foreground hover:text-foreground transition-colors">
                  {translations.technologies[language]}
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                  {translations.blog[language]}
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  {translations.contact[language]}
                </Link>
              </li>
              <li>
                <Link href="/resume" className="text-muted-foreground hover:text-foreground transition-colors">
                  {translations.resume[language]}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-4">{translations.social[language]}</h3>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://github.com/umayr-dev" target="_blank" rel="noopener noreferrer">
                  <Github className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://linkedin.com/umayr-dev" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <Twitter className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-4">Newsletter</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Subscribe to receive updates on new projects and blog posts.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Email"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
              <Button type="submit">Subscribe</Button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  )
}
