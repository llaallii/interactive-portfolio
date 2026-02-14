import Link from "next/link"
import { FileText, Eye, EyeOff, Clock, Tag, Calendar } from "lucide-react"
import { SectionHeading } from "@/components/section-heading"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getAllPosts, getAllCategories, getAllTags } from "@/lib/blog"

export const metadata = {
    title: "Admin Dashboard | Ratan.dev",
    description: "Blog administration dashboard",
}

export default function AdminPage() {
    const posts = getAllPosts()
    const categories = getAllCategories()
    const tags = getAllTags()

    const publishedCount = posts.filter((p) => p.published).length
    const draftCount = posts.filter((p) => !p.published).length
    const totalReadingTime = posts.reduce((acc, post) => {
        const minutes = parseInt(post.readingTime) || 0
        return acc + minutes
    }, 0)

    return (
        <div className="container mx-auto px-4 py-16">
            <SectionHeading
                title="Admin Dashboard"
                subtitle="Overview of your blog content"
                align="center"
            />

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12 max-w-6xl mx-auto">
                <Card className="border-border/50 bg-card/50">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Total Posts
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-2">
                            <FileText className="h-5 w-5 text-primary" />
                            <span className="text-3xl font-bold">{posts.length}</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-border/50 bg-card/50">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Published
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-2">
                            <Eye className="h-5 w-5 text-green-500" />
                            <span className="text-3xl font-bold">{publishedCount}</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-border/50 bg-card/50">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Drafts
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-2">
                            <EyeOff className="h-5 w-5 text-yellow-500" />
                            <span className="text-3xl font-bold">{draftCount}</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-border/50 bg-card/50">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Categories
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-2">
                            <Tag className="h-5 w-5 text-blue-500" />
                            <span className="text-3xl font-bold">{categories.length}</span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Posts Table */}
            <div className="max-w-6xl mx-auto">
                <Card className="border-border/50 bg-card/50">
                    <CardHeader>
                        <CardTitle>All Posts</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {posts.length === 0 ? (
                            <div className="text-center py-8">
                                <p className="text-muted-foreground">
                                    No posts yet. Create your first post in{" "}
                                    <code className="bg-muted px-2 py-1 rounded text-sm">
                                        content/blog/
                                    </code>
                                </p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-border">
                                            <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                                                Title
                                            </th>
                                            <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                                                Category
                                            </th>
                                            <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                                                Date
                                            </th>
                                            <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                                                Status
                                            </th>
                                            <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                                                Reading Time
                                            </th>
                                            <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {posts.map((post) => (
                                            <tr
                                                key={post.slug}
                                                className="border-b border-border/50 hover:bg-muted/50 transition-colors"
                                            >
                                                <td className="py-3 px-4">
                                                    <span className="font-medium">{post.title}</span>
                                                </td>
                                                <td className="py-3 px-4">
                                                    <Badge variant="secondary" className="text-xs">
                                                        {post.category}
                                                    </Badge>
                                                </td>
                                                <td className="py-3 px-4">
                                                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                                        <Calendar className="h-3 w-3" />
                                                        {new Date(post.date).toLocaleDateString()}
                                                    </div>
                                                </td>
                                                <td className="py-3 px-4">
                                                    {post.published ? (
                                                        <Badge
                                                            variant="outline"
                                                            className="text-green-500 border-green-500/50"
                                                        >
                                                            Published
                                                        </Badge>
                                                    ) : (
                                                        <Badge
                                                            variant="outline"
                                                            className="text-yellow-500 border-yellow-500/50"
                                                        >
                                                            Draft
                                                        </Badge>
                                                    )}
                                                </td>
                                                <td className="py-3 px-4">
                                                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                                        <Clock className="h-3 w-3" />
                                                        {post.readingTime}
                                                    </div>
                                                </td>
                                                <td className="py-3 px-4">
                                                    <Link href={`/blog/${post.slug}`}>
                                                        <Button variant="ghost" size="sm">
                                                            View
                                                        </Button>
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Categories and Tags */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto mt-8">
                <Card className="border-border/50 bg-card/50">
                    <CardHeader>
                        <CardTitle className="text-lg">Categories</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-2">
                            {categories.length > 0 ? (
                                categories.map((category) => (
                                    <Badge key={category} variant="secondary">
                                        {category}
                                    </Badge>
                                ))
                            ) : (
                                <p className="text-muted-foreground text-sm">No categories yet</p>
                            )}
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-border/50 bg-card/50">
                    <CardHeader>
                        <CardTitle className="text-lg">Tags</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-2">
                            {tags.length > 0 ? (
                                tags.map((tag) => (
                                    <Badge key={tag} variant="outline">
                                        {tag}
                                    </Badge>
                                ))
                            ) : (
                                <p className="text-muted-foreground text-sm">No tags yet</p>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
