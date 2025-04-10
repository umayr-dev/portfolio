"use client";

import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/components/language-provider";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, Github } from "lucide-react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { toast } from "@/components/ui/use-toast";

export default function Projects() {
  const { language } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const translations = {
    title: {
      en: "Projects",
      ru: "Проекты",
      uz: "Loyihalar",
    },
    subtitle: {
      en: "Check out some of my recent work",
      ru: "Ознакомьтесь с некоторыми из моих недавних работ",
      uz: "Mening so'nggi ishlarimdan ba'zilari bilan tanishing",
    },
    viewProject: {
      en: "View Project",
      ru: "Посмотреть проект",
      uz: "Loyihani ko'rish",
    },
    viewCode: {
      en: "View Code",
      ru: "Посмотреть код",
      uz: "Kodni ko'rish",
    },
  };

  // API orqali loyihalarni olish
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("https://7b46c7ce9215a6d8.mokky.dev/project");
        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
        toast({
          title: "Error",
          description: "Failed to load projects",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []); // `toast` dependency arraydan olib tashlandi

  const saveProject = async (project) => {
    try {
      const method = project.id ? "PUT" : "POST";
      const url = project.id
        ? `https://7b46c7ce9215a6d8.mokky.dev/project/${project.id}`
        : "https://7b46c7ce9215a6d8.mokky.dev/project";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(project),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("API Error:", errorData);
        throw new Error("Failed to save project");
      }

      toast({
        title: "Success",
        description: "Project saved successfully",
        variant: "default",
      });

      fetchProjects(); // Loyihalar ro'yxatini yangilash
    } catch (error) {
      console.error("Error saving project:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to save project",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <section id="projects" className="py-16 bg-muted/50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">{translations.title[language]}</h2>
          <p className="text-muted-foreground">{translations.subtitle[language]}</p>
          <p className="mt-8">Loading...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 scroll-animate fade-up">
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

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-8 stagger-animate">
          {projects.length > 0 ? (
            projects.map((project) => (
              <div key={project.id} className="project-card h-full">
                {/* Project card content */}
              </div>
            ))
          ) : (
            <p className="text-center text-muted-foreground">No projects available</p>
          )}
        </div>
      </div>
    </section>
  );
}
