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
import { Plus, Save, Trash, Eye, Heart, MessageCircle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

interface BlogPost {
  id: number;
  title: {
    en: string;
    ru: string;
    uz: string;
  };
  description: {
    en: string;
    ru: string;
    uz: string;
  };
  content: {
    en: string;
    ru: string;
    uz: string;
  };
  date: string;
  author: string;
  authorImage: string;
  likes: number;
  comments: number;
  views: number;
}

export default function AdminBlog() {
  const { language } = useLanguage();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [currentPost, setCurrentPost] = useState<BlogPost | null>(null);
  const [isFormValid, setIsFormValid] = useState(true);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  // Bloglarni API orqali olish
  const fetchPosts = async () => {
    try {
      const response = await fetch("https://7b46c7ce9215a6d8.mokky.dev/blog");
      if (!response.ok) {
        throw new Error("Failed to fetch blog posts");
      }
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      toast({
        title: "Error",
        description: "Failed to load blog posts",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSave = async () => {
    if (!currentPost) return;

    // Validate form
    if (!validateForm()) {
      setIsFormValid(false);
      toast({
        title: "Validation Error",
        description: validationErrors.join(", "),
        variant: "destructive",
      });
      return;
    }

    try {
      const newPost = {
        title: currentPost.title,
        description: currentPost.description,
        content: currentPost.content,
        date: currentPost.date,
        author: currentPost.author,
        authorImage: currentPost.authorImage,
      };

      if (currentPost.id === 0) {
        // Yangi postni API-ga yuborish
        const response = await fetch("https://7b46c7ce9215a6d8.mokky.dev/blog", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newPost),
        });

        if (!response.ok) {
          throw new Error("Failed to create blog post");
        }

        toast({
          title: "Success",
          description: "Blog post added successfully",
          variant: "default",
        });

        // Bloglar ro'yxatini yangilash
        fetchPosts();
      } else {
        toast({
          title: "Error",
          description: "Editing existing posts is not supported in this version",
          variant: "destructive",
        });
      }

      setCurrentPost(null);
    } catch (error) {
      console.error("Error saving blog post:", error);
      toast({
        title: "Error",
        description: "There was a problem saving the blog post",
        variant: "destructive",
      });
    }
  };

  const handleAddPost = () => {
    const today = new Date().toISOString().split("T")[0];
    setCurrentPost({
      id: 0, // New post
      title: { en: "", ru: "", uz: "" },
      description: { en: "", ru: "", uz: "" },
      content: { en: "", ru: "", uz: "" },
      date: today,
      author: "John Doe",
      authorImage: "/placeholder.svg",
      likes: 0,
      comments: 0,
      views: 0,
    });
    setIsFormValid(true);
    setValidationErrors([]);
  };

  const validateForm = (): boolean => {
    if (!currentPost) return false;

    const errors: string[] = [];

    if (!currentPost.title.en || !currentPost.title.ru || !currentPost.title.uz) {
      errors.push("Title is required in all languages");
    }

    if (!currentPost.description.en || !currentPost.description.ru || !currentPost.description.uz) {
      errors.push("Description is required in all languages");
    }

    if (!currentPost.content.en || !currentPost.content.ru || !currentPost.content.uz) {
      errors.push("Content is required in all languages");
    }

    if (!currentPost.author) {
      errors.push("Author name is required");
    }

    if (!currentPost.date) {
      errors.push("Date is required");
    }

    setValidationErrors(errors);
    return errors.length === 0;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="md:col-span-1">
        <CardHeader>
          <CardTitle>Blog Posts</CardTitle>
          <CardDescription>Manage your blog posts</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[500px] pr-4">
            <div className="space-y-2">
              {posts.map((post) => (
                <Button
                  key={post.id}
                  variant={currentPost && currentPost.id === post.id ? "default" : "outline"}
                  className="w-full justify-start text-left h-auto py-3"
                  onClick={() => setCurrentPost(post)}
                >
                  <div className="w-full">
                    <div className="font-medium">
                      {post?.title?.[language] || post?.title?.en || "Untitled"}
                    </div>
                    <div className="text-xs text-muted-foreground">{post.date}</div>
                    <div className="flex gap-2 mt-1">
                      <Badge variant="outline" className="text-xs flex items-center gap-1">
                        <Eye className="h-3 w-3" /> {post.views}
                      </Badge>
                      <Badge variant="outline" className="text-xs flex items-center gap-1">
                        <Heart className="h-3 w-3" /> {post.likes}
                      </Badge>
                      <Badge variant="outline" className="text-xs flex items-center gap-1">
                        <MessageCircle className="h-3 w-3" /> {post.comments}
                      </Badge>
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </ScrollArea>

          <Button onClick={handleAddPost} className="w-full mt-4 flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add New Post
          </Button>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Edit Post</CardTitle>
          <CardDescription>Manage your blog posts</CardDescription>
        </CardHeader>
        <CardContent>
          {currentPost ? (
            <>
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
                        value={currentPost.title[lang]}
                        onChange={(e) =>
                          setCurrentPost({
                            ...currentPost,
                            title: { ...currentPost.title, [lang]: e.target.value },
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`description-${lang}`}>Description</Label>
                      <Textarea
                        id={`description-${lang}`}
                        value={currentPost.description[lang]}
                        onChange={(e) =>
                          setCurrentPost({
                            ...currentPost,
                            description: { ...currentPost.description, [lang]: e.target.value },
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`content-${lang}`}>Content</Label>
                      <Textarea
                        id={`content-${lang}`}
                        value={currentPost.content[lang]}
                        onChange={(e) =>
                          setCurrentPost({
                            ...currentPost,
                            content: { ...currentPost.content, [lang]: e.target.value },
                          })
                        }
                      />
                    </div>
                  </TabsContent>
                ))}
              </Tabs>

              <div className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="author">Author</Label>
                  <Input
                    id="author"
                    value={currentPost.author}
                    onChange={(e) =>
                      setCurrentPost({
                        ...currentPost,
                        author: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={currentPost.date}
                    onChange={(e) =>
                      setCurrentPost({
                        ...currentPost,
                        date: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="authorImage">Author Image URL</Label>
                  <Input
                    id="authorImage"
                    value={currentPost.authorImage}
                    onChange={(e) =>
                      setCurrentPost({
                        ...currentPost,
                        authorImage: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <Button onClick={handleSave} className="mt-4">
                Save Changes
              </Button>
            </>
          ) : (
            <div className="text-center py-12">Select a post to edit or add a new one</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
