import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, BookText, Calendar, User } from "lucide-react"
import { notFound } from "next/navigation"

import { Button } from "@/components/ui/button"
import { getBlogPostBySlug } from "@/app/actions"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"

interface BlogPostProps {
  params: {
    slug: string
  }
}

export default async function BlogPost({ params }: BlogPostProps) {
  const post = await getBlogPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  // Convert markdown content to HTML (simplified for demo purposes)
  // In a real app, you would use a markdown library like remark or marked
  const formatMarkdown = (markdown: string) => {
    // Very basic formatting to handle headings and paragraphs
    const formatted = markdown
      .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold mt-8 mb-4">$1</h1>')
      .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold mt-6 mb-3">$1</h2>')
      .replace(/^### (.*$)/gm, '<h3 class="text-xl font-bold mt-5 mb-2">$1</h3>')
      .replace(/\n\n/g, '</p><p class="mb-4">')

    return `<p class="mb-4">${formatted}</p>`
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          <div className="container max-w-4xl py-6">
            <div className="flex items-center gap-2 mb-6">
              <Link href="/blog">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/blog" className="flex items-center gap-2">
                <BookText className="h-5 w-5 text-primary" />
                <span className="font-medium">Back to Blog</span>
              </Link>
            </div>

            <article>
              <div className="relative w-full h-64 md:h-80 mb-6 rounded-lg overflow-hidden">
                <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
              </div>

              <div className="flex flex-wrap gap-3 items-center mb-4 text-sm">
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full">{post.category}</span>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <User className="h-4 w-4" />
                  <span>By {post.author}</span>
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold mb-6">{post.title}</h1>

              <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: formatMarkdown(post.content) }}
              />
            </article>

            <div className="mt-12 border-t pt-6">
              <h3 className="text-xl font-bold mb-4">Continue Your Growth Journey</h3>
              <div className="flex flex-wrap gap-4">
                <Link href="/dashboard">
                  <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                    Track Your Progress
                  </Button>
                </Link>
                <Link href="/chat">
                  <Button variant="outline">Join the Discussion</Button>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

