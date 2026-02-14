import { SectionHeading } from "@/components/section-heading"
import { BlogCard } from "@/components/blog-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getPublishedPosts, getAllCategories } from "@/lib/blog"

export const metadata = {
    title: "Blog | Ratan.dev",
    description: "Articles about embedded systems, IoT, BLE, and hardware engineering.",
}

export default function BlogPage() {
    const posts = getPublishedPosts()
    const categories = getAllCategories()

    // Group posts by category
    const postsByCategory = categories.reduce((acc, category) => {
        acc[category] = posts.filter(
            (post) => post.category.toLowerCase() === category.toLowerCase()
        )
        return acc
    }, {} as Record<string, typeof posts>)

    return (
        <div className="container mx-auto px-4 py-16">
            <SectionHeading
                title="Blog"
                subtitle="Thoughts, tutorials, and insights on embedded systems, IoT, and hardware engineering."
                align="center"
            />

            {posts.length === 0 ? (
                <div className="text-center py-16">
                    <p className="text-muted-foreground text-lg">No posts yet. Check back soon!</p>
                </div>
            ) : (
                <Tabs defaultValue="all" className="max-w-6xl mx-auto">
                    <div className="flex justify-center mb-8">
                        <TabsList className="flex flex-wrap h-auto gap-1">
                            <TabsTrigger value="all">All Posts</TabsTrigger>
                            {categories.map((category) => (
                                <TabsTrigger key={category} value={category.toLowerCase()}>
                                    {category}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </div>

                    <TabsContent value="all">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            {posts.map((post) => (
                                <BlogCard key={post.slug} post={post} />
                            ))}
                        </div>
                    </TabsContent>

                    {categories.map((category) => (
                        <TabsContent key={category} value={category.toLowerCase()}>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                {postsByCategory[category]?.map((post) => (
                                    <BlogCard key={post.slug} post={post} />
                                ))}
                            </div>
                        </TabsContent>
                    ))}
                </Tabs>
            )}
        </div>
    )
}
