import { notFound } from "next/navigation"
import Link from "next/link"
import { getPostBySlug, getPublishedPosts, getRelatedPosts, extractHeadings } from "@/lib/blog"
import { compileMDXContent } from "@/lib/mdx"
import { BlogArticle } from "@/components/blog-article"
import { BlogCard } from "@/components/blog-card"
import { SectionHeading } from "@/components/section-heading"

interface BlogPostPageProps {
    params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
    const posts = getPublishedPosts()
    return posts.map((post) => ({
        slug: post.slug,
    }))
}

export async function generateMetadata({ params }: BlogPostPageProps) {
    const { slug } = await params
    const post = getPostBySlug(slug)

    if (!post) {
        return {
            title: "Post Not Found",
        }
    }

    return {
        title: `${post.title} | Blog | Ratan.dev`,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            type: "article",
            publishedTime: post.date,
            images: post.image ? [post.image] : [],
        },
    }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params
    const post = getPostBySlug(slug)

    if (!post || !post.published) {
        notFound()
    }

    const { content } = await compileMDXContent(post.content)
    const headings = extractHeadings(post.content)
    const relatedPosts = getRelatedPosts(slug, 3)

    return (
        <div className="min-h-screen">
            <BlogArticle post={post} headings={headings}>
                {content}
            </BlogArticle>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
                <section className="container mx-auto px-4 py-16 border-t border-border/50">
                    <SectionHeading
                        title="Related Posts"
                        subtitle="You might also enjoy these articles"
                        align="center"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        {relatedPosts.map((relatedPost) => (
                            <BlogCard key={relatedPost.slug} post={relatedPost} />
                        ))}
                    </div>
                </section>
            )}
        </div>
    )
}
