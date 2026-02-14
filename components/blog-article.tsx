"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TableOfContents } from "@/components/table-of-contents"
import type { BlogPost } from "@/lib/blog"

interface BlogArticleProps {
    post: BlogPost
    headings: { id: string; text: string; level: number }[]
    children: React.ReactNode
}

export function BlogArticle({ post, headings, children }: BlogArticleProps) {
    const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    })

    return (
        <article className="container mx-auto px-4 py-8">
            {/* Back button */}
            <Link href="/blog" className="inline-block mb-8">
                <Button variant="ghost" size="sm" className="gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Blog
                </Button>
            </Link>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Main content */}
                <div className="flex-1 max-w-3xl">
                    {/* Header */}
                    <header className="mb-8">
                        <div className="flex items-center gap-2 mb-4">
                            <Badge variant="secondary">{post.category}</Badge>
                            {!post.published && (
                                <Badge variant="outline" className="text-yellow-500 border-yellow-500">
                                    Draft
                                </Badge>
                            )}
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                            {post.title}
                        </h1>

                        <p className="text-xl text-muted-foreground mb-6">
                            {post.excerpt}
                        </p>

                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                <span>{formattedDate}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                <span>{post.readingTime}</span>
                            </div>
                        </div>

                        {post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-4">
                                {post.tags.map((tag) => (
                                    <Badge key={tag} variant="outline" className="text-xs">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        )}
                    </header>

                    {/* Featured image */}
                    {post.image && (
                        <div className="relative aspect-video overflow-hidden rounded-lg border border-border/50 mb-8">
                            <Image
                                src={post.image}
                                alt={post.title}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    )}

                    {/* Content */}
                    <div className="prose prose-lg dark:prose-invert max-w-none">
                        {children}
                    </div>
                </div>

                {/* Sidebar - TOC */}
                <aside className="hidden lg:block w-64 shrink-0">
                    <div className="sticky top-24">
                        <TableOfContents headings={headings} />
                    </div>
                </aside>
            </div>
        </article>
    )
}
