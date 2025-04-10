"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from "@/components/language-provider";

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
  image: string;
  views: number; // Ko'rishlar soni
}

export default function BlogPost({ params }: { params: Promise<{ id: string }> }) {
  const { language } = useLanguage();
  const { toast } = useToast();
  const router = useRouter();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { id } = await params;
        const response = await fetch(`https://7b46c7ce9215a6d8.mokky.dev/blog/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch blog post");
        }
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error("Error fetching blog post:", error);
        toast({
          title: "Error",
          description: "Failed to load blog post",
          variant: "destructive",
        });
        router.push("/blog");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [params, router, toast]);

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

  if (!post) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-4">{post.title[language]}</h1>
        <p className="text-lg text-muted-foreground mb-8">{post.description[language]}</p>
        <p className="mb-8">{post.content[language]}</p>
        <img
          src={post.image}
          alt={post.title[language]}
          className="w-full h-auto rounded-lg shadow-md mb-8"
        />
        <div className="flex items-center gap-4">
          <img
            src={post.authorImage}
            alt={post.author}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h2 className="text-lg font-bold">{post.author}</h2>
            <p className="text-sm text-muted-foreground">{post.date}</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
