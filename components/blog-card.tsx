"use client"

import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { BlogPostMeta } from "@/lib/blog"

interface BlogCardProps {
    post: BlogPostMeta
}

export function BlogCard({ post }: BlogCardProps) {
    const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    })

    return (
        <Link href={`/blog/${post.slug}`}>
            <Card className="group h-full overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm transition-colors hover:border-primary/50 hover:bg-card">
                <div className="relative aspect-video overflow-hidden bg-muted">
                    {post.image ? (
                        <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center text-muted-foreground">
                            <span className="font-mono text-4xl opacity-20">&lt;/&gt;</span>
                        </div>
                    )}
                    <div className="absolute inset-0 bg-primary/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>

                <CardHeader className="pb-2">
                    <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary" className="text-xs">
                            {post.category}
                        </Badge>
                    </div>
                    <CardTitle className="text-xl font-bold line-clamp-2 group-hover:text-primary transition-colors">
                        {post.title}
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    <p className="text-muted-foreground mb-4 line-clamp-2 text-sm">
                        {post.excerpt}
                    </p>

                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>{formattedDate}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{post.readingTime}</span>
                        </div>
                    </div>

                    {post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-4">
                            {post.tags.slice(0, 3).map((tag) => (
                                <Badge key={tag} variant="outline" className="text-xs px-2 py-0">
                                    {tag}
                                </Badge>
                            ))}
                            {post.tags.length > 3 && (
                                <Badge variant="outline" className="text-xs px-2 py-0">
                                    +{post.tags.length - 3}
                                </Badge>
                            )}
                        </div>
                    )}
                </CardContent>
            </Card>
        </Link>
    )
}
