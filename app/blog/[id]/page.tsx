"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/components/language-provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Heart, MessageCircle, Calendar, Share2, Eye, Edit2, Trash2, Save, X } from "lucide-react"
import { motion } from "framer-motion"
import { useToast } from "@/components/ui/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

// Type definitions
interface Comment {
  id: number
  author: string
  authorImage: string
  content: string
  date: string
  likes: number
  userId?: string
}

interface BlogPost {
  id: number
  title: {
    en: string
    ru: string
    uz: string
  }
  description?: {
    en: string
    ru: string
    uz: string
  }
  content: {
    en: string
    ru: string
    uz: string
  }
  date: string
  likes: number
  comments: Comment[] | number
  views: number
  author: string
  authorImage: string
}

export default function BlogPost({ params }: { params: { id: string } }) {
  const { language } = useLanguage()
  const { toast } = useToast()
  const router = useRouter()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [newComment, setNewComment] = useState("")
  const [commentAuthor, setCommentAuthor] = useState("")
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null)
  const [editedCommentContent, setEditedCommentContent] = useState("")
  const [userId, setUserId] = useState<string>("")
  const [postComments, setPostComments] = useState<Comment[]>([])
  const [isLiked, setIsLiked] = useState(false)
  const commentRef = useRef<HTMLDivElement>(null)

  // Generate a unique user ID if not already set
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId")
    if (storedUserId) {
      setUserId(storedUserId)
    } else {
      const newUserId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      localStorage.setItem("userId", newUserId)
      setUserId(newUserId)
    }

    // Get stored username if available
    const storedUsername = localStorage.getItem("commentAuthor")
    if (storedUsername) {
      setCommentAuthor(storedUsername)
    }
  }, [])

  // Load blog post from localStorage
  useEffect(() => {
    const loadPost = () => {
      try {
        const postId = Number.parseInt(params.id)
        if (isNaN(postId)) {
          throw new Error("Invalid post ID")
        }

        // Get posts from localStorage
        const savedPosts = localStorage.getItem("blogPosts")
        if (!savedPosts) {
          throw new Error("No posts found")
        }

        const allPosts = JSON.parse(savedPosts)
        const foundPost = allPosts.find((p: any) => p.id === postId)

        if (!foundPost) {
          throw new Error("Post not found")
        }

        // Get comments for this post
        const savedComments = localStorage.getItem(`comments_${postId}`)
        const comments = savedComments ? JSON.parse(savedComments) : []
        setPostComments(comments)

        // Check if post is already liked
        const likedPosts = JSON.parse(localStorage.getItem("likedPosts") || "[]")
        setIsLiked(likedPosts.includes(postId))

        // Ensure post has all required properties
        const postWithDefaults = {
          ...foundPost,
          views: foundPost.views || 0,
          comments: comments,
          // Ensure content exists for all languages
          content: {
            en: foundPost.content?.en || foundPost.description?.en || "",
            ru: foundPost.content?.ru || foundPost.description?.ru || "",
            uz: foundPost.content?.uz || foundPost.description?.uz || "",
          },
        }

        // Increment view count
        incrementViewCount(postId, postWithDefaults, allPosts)

        setPost(postWithDefaults)
      } catch (error) {
        console.error("Error loading blog post:", error)
        toast({
          title: "Error",
          description: "Could not load the blog post. Redirecting to blog list.",
          variant: "destructive",
        })

        // Redirect to blog list after a short delay
        setTimeout(() => {
          router.push("/blog")
        }, 2000)
      } finally {
        setLoading(false)
      }
    }

    loadPost()
  }, [params.id, router, toast])

  // Increment view count
  const incrementViewCount = (postId: number, currentPost: BlogPost, allPosts: any[]) => {
    try {
      // Check if this post has been viewed in this session
      const viewedPosts = JSON.parse(localStorage.getItem("viewedPosts") || "[]")

      if (!viewedPosts.includes(postId)) {
        // Increment view count
        const updatedPost = { ...currentPost, views: currentPost.views + 1 }

        // Update post in all posts
        const updatedPosts = allPosts.map((p: any) => (p.id === postId ? { ...p, views: (p.views || 0) + 1 } : p))

        // Save updated posts
        localStorage.setItem("blogPosts", JSON.stringify(updatedPosts))

        // Add post to viewed posts
        viewedPosts.push(postId)
        localStorage.setItem("viewedPosts", JSON.stringify(viewedPosts))

        // Update state
        setPost(updatedPost)
      }
    } catch (error) {
      console.error("Error incrementing view count:", error)
    }
  }

  const handleLike = () => {
    if (!post) return

    try {
      // Get liked posts from localStorage
      const likedPosts = JSON.parse(localStorage.getItem("likedPosts") || "[]")

      // Check if post is already liked
      if (likedPosts.includes(post.id)) {
        // Unlike the post
        const updatedLikedPosts = likedPosts.filter((id: number) => id !== post.id)
        localStorage.setItem("likedPosts", JSON.stringify(updatedLikedPosts))

        // Update post with reduced like count
        const updatedPost = { ...post, likes: post.likes - 1 }
        setPost(updatedPost)
        setIsLiked(false)

        // Update post in all posts
        const savedPosts = localStorage.getItem("blogPosts")
        if (savedPosts) {
          const allPosts = JSON.parse(savedPosts)
          const updatedPosts = allPosts.map((p: any) => (p.id === post.id ? { ...p, likes: p.likes - 1 } : p))
          localStorage.setItem("blogPosts", JSON.stringify(updatedPosts))
        }

        toast({
          title: "Post unliked",
          description: "You have removed your like from this post",
        })
      } else {
        // Like the post
        likedPosts.push(post.id)
        localStorage.setItem("likedPosts", JSON.stringify(likedPosts))

        // Update post with new like
        const updatedPost = { ...post, likes: post.likes + 1 }
        setPost(updatedPost)
        setIsLiked(true)

        // Update post in all posts
        const savedPosts = localStorage.getItem("blogPosts")
        if (savedPosts) {
          const allPosts = JSON.parse(savedPosts)
          const updatedPosts = allPosts.map((p: any) => (p.id === post.id ? { ...p, likes: p.likes + 1 } : p))
          localStorage.setItem("blogPosts", JSON.stringify(updatedPosts))
        }

        toast({
          title: "Post liked!",
          description: "Thank you for your feedback",
        })
      }
    } catch (error) {
      console.error("Error liking post:", error)
      toast({
        title: "Error",
        description: "There was a problem with the like action",
        variant: "destructive",
      })
    }
  }

  const handleCommentLike = (commentId: number) => {
    if (!post) return

    try {
      // Get liked comments from localStorage
      const likedComments = JSON.parse(localStorage.getItem("likedComments") || "[]")

      // Check if comment is already liked
      if (likedComments.includes(commentId)) {
        toast({
          title: "Already liked",
          description: "You have already liked this comment",
        })
        return
      }

      // Update comments with new like
      const updatedComments = postComments.map((comment) =>
        comment.id === commentId ? { ...comment, likes: comment.likes + 1 } : comment,
      )

      setPostComments(updatedComments)

      // Save updated comments
      localStorage.setItem(`comments_${post.id}`, JSON.stringify(updatedComments))

      // Add comment to liked comments
      likedComments.push(commentId)
      localStorage.setItem("likedComments", JSON.stringify(likedComments))
    } catch (error) {
      console.error("Error liking comment:", error)
      toast({
        title: "Error",
        description: "There was a problem liking the comment",
        variant: "destructive",
      })
    }
  }

  const handleAddComment = () => {
    if (!post) return

    if (!commentAuthor.trim()) {
      toast({
        title: "Name required",
        description: "Please enter your name to comment",
        variant: "destructive",
      })
      return
    }

    if (!newComment.trim()) {
      toast({
        title: "Comment required",
        description: "Please enter a comment",
        variant: "destructive",
      })
      return
    }

    try {
      // Save author name for future use
      localStorage.setItem("commentAuthor", commentAuthor)

      // Create new comment
      const newCommentObj: Comment = {
        id: Date.now(),
        author: commentAuthor,
        authorImage: "/placeholder.svg?height=40&width=40",
        content: newComment,
        date: new Date().toISOString().split("T")[0],
        likes: 0,
        userId: userId,
      }

      // Add comment to post
      const updatedComments = [...postComments, newCommentObj]
      setPostComments(updatedComments)

      // Save updated comments
      localStorage.setItem(`comments_${post.id}`, JSON.stringify(updatedComments))

      // Update comment count in all posts
      const savedPosts = localStorage.getItem("blogPosts")
      if (savedPosts) {
        const allPosts = JSON.parse(savedPosts)
        const updatedPosts = allPosts.map((p: any) =>
          p.id === post.id ? { ...p, comments: updatedComments.length } : p,
        )
        localStorage.setItem("blogPosts", JSON.stringify(updatedPosts))
      }

      // Update post in state
      setPost({
        ...post,
        comments: updatedComments,
      })

      // Clear comment input
      setNewComment("")

      // Scroll to the new comment
      setTimeout(() => {
        if (commentRef.current) {
          commentRef.current.scrollIntoView({ behavior: "smooth" })
        }
      }, 100)

      toast({
        title: "Comment added",
        description: "Your comment has been added successfully",
      })
    } catch (error) {
      console.error("Error adding comment:", error)
      toast({
        title: "Error",
        description: "There was a problem adding your comment",
        variant: "destructive",
      })
    }
  }

  const handleEditComment = (comment: Comment) => {
    setEditingCommentId(comment.id)
    setEditedCommentContent(comment.content)
  }

  const handleSaveComment = () => {
    if (!post || !editingCommentId) return

    try {
      if (!editedCommentContent.trim()) {
        toast({
          title: "Comment required",
          description: "Comment cannot be empty",
          variant: "destructive",
        })
        return
      }

      // Update comment
      const updatedComments = postComments.map((comment) =>
        comment.id === editingCommentId ? { ...comment, content: editedCommentContent } : comment,
      )

      setPostComments(updatedComments)

      // Save updated comments
      localStorage.setItem(`comments_${post.id}`, JSON.stringify(updatedComments))

      // Reset editing state
      setEditingCommentId(null)
      setEditedCommentContent("")

      toast({
        title: "Comment updated",
        description: "Your comment has been updated successfully",
      })
    } catch (error) {
      console.error("Error updating comment:", error)
      toast({
        title: "Error",
        description: "There was a problem updating your comment",
        variant: "destructive",
      })
    }
  }

  const handleCancelEdit = () => {
    setEditingCommentId(null)
    setEditedCommentContent("")
  }

  const handleDeleteComment = (commentId: number) => {
    if (!post) return

    try {
      // Remove comment
      const updatedComments = postComments.filter((comment) => comment.id !== commentId)
      setPostComments(updatedComments)

      // Save updated comments
      localStorage.setItem(`comments_${post.id}`, JSON.stringify(updatedComments))

      // Update comment count in all posts
      const savedPosts = localStorage.getItem("blogPosts")
      if (savedPosts) {
        const allPosts = JSON.parse(savedPosts)
        const updatedPosts = allPosts.map((p: any) =>
          p.id === post.id ? { ...p, comments: updatedComments.length } : p,
        )
        localStorage.setItem("blogPosts", JSON.stringify(updatedPosts))
      }

      // Update post in state
      setPost({
        ...post,
        comments: updatedComments,
      })

      toast({
        title: "Comment deleted",
        description: "Your comment has been deleted successfully",
      })
    } catch (error) {
      console.error("Error deleting comment:", error)
      toast({
        title: "Error",
        description: "There was a problem deleting your comment",
        variant: "destructive",
      })
    }
  }

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: post?.title[language] || "Blog Post",
          text: post?.description?.[language] || "Check out this blog post",
          url: window.location.href,
        })
      } else {
        // Fallback for browsers that don't support navigator.share
        navigator.clipboard.writeText(window.location.href)
        toast({
          title: "Link copied",
          description: "Post link copied to clipboard",
        })
      }
    } catch (error) {
      console.error("Error sharing post:", error)
      toast({
        title: "Error",
        description: "There was a problem sharing the post",
        variant: "destructive",
      })
    }
  }

  const translations = {
    comments: {
      en: "Comments",
      ru: "Комментарии",
      uz: "Izohlar",
    },
    writeComment: {
      en: "Write a comment...",
      ru: "Написать комментарий...",
      uz: "Izoh yozing...",
    },
    yourName: {
      en: "Your Name",
      ru: "Ваше имя",
      uz: "Ismingiz",
    },
    post: {
      en: "Post",
      ru: "Отправить",
      uz: "Yuborish",
    },
    share: {
      en: "Share",
      ru: "Поделиться",
      uz: "Ulashish",
    },
    edit: {
      en: "Edit",
      ru: "Редактировать",
      uz: "Tahrirlash",
    },
    delete: {
      en: "Delete",
      ru: "Удалить",
      uz: "O'chirish",
    },
    save: {
      en: "Save",
      ru: "Сохранить",
      uz: "Saqlash",
    },
    cancel: {
      en: "Cancel",
      ru: "Отмена",
      uz: "Bekor qilish",
    },
    deleteConfirm: {
      en: "Are you sure you want to delete this comment?",
      ru: "Вы уверены, что хотите удалить этот комментарий?",
      uz: "Haqiqatan ham bu izohni o'chirib tashlamoqchimisiz?",
    },
    deleteDescription: {
      en: "This action cannot be undone.",
      ru: "Это действие нельзя отменить.",
      uz: "Bu amalni qaytarib bo'lmaydi.",
    },
    views: {
      en: "Views",
      ru: "Просмотры",
      uz: "Ko'rishlar",
    },
    loading: {
      en: "Loading blog post...",
      ru: "Загрузка статьи блога...",
      uz: "Blog maqolasi yuklanmoqda...",
    },
    leaveComment: {
      en: "Leave a comment",
      ru: "Оставить комментарий",
      uz: "Izoh qoldiring",
    },
    like: {
      en: "Like",
      ru: "Нравится",
      uz: "Yoqdi",
    },
    unlike: {
      en: "Unlike",
      ru: "Не нравится",
      uz: "Yoqmadi",
    },
  }

  if (loading || !post) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold mb-12">Blog</h1>
          <p>{translations.loading[language]}</p>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <motion.article
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-card rounded-lg shadow-lg overflow-hidden"
        >
          <div className="h-64 bg-muted flex items-center justify-center overflow-hidden">
            <img
              src={`/placeholder.svg?height=400&width=800&text=Blog+${post?.id || ""}`}
              alt="Featured Image"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-8">
            <div className="flex items-center gap-4 mb-6">
              <Avatar>
                <AvatarImage src={post?.authorImage} alt={post?.author || "Author"} />
                <AvatarFallback>{(post?.author || "A").substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{post?.author}</p>
                <div className="flex items-center text-muted-foreground text-sm">
                  <Calendar className="h-4 w-4 mr-1" />
                  {post?.date}
                </div>
              </div>
            </div>

            <h1 className="text-3xl font-bold mb-6">{post?.title?.[language] || post?.title?.en || "Blog Post"}</h1>

            <div
              className="prose prose-lg dark:prose-invert max-w-none mb-8"
              dangerouslySetInnerHTML={{ __html: post?.content?.[language] || post?.content?.en || "" }}
            />

            <div className="flex items-center gap-4 border-t border-b py-4 my-8">
              <Button variant={isLiked ? "default" : "ghost"} className="flex items-center gap-2" onClick={handleLike}>
                <Heart className={`h-5 w-5 ${isLiked ? "fill-current" : ""}`} />
                <span>{post?.likes || 0}</span>
              </Button>
              <Button variant="ghost" className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                <span>{Array.isArray(post?.comments) ? post.comments.length : postComments.length}</span>
              </Button>
              <Button variant="ghost" className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                <span>{post?.views || 0}</span>
              </Button>
              <Button variant="ghost" className="flex items-center gap-2 ml-auto" onClick={handleShare}>
                <Share2 className="h-5 w-5" />
                <span>{translations.share[language]}</span>
              </Button>
            </div>

            <div className="mt-12" ref={commentRef}>
              <h2 className="text-2xl font-bold mb-6">
                {translations.comments[language]} ({postComments.length})
              </h2>

              <div className="space-y-6 mb-8">
                {postComments.map((comment) => (
                  <div key={comment.id} className="flex gap-4">
                    <Avatar>
                      <AvatarImage src={comment.authorImage} alt={comment.author} />
                      <AvatarFallback>{comment.author.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="bg-muted p-4 rounded-lg">
                        <div className="flex justify-between mb-2">
                          <span className="font-medium">{comment.author}</span>
                          <span className="text-sm text-muted-foreground">{comment.date}</span>
                        </div>

                        {editingCommentId === comment.id ? (
                          <div className="space-y-2">
                            <Textarea
                              value={editedCommentContent}
                              onChange={(e) => setEditedCommentContent(e.target.value)}
                              className="w-full"
                              rows={3}
                            />
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={handleCancelEdit}
                                className="flex items-center gap-1"
                              >
                                <X className="h-4 w-4" />
                                {translations.cancel[language]}
                              </Button>
                              <Button
                                variant="default"
                                size="sm"
                                onClick={handleSaveComment}
                                className="flex items-center gap-1"
                              >
                                <Save className="h-4 w-4" />
                                {translations.save[language]}
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <p>{comment.content}</p>
                        )}
                      </div>

                      <div className="flex mt-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-muted-foreground"
                          onClick={() => handleCommentLike(comment.id)}
                        >
                          <Heart className="h-4 w-4 mr-1" />
                          <span>{comment.likes}</span>
                        </Button>

                        {/* Show edit/delete buttons only for user's own comments */}
                        {comment.userId === userId && (
                          <div className="ml-auto flex gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-muted-foreground"
                              onClick={() => handleEditComment(comment)}
                            >
                              <Edit2 className="h-4 w-4 mr-1" />
                              {translations.edit[language]}
                            </Button>

                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="sm" className="text-destructive">
                                  <Trash2 className="h-4 w-4 mr-1" />
                                  {translations.delete[language]}
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>{translations.deleteConfirm[language]}</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    {translations.deleteDescription[language]}
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>{translations.cancel[language]} </AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDeleteComment(comment.id)}
                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                  >
                                    {translations.delete[language]}
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold mb-4">{translations.leaveComment[language]}</h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="author" className="block text-sm font-medium mb-1">
                      {translations.yourName[language]}
                    </label>
                    <Input
                      id="author"
                      value={commentAuthor}
                      onChange={(e) => setCommentAuthor(e.target.value)}
                      placeholder="Your name"
                      className="w-full"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="comment" className="block text-sm font-medium mb-1">
                      {translations.writeComment[language]}
                    </label>
                    <Textarea
                      id="comment"
                      placeholder={translations.writeComment[language]}
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="mb-4"
                      rows={4}
                      required
                    />
                  </div>

                  <Button onClick={handleAddComment} className="w-full">
                    {translations.post[language]}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.article>
      </div>
      <Footer />
    </div>
  )
}
