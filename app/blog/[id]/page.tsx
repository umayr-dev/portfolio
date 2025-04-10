"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/components/language-provider";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle } from "lucide-react";

interface BlogPost {
  id: number;
  title: {
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
  likes: number;
  comments: { id: number; text: string; author: string }[];
}

export default function BlogPost({ params }: { params: Promise<{ id: string }> }) {
  const { language } = useLanguage();
  const { toast } = useToast();
  const router = useRouter();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { id } = await params;
        const response = await fetch(`https://7b46c7ce9215a6d8.mokky.dev/blog/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch blog post");
        }
        const data = await response.json();
        setPost({ ...data, comments: data.comments || [] }); // `comments`ni bo'sh massiv qilib belgilang
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

  const handleLike = async () => {
    if (!post) return;

    try {
      const response = await fetch(`https://7b46c7ce9215a6d8.mokky.dev/blog/${post.id}/like`, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to like the post");
      }

      const data = await response.json();
      setPost({ ...post, likes: data.likes });
      toast({
        title: "Success",
        description: "You liked the post!",
        variant: "default",
      });
    } catch (error) {
      console.error("Error liking the post:", error);
      toast({
        title: "Error",
        description: "Failed to like the post",
        variant: "destructive",
      });
    }
  };

  const handleAddComment = async () => {
    if (!post || !newComment.trim()) return;

    try {
      const response = await fetch(`https://7b46c7ce9215a6d8.mokky.dev/blog/${post.id}/comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: newComment, author: "Anonymous" }),
      });

      if (!response.ok) {
        throw new Error("Failed to add comment");
      }

      const comment = await response.json();
      setPost({ ...post, comments: [...post.comments, comment] });
      setNewComment("");
      toast({
        title: "Success",
        description: "Comment added successfully!",
        variant: "default",
      });
    } catch (error) {
      console.error("Error adding comment:", error);
      toast({
        title: "Error",
        description: "Failed to add comment",
        variant: "destructive",
      });
    }
  };

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
        <p className="mb-8">{post.content[language]}</p>
        <div className="flex items-center gap-4 mb-8">
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
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" className="flex items-center gap-2" onClick={handleLike}>
            <Heart className="h-4 w-4" />
            {post.likes} Likes
          </Button>
        </div>
        <div className="space-y-4">
          <h3 className="text-2xl font-bold">Comments</h3>
          <div className="space-y-2">
            {post.comments?.map((comment) => (
              <div key={comment.id} className="border p-4 rounded-md">
                <p className="font-bold">{comment.author}</p>
                <p>{comment.text}</p>
              </div>
            )) || <p>No comments available</p>}
          </div>
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Add a comment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-grow border rounded-md p-2"
            />
            <Button onClick={handleAddComment}>Post</Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
