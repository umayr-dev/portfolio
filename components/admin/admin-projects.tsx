"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/components/language-provider";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { Plus, Save, Trash } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function AdminProjects() {
  const { language } = useLanguage();
  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState(null);
  const [newTag, setNewTag] = useState("");

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
    }
  };

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
        body: JSON.stringify(project), // `tags` avtomatik ravishda yuboriladi
      });

      if (!response.ok) {
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
        description: "Failed to save project",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async () => {
    if (!currentProject || !currentProject.id) return;

    try {
      const response = await fetch(`https://7b46c7ce9215a6d8.mokky.dev/project/${currentProject.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete project");
      }

      toast({
        title: "Success",
        description: "Project deleted successfully",
        variant: "default",
      });

      // Loyihalar ro'yxatini yangilash
      fetchProjects();
      setCurrentProject(null); // Tanlangan loyihani tozalash
    } catch (error) {
      console.error("Error deleting project:", error);
      toast({
        title: "Error",
        description: "Failed to delete project",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleSave = () => {
    if (currentProject) {
      saveProject(currentProject);
      setCurrentProject(null);
    }
  };

  const handleAddProject = () => {
    setCurrentProject({
      id: null,
      title: { en: "", ru: "", uz: "" },
      description: { en: "", ru: "", uz: "" },
      image: "/placeholder.svg?height=250&width=500",
      tags: [],
      demoUrl: "#",
      codeUrl: "#",
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="md:col-span-1">
        <CardHeader>
          <CardTitle>Projects List</CardTitle>
          <CardDescription>Manage your projects</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[500px] pr-4">
            <div className="space-y-2">
              {projects.map((project) => (
                <Button
                  key={project.id}
                  variant={currentProject && currentProject.id === project.id ? "default" : "outline"}
                  className="w-full justify-start text-left h-auto py-3"
                  onClick={() => setCurrentProject(project)}
                >
                  {project.title[language] || project.title.en}
                </Button>
              ))}
            </div>
          </ScrollArea>

          <Button onClick={handleAddProject} className="w-full mt-4 flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add New Project
          </Button>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Edit Project</CardTitle>
          <CardDescription>Manage your projects</CardDescription>
        </CardHeader>
        <CardContent>
          {currentProject ? (
            <Tabs defaultValue="en" className="w-full">
              <TabsList className="grid grid-cols-3 mb-8">
                <TabsTrigger value="en">English</TabsTrigger>
                <TabsTrigger value="ru">Russian</TabsTrigger>
                <TabsTrigger value="uz">Uzbek</TabsTrigger>
              </TabsList>

              {["en", "ru", "uz"].map((lang) => (
                <TabsContent key={lang} value={lang} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor={`title-${lang}`}>Title</Label>
                    <Input
                      id={`title-${lang}`}
                      value={currentProject.title[lang]}
                      onChange={(e) =>
                        setCurrentProject({
                          ...currentProject,
                          title: { ...currentProject.title, [lang]: e.target.value },
                        })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`description-${lang}`}>Description</Label>
                    <Textarea
                      id={`description-${lang}`}
                      value={currentProject.description[lang]}
                      onChange={(e) =>
                        setCurrentProject({
                          ...currentProject,
                          description: { ...currentProject.description, [lang]: e.target.value },
                        })
                      }
                      rows={4}
                    />
                  </div>
                </TabsContent>
              ))}

              <div className="space-y-4 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="image">Image URL</Label>
                  <Input
                    id="image"
                    value={currentProject.image}
                    onChange={(e) =>
                      setCurrentProject({
                        ...currentProject,
                        image: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="demoUrl">Demo URL</Label>
                  <Input
                    id="demoUrl"
                    value={currentProject.demoUrl}
                    onChange={(e) =>
                      setCurrentProject({
                        ...currentProject,
                        demoUrl: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="codeUrl">Code URL</Label>
                  <Input
                    id="codeUrl"
                    value={currentProject.codeUrl}
                    onChange={(e) =>
                      setCurrentProject({
                        ...currentProject,
                        codeUrl: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">Tags</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="tags"
                      placeholder="Add a tag"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                    />
                    <Button
                      onClick={() => {
                        if (newTag.trim() && !currentProject.tags.includes(newTag.trim())) {
                          setCurrentProject({
                            ...currentProject,
                            tags: [...currentProject.tags, newTag.trim()],
                          });
                          setNewTag("");
                        }
                      }}
                    >
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {currentProject.tags.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="flex items-center gap-2 bg-primary/10 text-primary"
                      >
                        {tag}
                        <button
                          onClick={() =>
                            setCurrentProject({
                              ...currentProject,
                              tags: currentProject.tags.filter((t) => t !== tag),
                            })
                          }
                          className="text-red-500 hover:text-red-700"
                        >
                          &times;
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <Button
                  variant="destructive"
                  onClick={handleDelete}
                  className="flex items-center gap-2"
                  disabled={!currentProject.id}
                >
                  <Trash className="h-4 w-4" />
                  Delete Project
                </Button>

                <Button onClick={handleSave} className="flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </Tabs>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              Select a project to edit or add a new one
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
