"use client"

import { useLanguage } from "@/components/language-provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Download, Briefcase, GraduationCap, Award, Star } from "lucide-react"
import { motion } from "framer-motion"

export default function Resume() {
  const { language } = useLanguage()

  const translations = {
    resume: {
      en: "Resume",
      ru: "Резюме",
      uz: "Rezyume",
    },
    download: {
      en: "Download Resume",
      ru: "Скачать резюме",
      uz: "Rezyumeni yuklab olish",
    },
    experience: {
      en: "Work Experience",
      ru: "Опыт работы",
      uz: "Ish tajribasi",
    },
    education: {
      en: "Education",
      ru: "Образование",
      uz: "Ta'lim",
    },
    skills: {
      en: "Skills",
      ru: "Навыки",
      uz: "Ko'nikmalar",
    },
    languages: {
      en: "Languages",
      ru: "Языки",
      uz: "Tillar",
    },
    awards: {
      en: "Awards & Certifications",
      ru: "Награды и сертификаты",
      uz: "Mukofotlar va sertifikatlar",
    },
    present: {
      en: "Present",
      ru: "Настоящее время",
      uz: "Hozirgi vaqt",
    },
  }

  const resumeData = {
    experience: [
      {
        title: {
          en: "Junior Frontend Developer",
          ru: "Junior Frontend-разработчик",
          uz: "Junior Frontend dasturchi",
        },
        company: "Ardentsoft Solutions Inc.",
        period: { start: "2024", end: "present" },
        description: {
          en: "Led the development of responsive web applications using React, Next.js, and Three.js. Implemented state management with Redux and integrated RESTful APIs.",
          ru: "Руководил разработкой адаптивных веб-приложений с использованием React, Next.js и Three.js. Реализовал управление состоянием с помощью Redux и интегрировал RESTful API.",
          uz: "React, Next.js va Three.js yordamida moslashuvchan veb-ilovalarni ishlab chiqishga rahbarlik qildi. Redux bilan holat boshqaruvini amalga oshirdi va RESTful API-larni integratsiya qildi.",
        },
      },
    ],
    education: [
      {
        degree: {
          en: "Bachelor of Science in Information Technology",
          ru: "Бакалавр наук в области информационных технологий",
          uz: "Axborot texnologiyalari bo'yicha bakalavr",
        },
        institution: "Tashkent  University of information technology",
        period: { start: "2023", end: "2027" },
        description: {
          en: "Coursework included Web Development, Database Systems, and UI/UX Design. Graduated with honors.",
          ru: "Курсовые работы включали веб-разработку, системы баз данных и дизайн UI/UX. Окончил с отличием.",
          uz: "O'quv dasturiga veb-ishlab chiqarish, ma'lumotlar bazasi tizimlari va UI/UX dizayni kiradi. Imtiyozli diplom bilan bitirgan.",
        },
      },
    ],
    skills: [
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Three.js",
      "GSAP",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Git",
      "Figma",
      "Responsive Design",
      "WebGL",
    ],
    languages: [
      {
        name: {
          en: "English",
          ru: "Английский",
          uz: "Ingliz tili",
        },
        level: {
          en: "B1",
          ru: "B1",
          uz: "B1",
        },
      },
      {
        name: {
          en: "Russian",
          ru: "Русский",
          uz: "Rus tili",
        },
        level: {
          en: "A2",
          ru: "Родной",
          uz: "A2",
        },
      },
      {
        name: {
          en: "Uzbek",
          ru: "Узбекский",
          uz: "O'zbek tili",
        },
        level: {
          en: "Native",
          ru: "Родной",
          uz: "Ona tili",
        },
      },
    ],
    awards: [
      {
        title: {
          en: "Frontend Development Certification",
          ru: "Сертификация по фронтенд-разработке",
          uz: "Frontend ishlab chiqarish sertifikati",
        },
        issuer: "Tech Academy",
        year: "2022",
      },
    ],
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <motion.h1
            className="text-4xl font-bold mb-4 md:mb-0"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {translations.resume[language]}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <a href="/umar kodirberganov (2).pdf" download="resume.pdf">
              <Button className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                {translations.download[language]}
              </Button>
            </a>
          </motion.div>
        </div>

        <motion.div className="space-y-12" variants={container} initial="hidden" animate="show">
          {/* Experience Section */}
          <motion.section variants={item}>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Briefcase className="h-5 w-5 text-primary" />
                  <h2 className="text-2xl font-bold">{translations.experience[language]}</h2>
                </div>

                <div className="space-y-8">
                  {resumeData.experience.map((exp, index) => (
                    <div key={index} className="border-l-2 border-primary pl-4 ml-2">
                      <h3 className="text-xl font-semibold">{exp.title[language]}</h3>
                      <p className="text-muted-foreground">{exp.company}</p>
                      <p className="text-sm text-muted-foreground mb-2">
                        {exp.period.start} -{" "}
                        {exp.period.end === "present" ? translations.present[language] : exp.period.end}
                      </p>
                      <p>{exp.description[language]}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.section>

          {/* Education Section */}
          <motion.section variants={item}>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <GraduationCap className="h-5 w-5 text-primary" />
                  <h2 className="text-2xl font-bold">{translations.education[language]}</h2>
                </div>

                <div className="space-y-8">
                  {resumeData.education.map((edu, index) => (
                    <div key={index} className="border-l-2 border-primary pl-4 ml-2">
                      <h3 className="text-xl font-semibold">{edu.degree[language]}</h3>
                      <p className="text-muted-foreground">{edu.institution}</p>
                      <p className="text-sm text-muted-foreground mb-2">
                        {edu.period.start} - {edu.period.end}
                      </p>
                      <p>{edu.description[language]}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.section>

          {/* Skills & Languages Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Skills */}
            <motion.section variants={item}>
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <Star className="h-5 w-5 text-primary" />
                    <h2 className="text-2xl font-bold">{translations.skills[language]}</h2>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {resumeData.skills.map((skill, index) => (
                      <div key={index} className="bg-muted text-muted-foreground px-3 py-1 rounded-full text-sm">
                        {skill}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.section>

            {/* Languages */}
            <motion.section variants={item}>
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <GraduationCap className="h-5 w-5 text-primary" />
                    <h2 className="text-2xl font-bold">{translations.languages[language]}</h2>
                  </div>

                  <div className="space-y-4">
                    {resumeData.languages.map((lang, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="font-medium">{lang.name[language]}</span>
                        <span className="text-muted-foreground">{lang.level[language]}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.section>
          </div>

          {/* Awards Section */}
          <motion.section variants={item}>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Award className="h-5 w-5 text-primary" />
                  <h2 className="text-2xl font-bold">{translations.awards[language]}</h2>
                </div>

                <div className="space-y-4">
                  {resumeData.awards.map((award, index) => (
                    <div key={index} className="border-l-2 border-primary pl-4 ml-2">
                      <h3 className="text-lg font-semibold">{award.title[language]}</h3>
                      <p className="text-muted-foreground">{award.issuer}</p>
                      <p className="text-sm text-muted-foreground">{award.year}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.section>
        </motion.div>
      </div>
      <Footer />
    </div>
  )
}
