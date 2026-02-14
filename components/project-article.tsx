"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, User, Building, CheckCircle, Github, ExternalLink, FileText, Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Project } from "@/lib/projects"

interface ProjectArticleProps {
    project: Project
    children: React.ReactNode
}

export function ProjectArticle({ project, children }: ProjectArticleProps) {
    const formattedDate = new Date(project.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    })

    return (
        <article className="container mx-auto px-4 py-8">
            {/* Back button */}
            <Link href="/projects" className="inline-block mb-8">
                <Button variant="ghost" size="sm" className="gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Projects
                </Button>
            </Link>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Main content */}
                <div className="flex-1 max-w-3xl">
                    {/* Header */}
                    <header className="mb-8">
                        <div className="flex items-center gap-2 mb-4">
                            <Badge variant="secondary">{project.category}</Badge>
                            {project.featured && (
                                <Badge className="bg-primary/90">
                                    <Star className="w-3 h-3 mr-1 fill-current" />
                                    Featured
                                </Badge>
                            )}
                            {project.status && (
                                <Badge variant="outline" className={
                                    project.status === "Completed" ? "text-green-500 border-green-500" :
                                    project.status === "Ongoing" ? "text-blue-500 border-blue-500" :
                                    "text-gray-500 border-gray-500"
                                }>
                                    {project.status}
                                </Badge>
                            )}
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                            {project.title}
                        </h1>

                        <p className="text-xl text-muted-foreground mb-6">
                            {project.excerpt}
                        </p>

                        {/* Project Metadata */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                            <div className="flex items-start gap-2 text-sm">
                                <User className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                                <div>
                                    <div className="font-medium">Role</div>
                                    <div className="text-muted-foreground">{project.role}</div>
                                </div>
                            </div>
                            
                            <div className="flex items-start gap-2 text-sm">
                                <Calendar className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                                <div>
                                    <div className="font-medium">Duration</div>
                                    <div className="text-muted-foreground">{project.duration}</div>
                                </div>
                            </div>

                            {project.client && (
                                <div className="flex items-start gap-2 text-sm">
                                    <Building className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                                    <div>
                                        <div className="font-medium">Client</div>
                                        <div className="text-muted-foreground">{project.client}</div>
                                    </div>
                                </div>
                            )}

                            <div className="flex items-start gap-2 text-sm">
                                <Clock className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                                <div>
                                    <div className="font-medium">Reading Time</div>
                                    <div className="text-muted-foreground">{project.readingTime}</div>
                                </div>
                            </div>
                        </div>

                        {/* Technologies */}
                        {project.technologies.length > 0 && (
                            <div className="mb-6">
                                <h3 className="text-sm font-medium mb-2">Technologies</h3>
                                <div className="flex flex-wrap gap-2">
                                    {project.technologies.map((tech) => (
                                        <Badge key={tech} variant="secondary" className="text-xs">
                                            {tech}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Tags */}
                        {project.tags.length > 0 && (
                            <div className="mb-6">
                                <h3 className="text-sm font-medium mb-2">Tags</h3>
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map((tag) => (
                                        <Badge key={tag} variant="outline" className="text-xs">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Links */}
                        {project.links && (project.links.github || project.links.demo || project.links.documentation) && (
                            <div className="flex flex-wrap gap-3">
                                {project.links.github && (
                                    <Link href={project.links.github} target="_blank" rel="noopener noreferrer">
                                        <Button variant="outline" size="sm" className="gap-2">
                                            <Github className="h-4 w-4" />
                                            View Code
                                        </Button>
                                    </Link>
                                )}
                                {project.links.demo && (
                                    <Link href={project.links.demo} target="_blank" rel="noopener noreferrer">
                                        <Button variant="outline" size="sm" className="gap-2">
                                            <ExternalLink className="h-4 w-4" />
                                            Live Demo
                                        </Button>
                                    </Link>
                                )}
                                {project.links.documentation && (
                                    <Link href={project.links.documentation} target="_blank" rel="noopener noreferrer">
                                        <Button variant="outline" size="sm" className="gap-2">
                                            <FileText className="h-4 w-4" />
                                            Documentation
                                        </Button>
                                    </Link>
                                )}
                            </div>
                        )}
                    </header>

                    {/* Featured image */}
                    {project.image && (
                        <div className="relative aspect-video overflow-hidden rounded-lg border border-border/50 mb-8">
                            <Image
                                src={project.image}
                                alt={project.title}
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

                {/* Sidebar - Project Info */}
                <aside className="hidden lg:block w-80 shrink-0">
                    <div className="sticky top-24 space-y-6">
                        {/* Quick Info Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Project Info</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4 text-sm">
                                <div>
                                    <div className="font-medium mb-1 text-muted-foreground">Category</div>
                                    <Badge variant="secondary">{project.category}</Badge>
                                </div>
                                
                                <div>
                                    <div className="font-medium mb-1 text-muted-foreground">Role</div>
                                    <div>{project.role}</div>
                                </div>

                                <div>
                                    <div className="font-medium mb-1 text-muted-foreground">Timeline</div>
                                    <div>{project.duration}</div>
                                </div>

                                {project.client && (
                                    <div>
                                        <div className="font-medium mb-1 text-muted-foreground">Client</div>
                                        <div>{project.client}</div>
                                    </div>
                                )}

                                <div>
                                    <div className="font-medium mb-1 text-muted-foreground">Status</div>
                                    <Badge variant="outline" className={
                                        project.status === "Completed" ? "text-green-500 border-green-500" :
                                        project.status === "Ongoing" ? "text-blue-500 border-blue-500" :
                                        "text-gray-500 border-gray-500"
                                    }>
                                        {project.status}
                                    </Badge>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Key Metrics */}
                        {project.metrics && project.metrics.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Key Outcomes</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-3">
                                        {project.metrics.map((metric, index) => (
                                            <li key={index} className="flex items-start gap-2 text-sm">
                                                <CheckCircle className="h-4 w-4 mt-0.5 text-green-500 flex-shrink-0" />
                                                <span>{metric}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        )}

                        {/* Technologies Used */}
                        {project.technologies.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Tech Stack</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-wrap gap-2">
                                        {project.technologies.map((tech) => (
                                            <Badge key={tech} variant="secondary" className="text-xs">
                                                {tech}
                                            </Badge>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </aside>
            </div>
        </article>
    )
}
