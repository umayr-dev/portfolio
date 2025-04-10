"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/components/language-provider";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Eye } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";

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
  date: string;
  likes: number;
  comments: number;
  views: number;
  author: string;
  authorImage: string;
  image: string; // Blog uchun rasm
}

export default function Blog() {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [toast]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold mb-12">Loading...</h1>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <motion.h1
          className="text-4xl font-bold mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Blog
        </motion.h1>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {posts.map((post) => (
            <motion.div key={post.id}>
              <Card className="overflow-hidden">
                {/* Blog uchun rasm */}
                <div className="aspect-video bg-muted overflow-hidden">
                  <img
                    src={post.image || "/placeholder.svg"}
                    alt={post.title[language]}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <CardHeader>
                  <CardTitle>{post.title[language]}</CardTitle>
                  <CardDescription>{post.description[language]}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <Button variant="outline" className="flex items-center gap-2">
                      <Heart className="h-4 w-4" />
                      {post.likes} Likes
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2">
                      <MessageCircle className="h-4 w-4" />
                      {post.comments} Comments
                    </Button>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Eye className="h-4 w-4" />
                      {post.views} Views
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href={`/blog/${post.id}`} className="text-primary hover:underline">
                    Read More
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}
