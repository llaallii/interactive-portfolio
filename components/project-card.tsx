"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Github } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ProjectCardProps {
    title: string
    description: string
    tags: string[]
    image?: string
    links?: {
        demo?: string
        github?: string
    }
}

export function ProjectCard({ title, description, tags, image, links }: ProjectCardProps) {
    return (
        <Card className="group overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm transition-colors hover:border-primary/50 hover:bg-card">
            <div className="relative aspect-video overflow-hidden bg-muted">
                {image ? (
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center text-muted-foreground">
                        No Image
                    </div>
                )}
                <div className="absolute inset-0 bg-primary/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>

            <CardHeader>
                <div className="flex justify-between items-start gap-4">
                    <CardTitle className="text-xl font-bold">{title}</CardTitle>
                    <div className="flex gap-2">
                        {links?.github && (
                            <Link
                                href={links.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-primary transition-colors"
                            >
                                <Github className="w-5 h-5" />
                            </Link>
                        )}
                        {links?.demo && (
                            <Link
                                href={links.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-primary transition-colors"
                            >
                                <ArrowUpRight className="w-5 h-5" />
                            </Link>
                        )}
                    </div>
                </div>
            </CardHeader>

            <CardContent>
                <p className="text-muted-foreground mb-4 line-clamp-3">{description}</p>
                <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                        </Badge>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
