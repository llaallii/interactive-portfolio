import { compileMDX } from "next-mdx-remote/rsc"
import rehypePrettyCode from "rehype-pretty-code"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"
import { mdxComponents } from "@/components/mdx-components"

const rehypePrettyCodeOptions = {
    theme: {
        dark: "github-dark",
        light: "github-light",
    },
    keepBackground: true,
    defaultLang: "plaintext",
    onVisitLine(node: { children: unknown[] }) {
        // Prevent lines from collapsing in display: grid mode
        if (node.children.length === 0) {
            node.children = [{ type: "text", value: " " }]
        }
    },
    onVisitHighlightedLine(node: { properties: { className: string[] } }) {
        node.properties.className.push("highlighted")
    },
    onVisitHighlightedChars(node: { properties: { className: string[] } }) {
        node.properties.className = ["highlighted-chars"]
    },
}

export async function compileMDXContent(source: string) {
    const { content, frontmatter } = await compileMDX({
        source,
        options: {
            parseFrontmatter: true,
            mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [
                    rehypeSlug,
                    [rehypePrettyCode, rehypePrettyCodeOptions],
                ],
            },
        },
        components: mdxComponents,
    })

    return { content, frontmatter }
}
