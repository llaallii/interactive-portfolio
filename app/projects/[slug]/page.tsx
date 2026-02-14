import { notFound } from "next/navigation"
import { getProjectBySlug, getPublishedProjects, getRelatedProjects } from "@/lib/projects"
import { compileMDXContent } from "@/lib/mdx"
import { ProjectArticle } from "@/components/project-article"
import { ProjectCard } from "@/components/project-card"
import { SectionHeading } from "@/components/section-heading"

interface ProjectPageProps {
    params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
    const projects = getPublishedProjects()
    return projects.map((project) => ({
        slug: project.slug,
    }))
}

export async function generateMetadata({ params }: ProjectPageProps) {
    const { slug } = await params
    const project = getProjectBySlug(slug)

    if (!project) {
        return {
            title: "Project Not Found",
        }
    }

    return {
        title: `${project.title} | Projects | Ratan.dev`,
        description: project.excerpt,
        openGraph: {
            title: project.title,
            description: project.excerpt,
            type: "article",
            publishedTime: project.date,
            images: project.image ? [project.image] : [],
        },
    }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
    const { slug } = await params
    const project = getProjectBySlug(slug)

    if (!project || !project.published) {
        notFound()
    }

    const { content } = await compileMDXContent(project.content)
    const relatedProjects = getRelatedProjects(slug, 3)

    return (
        <div className="min-h-screen">
            <ProjectArticle project={project}>
                {content}
            </ProjectArticle>

            {/* Related Projects */}
            {relatedProjects.length > 0 && (
                <section className="container mx-auto px-4 py-16 border-t border-border/50">
                    <SectionHeading
                        title="Related Projects"
                        subtitle="You might also be interested in these projects"
                        align="center"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        {relatedProjects.map((relatedProject) => (
                            <ProjectCard 
                                key={relatedProject.slug} 
                                slug={relatedProject.slug}
                                title={relatedProject.title}
                                description={relatedProject.excerpt}
                                tags={relatedProject.tags}
                                image={relatedProject.image}
                                links={relatedProject.links}
                                category={relatedProject.category}
                                role={relatedProject.role}
                                duration={relatedProject.duration}
                                featured={relatedProject.featured}
                            />
                        ))}
                    </div>
                </section>
            )}
        </div>
    )
}
