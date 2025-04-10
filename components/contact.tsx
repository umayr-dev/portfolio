"use client"

import type React from "react"

import { useRef, useState } from "react"
import { useLanguage } from "@/components/language-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { motion, useInView } from "framer-motion"
import { Mail, Phone, MapPin, Send, Check } from "lucide-react"
import { sendMessage } from "@/services/TelegramService"

export default function Contact() {
  const { language } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")

  const translations = {
    title: {
      en: "Contact Me",
      ru: "Свяжитесь со мной",
      uz: "Men bilan bog'laning",
    },
    subtitle: {
      en: "Get in touch and let's work together",
      ru: "Свяжитесь со мной, и давайте работать вместе",
      uz: "Bog'laning va birgalikda ishlaylik",
    },
    name: {
      en: "Name",
      ru: "Имя",
      uz: "Ism",
    },
    email: {
      en: "Email",
      ru: "Эл. почта",
      uz: "Email",
    },
    message: {
      en: "Message",
      ru: "Сообщение",
      uz: "Xabar",
    },
    send: {
      en: "Send Message",
      ru: "Отправить сообщение",
      uz: "Xabar yuborish",
    },
    success: {
      en: "Message sent successfully!",
      ru: "Сообщение успешно отправлено!",
      uz: "Xabar muvaffaqiyatli yuborildi!",
    },
    contactInfo: {
      en: "Contact Information",
      ru: "Контактная информация",
      uz: "Aloqa ma'lumotlari",
    },
    address: {
      en: "Urgench, Khorezm, Uzbekistan",
      ru: "Urgench, Khorezm, Uzbekistan",
      uz: "Urgench, Khorezm, Uzbekistan",
    },
    phone: {
      en: "+998 93 818 6066",
      ru: "+998 93 818 6066",
      uz: "+998 93 818 6066",
    },
    emailAddress: {
      en: "abuqodir0107@gmail.com",
      ru: "abuqodir0107@gmail.com",
      uz: "abuqodir0107@gmail.com",
    },
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      // Telegram botga xabar yuborish
      await sendMessage({
        name: (document.getElementById("name") as HTMLInputElement).value,
        email: (document.getElementById("email") as HTMLInputElement).value,
        message: (document.getElementById("message") as HTMLTextAreaElement).value,
      })

      setIsSubmitted(true)
      ;(document.getElementById("name") as HTMLInputElement).value = ""
      ;(document.getElementById("email") as HTMLInputElement).value = ""
      ;(document.getElementById("message") as HTMLTextAreaElement).value = ""
    } catch (err) {
      setError("Failed to send message. Please try again later.")
    }
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
    <section id="contact" className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2
            className="text-3xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {translations.title[language]}
          </motion.h2>
          <motion.p
            className="text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {translations.subtitle[language]}
          </motion.p>
        </div>

        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div variants={container} initial="hidden" animate={isInView ? "show" : "hidden"}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle>{translations.contactInfo[language]}</CardTitle>
                <CardDescription>{translations.subtitle[language]}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <motion.div variants={item} className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Address</h3>
                    <p className="text-muted-foreground">{translations.address[language]}</p>
                  </div>
                </motion.div>

                <motion.div variants={item} className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="text-muted-foreground">{translations.emailAddress[language]}</p>
                  </div>
                </motion.div>

                <motion.div variants={item} className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Phone</h3>
                    <p className="text-muted-foreground">{translations.phone[language]}</p>
                  </div>
                </motion.div>

                <motion.div variants={item} className="mt-8">
                  <div className="h-64 bg-muted rounded-lg overflow-hidden">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d95544.97288171938!2d60.54067260633739!3d41.55235173764014!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x41dfc9284eafb523%3A0xffaf4382f65d7b61!2z0KPRgNCz0LXQvdGHLCDQpdC-0YDQtdC30LzRgdC60LDRjyDQvtCx0LvQsNGB0YLRjCwg0KPQt9Cx0LXQutC40YHRgtCw0L0!5e0!3m2!1sru!2s!4v1744282421210!5m2!1sru!2s"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={container} initial="hidden" animate={isInView ? "show" : "hidden"}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle>
                  {isSubmitted ? (
                    <div className="flex items-center gap-2 text-green-600">
                      <Check className="h-5 w-5" />
                      {translations.success[language]}
                    </div>
                  ) : (
                    translations.title[language]
                  )}
                </CardTitle>
                {!isSubmitted && <CardDescription>{translations.subtitle[language]}</CardDescription>}
              </CardHeader>
              <CardContent>
                {isSubmitted ? (
                  <motion.div
                    className="flex flex-col items-center justify-center py-12"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                      <Check className="h-8 w-8 text-green-600" />
                    </div>
                    <p className="text-center text-muted-foreground">{translations.success[language]}</p>
                    <Button className="mt-6" variant="outline" onClick={() => setIsSubmitted(false)}>
                      Send another message
                    </Button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {error && <p className="text-red-500">{error}</p>}
                    <motion.div variants={item}>
                      <Label htmlFor="name">{translations.name[language]}</Label>
                      <Input id="name" required className="mt-1" />
                    </motion.div>

                    <motion.div variants={item}>
                      <Label htmlFor="email">{translations.email[language]}</Label>
                      <Input id="email" type="email" required className="mt-1" />
                    </motion.div>

                    <motion.div variants={item}>
                      <Label htmlFor="message">{translations.message[language]}</Label>
                      <Textarea id="message" required className="mt-1" rows={5} />
                    </motion.div>

                    <motion.div variants={item}>
                      <Button type="submit" className="w-full flex items-center gap-2">
                        <Send className="h-4 w-4" />
                        {translations.send[language]}
                      </Button>
                    </motion.div>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
