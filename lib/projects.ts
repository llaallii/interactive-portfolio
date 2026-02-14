import fs from "fs"
import path from "path"
import matter from "gray-matter"
import readingTime from "reading-time"

const PROJECTS_DIR = path.join(process.cwd(), "content/projects")

export interface Project {
    slug: string
    title: string
    date: string
    category: "Industrial" | "Research" | "Hobby"
    tags: string[]
    excerpt: string
    image?: string
    featured: boolean
    published: boolean
    role: string
    duration: string
    client?: string
    technologies: string[]
    links?: {
        github?: string
        demo?: string
        documentation?: string
    }
    metrics?: string[]
    status?: "Completed" | "Ongoing" | "Archived"
    readingTime: string
    content: string
}

export interface ProjectMeta {
    slug: string
    title: string
    date: string
    category: "Industrial" | "Research" | "Hobby"
    tags: string[]
    excerpt: string
    image?: string
    featured: boolean
    published: boolean
    role: string
    duration: string
    client?: string
    technologies: string[]
    links?: {
        github?: string
        demo?: string
        documentation?: string
    }
    metrics?: string[]
    status?: "Completed" | "Ongoing" | "Archived"
    readingTime: string
}

function ensureProjectsDir() {
    if (!fs.existsSync(PROJECTS_DIR)) {
        fs.mkdirSync(PROJECTS_DIR, { recursive: true })
    }
}

export function getAllProjects(): ProjectMeta[] {
    ensureProjectsDir()

    const files = fs.readdirSync(PROJECTS_DIR).filter((file) => file.endsWith(".mdx"))

    const projects = files
        .map((file) => {
            const slug = file.replace(/\.mdx$/, "")
            const filePath = path.join(PROJECTS_DIR, file)
            const fileContent = fs.readFileSync(filePath, "utf-8")
            const { data, content } = matter(fileContent)

            return {
                slug,
                title: data.title || "Untitled Project",
                date: data.date || new Date().toISOString().split("T")[0],
                category: data.category || "Hobby",
                tags: data.tags || [],
                excerpt: data.excerpt || "",
                image: data.image,
                featured: data.featured === true,
                published: data.published !== false,
                role: data.role || "Contributor",
                duration: data.duration || "",
                client: data.client,
                technologies: data.technologies || [],
                links: data.links,
                metrics: data.metrics,
                status: data.status || "Completed",
                readingTime: readingTime(content).text,
            }
        })
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    return projects
}

export function getPublishedProjects(): ProjectMeta[] {
    return getAllProjects().filter((project) => project.published)
}

export function getFeaturedProjects(): ProjectMeta[] {
    return getPublishedProjects().filter((project) => project.featured)
}

export function getProjectBySlug(slug: string): Project | null {
    ensureProjectsDir()

    const filePath = path.join(PROJECTS_DIR, `${slug}.mdx`)

    if (!fs.existsSync(filePath)) {
        return null
    }

    const fileContent = fs.readFileSync(filePath, "utf-8")
    const { data, content } = matter(fileContent)

    return {
        slug,
        title: data.title || "Untitled Project",
        date: data.date || new Date().toISOString().split("T")[0],
        category: data.category || "Hobby",
        tags: data.tags || [],
        excerpt: data.excerpt || "",
        image: data.image,
        featured: data.featured === true,
        published: data.published !== false,
        role: data.role || "Contributor",
        duration: data.duration || "",
        client: data.client,
        technologies: data.technologies || [],
        links: data.links,
        metrics: data.metrics,
        status: data.status || "Completed",
        readingTime: readingTime(content).text,
        content,
    }
}

export function getProjectsByCategory(category: string): ProjectMeta[] {
    return getPublishedProjects().filter(
        (project) => project.category.toLowerCase() === category.toLowerCase()
    )
}

export function getAllCategories(): string[] {
    const projects = getAllProjects()
    const categories = new Set(projects.map((project) => project.category))
    return Array.from(categories).sort()
}

export function getAllTechnologies(): string[] {
    const projects = getAllProjects()
    const technologies = new Set(projects.flatMap((project) => project.technologies))
    return Array.from(technologies).sort()
}

export function getRelatedProjects(currentSlug: string, limit = 3): ProjectMeta[] {
    const currentProject = getProjectBySlug(currentSlug)
    if (!currentProject) return []

    const allProjects = getPublishedProjects().filter((project) => project.slug !== currentSlug)

    // Score projects by matching category, tags, and technologies
    const scoredProjects = allProjects.map((project) => {
        let score = 0
        if (project.category === currentProject.category) score += 2
        const matchingTags = project.tags.filter((tag) => currentProject.tags.includes(tag))
        score += matchingTags.length
        const matchingTechs = project.technologies.filter((tech) => 
            currentProject.technologies.includes(tech)
        )
        score += matchingTechs.length * 0.5
        return { project, score }
    })

    return scoredProjects
        .sort((a, b) => b.score - a.score)
        .slice(0, limit)
        .map(({ project }) => project)
}
