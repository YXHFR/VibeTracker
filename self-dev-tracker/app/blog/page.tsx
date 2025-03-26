import Link from "next/link"
import Image from "next/image"
import { ArrowRight, BookText } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { getBlogPosts } from "@/app/actions"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"

export default async function BlogPage() {
  const blogPosts = await getBlogPosts()
  const featuredPosts = blogPosts.filter((post) => post.featured)
  const recentPosts = blogPosts.filter((post) => !post.featured)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          <div className="container py-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <BookText className="h-6 w-6 text-primary" />
                <h1 className="text-3xl font-bold tracking-tight">Growth Blog</h1>
              </div>
            </div>

            <section className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Featured Articles</h2>
              <div className="grid gap-6 md:grid-cols-2">
                {featuredPosts.map((post) => (
                  <Card key={post.id} className="overflow-hidden flex flex-col h-full">
                    <div className="relative w-full h-48">
                      <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                    </div>
                    <CardHeader className="flex-none">
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-muted-foreground">{post.category}</div>
                        <div className="text-sm text-muted-foreground">{post.date}</div>
                      </div>
                      <CardTitle className="line-clamp-2 hover:text-primary transition-colors">
                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                      </CardTitle>
                      <CardDescription className="line-clamp-2">{post.excerpt}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <div className="text-sm">By {post.author}</div>
                    </CardContent>
                    <CardFooter className="flex-none">
                      <Link href={`/blog/${post.slug}`} className="w-full">
                        <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                          Read Article
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </section>

            <section className="mt-12">
              <h2 className="text-2xl font-bold mb-4">Recent Articles</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {recentPosts.map((post) => (
                  <Card key={post.id} className="overflow-hidden flex flex-col h-full">
                    <div className="relative w-full h-36">
                      <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                    </div>
                    <CardHeader className="flex-none">
                      <div className="flex items-center justify-between">
                        <div className="text-xs text-muted-foreground">{post.category}</div>
                        <div className="text-xs text-muted-foreground">{post.date}</div>
                      </div>
                      <CardTitle className="text-lg line-clamp-2 hover:text-primary transition-colors">
                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-sm line-clamp-3">{post.excerpt}</p>
                    </CardContent>
                    <CardFooter className="flex-none pt-0 flex justify-between items-center">
                      <div className="text-xs">By {post.author}</div>
                      <Link href={`/blog/${post.slug}`}>
                        <Button variant="ghost" size="sm" className="text-primary gap-1 p-0">
                          Read more <ArrowRight className="h-3 w-3" />
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}

