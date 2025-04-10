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
import { ScrollArea } from "@/components/ui/scroll-area"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function AdminResume() {
  const { language } = useLanguage()

  // Default resume data
  const defaultResume = {
    experience: [
      {
        id: 1,
        title: {
          en: "Senior Frontend Developer",
          ru: "Старший Frontend-разработчик",
          uz: "Katta Frontend dasturchi",
        },
        company: "Tech Solutions Inc.",
        period: { start: "2021", end: "present" },
        description: {
          en: "Led the development of responsive web applications using React, Next.js, and Three.js. Implemented state management with Redux and integrated RESTful APIs.",
          ru: "Руководил разработкой адаптивных веб-приложений с использованием React, Next.js и Three.js. Реализовал управление состоянием с помощью Redux и интегрировал RESTful API.",
          uz: "React, Next.js va Three.js yordamida moslashuvchan veb-ilovalarni ishlab chiqishga rahbarlik qildi. Redux bilan holat boshqaruvini amalga oshirdi va RESTful API-larni integratsiya qildi.",
        },
      },
      {
        id: 2,
        title: {
          en: "Frontend Developer",
          ru: "Frontend-разработчик",
          uz: "Frontend dasturchi",
        },
        company: "Digital Creations",
        period: { start: "2018", end: "2021" },
        description: {
          en: "Developed and maintained client websites using JavaScript, HTML, CSS, and various frontend frameworks. Collaborated with designers to implement responsive UI/UX designs and ensure cross-browser compatibility.",
          ru: "Разрабатывал и поддерживал клиентские веб-сайты с использованием JavaScript, HTML, CSS и различных фронтенд-фреймворков. Сотрудничал с дизайнерами для реализации адаптивного UI/UX дизайна и обеспечения кросс-браузерной совместимости.",
          uz: "JavaScript, HTML, CSS va turli frontend freymvorklardan foydalanib mijoz veb-saytlarini ishlab chiqdi va qo'llab-quvvatladi. Moslashuvchan UI/UX dizaynlarini amalga oshirish va brauzerlararo moslashuvni ta'minlash uchun dizaynerlar bilan hamkorlik qildi.",
        },
      },
    ],
    education: [
      {
        id: 1,
        degree: {
          en: "Master of Computer Science",
          ru: "Магистр компьютерных наук",
          uz: "Kompyuter fanlari magistri",
        },
        institution: "Tech University",
        period: { start: "2016", end: "2018" },
        description: {
          en: "Specialized in Web Technologies and Interactive Media. Thesis on 'Optimizing 3D Rendering Performance in Web Browsers'.",
          ru: "Специализация в области веб-технологий и интерактивных медиа. Диссертация на тему 'Оптимизация производительности 3D-рендеринга в веб-браузерах'.",
          uz: "Veb-texnologiyalar va interaktiv media sohasida ixtisoslashgan. 'Veb-brauzerlarida 3D renderlash samaradorligini optimallashtirish' mavzusidagi dissertatsiya.",
        },
      },
      {
        id: 2,
        degree: {
          en: "Bachelor of Science in Information Technology",
          ru: "Бакалавр наук в области информационных технологий",
          uz: "Axborot texnologiyalari bo'yicha bakalavr",
        },
        institution: "State University",
        period: { start: "2012", end: "2016" },
        description: {
          en: "Coursework included Web Development, Database Systems, and UI/UX Design. Graduated with honors.",
          ru: "Курсовые работы включали веб-разработку, системы баз данных и дизайн UI/UX. Окончил с отличием.",
          uz: "O'quv dasturiga veb-ishlab chiqarish, ma'lumotlar bazasi tizimlari va UI/UX dizayni kiradi. Imtiyozli diplom bilan bitirgan.",
        },
      },
    ],
    skills: [
      { id: 1, name: "JavaScript" },
      { id: 2, name: "TypeScript" },
      { id: 3, name: "React" },
      { id: 4, name: "Next.js" },
      { id: 5, name: "Three.js" },
      { id: 6, name: "GSAP" },
    ],
    languages: [
      {
        id: 1,
        name: {
          en: "English",
          ru: "Английский",
          uz: "Ingliz tili",
        },
        level: {
          en: "Fluent",
          ru: "Свободно",
          uz: "Erkin",
        },
      },
      {
        id: 2,
        name: {
          en: "Russian",
          ru: "Русский",
          uz: "Rus tili",
        },
        level: {
          en: "Native",
          ru: "Родной",
          uz: "Ona tili",
        },
      },
      {
        id: 3,
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
        id: 1,
        title: {
          en: "Best Web Application Award",
          ru: "Награда за лучшее веб-приложение",
          uz: "Eng yaxshi veb-ilova mukofoti",
        },
        issuer: "WebTech Conference",
        year: "2022",
      },
      {
        id: 2,
        title: {
          en: "Frontend Development Certification",
          ru: "Сертификация по фронтенд-разработке",
          uz: "Frontend ishlab chiqarish sertifikati",
        },
        issuer: "Tech Academy",
        year: "2020",
      },
    ],
  }

  // Get resume from localStorage or use default
  const getInitialResume = () => {
    if (typeof window !== "undefined") {
      const savedResume = localStorage.getItem("resume")
      return savedResume ? JSON.parse(savedResume) : defaultResume
    }
    return defaultResume
  }

  const [resume, setResume] = useState(getInitialResume())
  const [currentSection, setCurrentSection] = useState("experience")
  const [currentItem, setCurrentItem] = useState(null)

  const translations = {
    resumeSettings: {
      en: "Resume Settings",
      ru: "Настройки резюме",
      uz: "Rezyume sozlamalari",
    },
    manageResume: {
      en: "Manage your resume information",
      ru: "Управление информацией резюме",
      uz: "Rezyume ma'lumotlarini boshqarish",
    },
    experience: {
      en: "Experience",
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
      en: "Awards",
      ru: "Награды",
      uz: "Mukofotlar",
    },
    title: {
      en: "Title/Position",
      ru: "Должность",
      uz: "Lavozim",
    },
    company: {
      en: "Company/Organization",
      ru: "Компания/Организация",
      uz: "Kompaniya/Tashkilot",
    },
    institution: {
      en: "Institution",
      ru: "Учебное заведение",
      uz: "O'quv muassasasi",
    },
    degree: {
      en: "Degree",
      ru: "Степень",
      uz: "Daraja",
    },
    description: {
      en: "Description",
      ru: "Описание",
      uz: "Tavsif",
    },
    startDate: {
      en: "Start Date",
      ru: "Дата начала",
      uz: "Boshlanish sanasi",
    },
    endDate: {
      en: "End Date",
      ru: "Дата окончания",
      uz: "Tugash sanasi",
    },
    present: {
      en: "Present",
      ru: "По настоящее время",
      uz: "Hozirgi vaqtgacha",
    },
    name: {
      en: "Name",
      ru: "Название",
      uz: "Nomi",
    },
    level: {
      en: "Level",
      ru: "Уровень",
      uz: "Daraja",
    },
    issuer: {
      en: "Issuer",
      ru: "Выдавший организация",
      uz: "Beruvchi tashkilot",
    },
    year: {
      en: "Year",
      ru: "Год",
      uz: "Yil",
    },
    save: {
      en: "Save Changes",
      ru: "Сохранить изменения",
      uz: "O'zgarishlarni saqlash",
    },
    addItem: {
      en: "Add New Item",
      ru: "Добавить новый элемент",
      uz: "Yangi element qo'shish",
    },
    deleteItem: {
      en: "Delete Item",
      ru: "Удалить элемент",
      uz: "Elementni o'chirish",
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
      en: "Resume updated successfully",
      ru: "Резюме успешно обновлено",
      uz: "Rezyume muvaffaqiyatli yangilandi",
    },
  }

  const handleSelectItem = (item) => {
    setCurrentItem(item)
  }

  const handleChange = (lang, field, value) => {
    if (typeof currentItem[field] === "object" && !Array.isArray(currentItem[field]) && field !== "period") {
      setCurrentItem({
        ...currentItem,
        [field]: {
          ...currentItem[field],
          [lang]: value,
        },
      })
    } else if (field === "period") {
      setCurrentItem({
        ...currentItem,
        period: {
          ...currentItem.period,
          [lang]: value,
        },
      })
    } else {
      setCurrentItem({
        ...currentItem,
        [field]: value,
      })
    }
  }

  const handleSave = () => {
    if (currentItem) {
      const updatedResume = { ...resume }

      if (currentItem.id) {
        // Update existing item
        updatedResume[currentSection] = resume[currentSection].map((item) =>
          item.id === currentItem.id ? currentItem : item,
        )
      } else {
        // Add new item with ID
        updatedResume[currentSection] = [...resume[currentSection], { ...currentItem, id: Date.now() }]
      }

      setResume(updatedResume)
      localStorage.setItem("resume", JSON.stringify(updatedResume))
      toast({
        title: translations.saveSuccess[language],
        duration: 3000,
      })
      setCurrentItem(null)
    }
  }

  const handleAddItem = () => {
    let newItem = { id: null }

    switch (currentSection) {
      case "experience":
        newItem = {
          ...newItem,
          title: { en: "", ru: "", uz: "" },
          company: "",
          period: { start: "", end: "" },
          description: { en: "", ru: "", uz: "" },
        }
        break
      case "education":
        newItem = {
          ...newItem,
          degree: { en: "", ru: "", uz: "" },
          institution: "",
          period: { start: "", end: "" },
          description: { en: "", ru: "", uz: "" },
        }
        break
      case "skills":
        newItem = {
          ...newItem,
          name: "",
        }
        break
      case "languages":
        newItem = {
          ...newItem,
          name: { en: "", ru: "", uz: "" },
          level: { en: "", ru: "", uz: "" },
        }
        break
      case "awards":
        newItem = {
          ...newItem,
          title: { en: "", ru: "", uz: "" },
          issuer: "",
          year: "",
        }
        break
    }

    setCurrentItem(newItem)
  }

  const handleDeleteItem = () => {
    if (currentItem && currentItem.id) {
      const updatedResume = { ...resume }
      updatedResume[currentSection] = resume[currentSection].filter((item) => item.id !== currentItem.id)

      setResume(updatedResume)
      localStorage.setItem("resume", JSON.stringify(updatedResume))
      toast({
        title: translations.saveSuccess[language],
        duration: 3000,
      })
      setCurrentItem(null)
    }
  }

  const renderItemForm = () => {
    if (!currentItem) return null

    switch (currentSection) {
      case "experience":
        return (
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
                    value={currentItem.title[lang]}
                    onChange={(e) => handleChange(lang, "title", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`description-${lang}`}>{translations.description[language]}</Label>
                  <Textarea
                    id={`description-${lang}`}
                    value={currentItem.description[lang]}
                    onChange={(e) => handleChange(lang, "description", e.target.value)}
                    rows={4}
                  />
                </div>
              </TabsContent>
            ))}

            <div className="space-y-4 mt-6">
              <div className="space-y-2">
                <Label htmlFor="company">{translations.company[language]}</Label>
                <Input
                  id="company"
                  value={currentItem.company}
                  onChange={(e) => handleChange("", "company", e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="period-start">{translations.startDate[language]}</Label>
                  <Input
                    id="period-start"
                    value={currentItem.period.start}
                    onChange={(e) => handleChange("start", "period", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="period-end">{translations.endDate[language]}</Label>
                  <Input
                    id="period-end"
                    value={currentItem.period.end}
                    onChange={(e) => handleChange("end", "period", e.target.value)}
                    placeholder={translations.present[language]}
                  />
                </div>
              </div>
            </div>
          </Tabs>
        )

      case "education":
        return (
          <Tabs defaultValue="en" className="w-full">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="en">{translations.english[language]}</TabsTrigger>
              <TabsTrigger value="ru">{translations.russian[language]}</TabsTrigger>
              <TabsTrigger value="uz">{translations.uzbek[language]}</TabsTrigger>
            </TabsList>

            {["en", "ru", "uz"].map((lang) => (
              <TabsContent key={lang} value={lang} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor={`degree-${lang}`}>{translations.degree[language]}</Label>
                  <Input
                    id={`degree-${lang}`}
                    value={currentItem.degree[lang]}
                    onChange={(e) => handleChange(lang, "degree", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`description-${lang}`}>{translations.description[language]}</Label>
                  <Textarea
                    id={`description-${lang}`}
                    value={currentItem.description[lang]}
                    onChange={(e) => handleChange(lang, "description", e.target.value)}
                    rows={4}
                  />
                </div>
              </TabsContent>
            ))}

            <div className="space-y-4 mt-6">
              <div className="space-y-2">
                <Label htmlFor="institution">{translations.institution[language]}</Label>
                <Input
                  id="institution"
                  value={currentItem.institution}
                  onChange={(e) => handleChange("", "institution", e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="period-start">{translations.startDate[language]}</Label>
                  <Input
                    id="period-start"
                    value={currentItem.period.start}
                    onChange={(e) => handleChange("start", "period", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="period-end">{translations.endDate[language]}</Label>
                  <Input
                    id="period-end"
                    value={currentItem.period.end}
                    onChange={(e) => handleChange("end", "period", e.target.value)}
                  />
                </div>
              </div>
            </div>
          </Tabs>
        )

      case "skills":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">{translations.name[language]}</Label>
              <Input id="name" value={currentItem.name} onChange={(e) => handleChange("", "name", e.target.value)} />
            </div>
          </div>
        )

      case "languages":
        return (
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
                    value={currentItem.name[lang]}
                    onChange={(e) => handleChange(lang, "name", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`level-${lang}`}>{translations.level[language]}</Label>
                  <Input
                    id={`level-${lang}`}
                    value={currentItem.level[lang]}
                    onChange={(e) => handleChange(lang, "level", e.target.value)}
                  />
                </div>
              </TabsContent>
            ))}
          </Tabs>
        )

      case "awards":
        return (
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
                    value={currentItem.title[lang]}
                    onChange={(e) => handleChange(lang, "title", e.target.value)}
                  />
                </div>
              </TabsContent>
            ))}

            <div className="space-y-4 mt-6">
              <div className="space-y-2">
                <Label htmlFor="issuer">{translations.issuer[language]}</Label>
                <Input
                  id="issuer"
                  value={currentItem.issuer}
                  onChange={(e) => handleChange("", "issuer", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="year">{translations.year[language]}</Label>
                <Input id="year" value={currentItem.year} onChange={(e) => handleChange("", "year", e.target.value)} />
              </div>
            </div>
          </Tabs>
        )

      default:
        return null
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="md:col-span-1">
        <CardHeader>
          <CardTitle>{translations.resumeSettings[language]}</CardTitle>
          <CardDescription>{translations.manageResume[language]}</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible defaultValue="experience">
            <AccordionItem value="experience">
              <AccordionTrigger
                onClick={() => {
                  setCurrentSection("experience")
                  setCurrentItem(null)
                }}
              >
                {translations.experience[language]}
              </AccordionTrigger>
              <AccordionContent>
                <ScrollArea className="h-[200px] pr-4">
                  <div className="space-y-2">
                    {resume.experience.map((item) => (
                      <Button
                        key={item.id}
                        variant={currentItem && currentItem.id === item.id ? "default" : "outline"}
                        className="w-full justify-start text-left h-auto py-2"
                        onClick={() => handleSelectItem(item)}
                      >
                        {item.title[language] || item.title.en}
                      </Button>
                    ))}
                  </div>
                </ScrollArea>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="education">
              <AccordionTrigger
                onClick={() => {
                  setCurrentSection("education")
                  setCurrentItem(null)
                }}
              >
                {translations.education[language]}
              </AccordionTrigger>
              <AccordionContent>
                <ScrollArea className="h-[200px] pr-4">
                  <div className="space-y-2">
                    {resume.education.map((item) => (
                      <Button
                        key={item.id}
                        variant={currentItem && currentItem.id === item.id ? "default" : "outline"}
                        className="w-full justify-start text-left h-auto py-2"
                        onClick={() => handleSelectItem(item)}
                      >
                        {item.degree[language] || item.degree.en}
                      </Button>
                    ))}
                  </div>
                </ScrollArea>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="skills">
              <AccordionTrigger
                onClick={() => {
                  setCurrentSection("skills")
                  setCurrentItem(null)
                }}
              >
                {translations.skills[language]}
              </AccordionTrigger>
              <AccordionContent>
                <ScrollArea className="h-[200px] pr-4">
                  <div className="space-y-2">
                    {resume.skills.map((item) => (
                      <Button
                        key={item.id}
                        variant={currentItem && currentItem.id === item.id ? "default" : "outline"}
                        className="w-full justify-start text-left h-auto py-2"
                        onClick={() => handleSelectItem(item)}
                      >
                        {item.name}
                      </Button>
                    ))}
                  </div>
                </ScrollArea>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="languages">
              <AccordionTrigger
                onClick={() => {
                  setCurrentSection("languages")
                  setCurrentItem(null)
                }}
              >
                {translations.languages[language]}
              </AccordionTrigger>
              <AccordionContent>
                <ScrollArea className="h-[200px] pr-4">
                  <div className="space-y-2">
                    {resume.languages.map((item) => (
                      <Button
                        key={item.id}
                        variant={currentItem && currentItem.id === item.id ? "default" : "outline"}
                        className="w-full justify-start text-left h-auto py-2"
                        onClick={() => handleSelectItem(item)}
                      >
                        {item.name[language] || item.name.en}
                      </Button>
                    ))}
                  </div>
                </ScrollArea>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="awards">
              <AccordionTrigger
                onClick={() => {
                  setCurrentSection("awards")
                  setCurrentItem(null)
                }}
              >
                {translations.awards[language]}
              </AccordionTrigger>
              <AccordionContent>
                <ScrollArea className="h-[200px] pr-4">
                  <div className="space-y-2">
                    {resume.awards.map((item) => (
                      <Button
                        key={item.id}
                        variant={currentItem && currentItem.id === item.id ? "default" : "outline"}
                        className="w-full justify-start text-left h-auto py-2"
                        onClick={() => handleSelectItem(item)}
                      >
                        {item.title[language] || item.title.en}
                      </Button>
                    ))}
                  </div>
                </ScrollArea>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Button onClick={handleAddItem} className="w-full mt-4 flex items-center gap-2">
            <Plus className="h-4 w-4" />
            {translations.addItem[language]}
          </Button>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>{translations[currentSection][language]}</CardTitle>
          <CardDescription>{translations.manageResume[language]}</CardDescription>
        </CardHeader>
        <CardContent>
          {currentItem ? (
            <>
              {renderItemForm()}

              <div className="flex justify-between mt-8">
                <Button
                  variant="destructive"
                  onClick={handleDeleteItem}
                  className="flex items-center gap-2"
                  disabled={!currentItem.id}
                >
                  <Trash className="h-4 w-4" />
                  {translations.deleteItem[language]}
                </Button>

                <Button onClick={handleSave} className="flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  {translations.save[language]}
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center py-12 text-muted-foreground">{translations.manageResume[language]}</div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
