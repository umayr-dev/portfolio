"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/components/language-provider"
import { useAuth } from "@/components/auth-provider"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { LogIn } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function Login() {
  const { language } = useLanguage()
  const { login } = useAuth()
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const translations = {
    login: {
      en: "Login",
      ru: "Вход",
      uz: "Kirish",
    },
    username: {
      en: "Username",
      ru: "Имя пользователя",
      uz: "Foydalanuvchi nomi",
    },
    password: {
      en: "Password",
      ru: "Пароль",
      uz: "Parol",
    },
    loginButton: {
      en: "Login",
      ru: "Войти",
      uz: "Kirish",
    },
    invalidCredentials: {
      en: "Invalid username or password",
      ru: "Неверное имя пользователя или пароль",
      uz: "Noto'g'ri foydalanuvchi nomi yoki parol",
    },
    loginDescription: {
      en: "Enter your credentials to access the admin panel",
      ru: "Введите свои учетные данные для доступа к панели администратора",
      uz: "Admin paneliga kirish uchun ma'lumotlaringizni kiriting",
    },
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    const success = login(username, password)
    if (success) {
      router.push("/admin")
    } else {
      setError(translations.invalidCredentials[language])
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-16 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>{translations.login[language]}</CardTitle>
            <CardDescription>{translations.loginDescription[language]}</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <div className="space-y-2">
                <Label htmlFor="username">{translations.username[language]}</Label>
                <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">{translations.password[language]}</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full flex items-center gap-2">
                <LogIn className="h-4 w-4" />
                {translations.loginButton[language]}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
      <Footer />
    </div>
  )
}
