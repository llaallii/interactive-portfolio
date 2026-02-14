"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Github, ArrowRight, Star, Calendar, User } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface ProjectCardProps {
    slug?: string
    title: string
    description: string
    tags: string[]
    image?: string
    links?: {
        demo?: string
        github?: string
    }
    category?: string
    role?: string
    duration?: string
    featured?: boolean
}

export function ProjectCard({ 
    slug, 
    title, 
    description, 
    tags, 
    image, 
    links, 
    category,
    role,
    duration,
    featured 
}: ProjectCardProps) {
    const cardContent = (
        <Card className="group overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm transition-all hover:border-primary/50 hover:bg-card hover:shadow-lg h-full flex flex-col">
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
                    
                    {/* Category & Featured Badges */}
                    <div className="absolute top-3 left-3 flex gap-2">
                        {featured && (
                            <Badge className="bg-primary/90 text-primary-foreground backdrop-blur-sm">
                                <Star className="w-3 h-3 mr-1 fill-current" />
                                Featured
                            </Badge>
                        )}
                        {category && (
                            <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm">
                                {category}
                            </Badge>
                        )}
                    </div>

                    {/* External Links Overlay */}
                    {(links?.github || links?.demo) && (
                        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            {links?.github && (
                                <Link
                                    href={links.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-background/90 backdrop-blur-sm p-2 rounded-full text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <Github className="w-4 h-4" />
                                </Link>
                            )}
                            {links?.demo && (
                                <Link
                                    href={links.demo}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-background/90 backdrop-blur-sm p-2 rounded-full text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <ArrowUpRight className="w-4 h-4" />
                                </Link>
                            )}
                        </div>
                    )}
                </div>

                <CardHeader className="flex-none">
                    <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">
                        {title}
                    </CardTitle>
                    {(role || duration) && (
                        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mt-2">
                            {role && (
                                <div className="flex items-center gap-1">
                                    <User className="w-3.5 h-3.5" />
                                    <span>{role}</span>
                                </div>
                            )}
                            {duration && (
                                <div className="flex items-center gap-1">
                                    <Calendar className="w-3.5 h-3.5" />
                                    <span>{duration}</span>
                                </div>
                            )}
                        </div>
                    )}
                </CardHeader>

                <CardContent className="flex-grow">
                    <p className="text-muted-foreground mb-4 line-clamp-3">{description}</p>
                    <div className="flex flex-wrap gap-2">
                        {tags.slice(0, 4).map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                            </Badge>
                        ))}
                        {tags.length > 4 && (
                            <Badge variant="outline" className="text-xs">
                                +{tags.length - 4}
                            </Badge>
                        )}
                    </div>
                </CardContent>

                {slug && (
                    <CardFooter className="pt-0">
                        <Button variant="ghost" className="w-full group/btn">
                            Read More 
                            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                        </Button>
                    </CardFooter>
                )}
            </Card>
    )

    if (slug) {
        return (
            <Link href={`/projects/${slug}`} className="block">
                {cardContent}
            </Link>
        )
    }

    return cardContent
}
