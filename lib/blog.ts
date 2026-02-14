import fs from "fs"
import path from "path"
import matter from "gray-matter"
import readingTime from "reading-time"

const BLOG_DIR = path.join(process.cwd(), "content/blog")

export interface BlogPost {
    slug: string
    title: string
    date: string
    category: string
    tags: string[]
    excerpt: string
    image?: string
    published: boolean
    readingTime: string
    content: string
}

export interface BlogPostMeta {
    slug: string
    title: string
    date: string
    category: string
    tags: string[]
    excerpt: string
    image?: string
    published: boolean
    readingTime: string
}

function ensureBlogDir() {
    if (!fs.existsSync(BLOG_DIR)) {
        fs.mkdirSync(BLOG_DIR, { recursive: true })
    }
}

export function getAllPosts(): BlogPostMeta[] {
    ensureBlogDir()

    const files = fs.readdirSync(BLOG_DIR).filter((file) => file.endsWith(".mdx"))

    const posts = files
        .map((file) => {
            const slug = file.replace(/\.mdx$/, "")
            const filePath = path.join(BLOG_DIR, file)
            const fileContent = fs.readFileSync(filePath, "utf-8")
            const { data, content } = matter(fileContent)

            return {
                slug,
                title: data.title || "Untitled",
                date: data.date || new Date().toISOString().split("T")[0],
                category: data.category || "Uncategorized",
                tags: data.tags || [],
                excerpt: data.excerpt || "",
                image: data.image,
                published: data.published !== false,
                readingTime: readingTime(content).text,
            }
        })
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    return posts
}

export function getPublishedPosts(): BlogPostMeta[] {
    return getAllPosts().filter((post) => post.published)
}

export function getPostBySlug(slug: string): BlogPost | null {
    ensureBlogDir()

    const filePath = path.join(BLOG_DIR, `${slug}.mdx`)

    if (!fs.existsSync(filePath)) {
        return null
    }

    const fileContent = fs.readFileSync(filePath, "utf-8")
    const { data, content } = matter(fileContent)

    return {
        slug,
        title: data.title || "Untitled",
        date: data.date || new Date().toISOString().split("T")[0],
        category: data.category || "Uncategorized",
        tags: data.tags || [],
        excerpt: data.excerpt || "",
        image: data.image,
        published: data.published !== false,
        readingTime: readingTime(content).text,
        content,
    }
}

export function getPostsByCategory(category: string): BlogPostMeta[] {
    return getPublishedPosts().filter(
        (post) => post.category.toLowerCase() === category.toLowerCase()
    )
}

export function getAllCategories(): string[] {
    const posts = getAllPosts()
    const categories = new Set(posts.map((post) => post.category))
    return Array.from(categories).sort()
}

export function getAllTags(): string[] {
    const posts = getAllPosts()
    const tags = new Set(posts.flatMap((post) => post.tags))
    return Array.from(tags).sort()
}

export function getRelatedPosts(currentSlug: string, limit = 3): BlogPostMeta[] {
    const currentPost = getPostBySlug(currentSlug)
    if (!currentPost) return []

    const allPosts = getPublishedPosts().filter((post) => post.slug !== currentSlug)

    // Score posts by matching category and tags
    const scoredPosts = allPosts.map((post) => {
        let score = 0
        if (post.category === currentPost.category) score += 2
        const matchingTags = post.tags.filter((tag) => currentPost.tags.includes(tag))
        score += matchingTags.length
        return { post, score }
    })

    return scoredPosts
        .sort((a, b) => b.score - a.score)
        .slice(0, limit)
        .map(({ post }) => post)
}

export function extractHeadings(content: string): { id: string; text: string; level: number }[] {
    const headingRegex = /^(#{2,3})\s+(.+)$/gm
    const headings: { id: string; text: string; level: number }[] = []

    let match
    while ((match = headingRegex.exec(content)) !== null) {
        const level = match[1].length
        const text = match[2].trim()
        const id = text
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "")

        headings.push({ id, text, level })
    }

    return headings
}
