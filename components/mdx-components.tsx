import type { MDXComponents } from "mdx/types"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

function slugify(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")
}

const CustomLink = ({
    href,
    children,
    ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const isInternal = href && href.startsWith("/")

    if (isInternal) {
        return (
            <Link
                href={href}
                className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
                {...props}
            >
                {children}
            </Link>
        )
    }

    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
            {...props}
        >
            {children}
        </a>
    )
}

const CustomImage = ({
    src,
    alt,
}: React.ImgHTMLAttributes<HTMLImageElement>) => {
    if (!src || typeof src !== "string") return null

    return (
        <figure className="my-8">
            <div className="relative aspect-video overflow-hidden rounded-lg border border-border/50">
                <Image
                    src={src as string}
                    alt={alt || ""}
                    fill
                    className="object-cover"
                />
            </div>
            {alt && (
                <figcaption className="mt-2 text-center text-sm text-muted-foreground">
                    {alt}
                </figcaption>
            )}
        </figure>
    )
}

export const mdxComponents: MDXComponents = {
    // Headings
    h1: ({ children, ...props }) => (
        <h1
            id={typeof children === "string" ? slugify(children) : undefined}
            className="scroll-m-20 text-4xl font-bold tracking-tight mt-8 mb-4"
            {...props}
        >
            {children}
        </h1>
    ),
    h2: ({ children, ...props }) => (
        <h2
            id={typeof children === "string" ? slugify(children) : undefined}
            className="scroll-m-20 text-3xl font-bold tracking-tight mt-10 mb-4 pb-2 border-b border-border/50"
            {...props}
        >
            {children}
        </h2>
    ),
    h3: ({ children, ...props }) => (
        <h3
            id={typeof children === "string" ? slugify(children) : undefined}
            className="scroll-m-20 text-2xl font-bold tracking-tight mt-8 mb-4"
            {...props}
        >
            {children}
        </h3>
    ),
    h4: ({ children, ...props }) => (
        <h4
            id={typeof children === "string" ? slugify(children) : undefined}
            className="scroll-m-20 text-xl font-bold tracking-tight mt-6 mb-3"
            {...props}
        >
            {children}
        </h4>
    ),

    // Paragraphs and text
    p: ({ children, ...props }) => (
        <p className="leading-7 [&:not(:first-child)]:mt-6" {...props}>
            {children}
        </p>
    ),
    strong: ({ children, ...props }) => (
        <strong className="font-bold text-foreground" {...props}>
            {children}
        </strong>
    ),
    em: ({ children, ...props }) => (
        <em className="italic" {...props}>
            {children}
        </em>
    ),

    // Links and images
    a: CustomLink,
    img: CustomImage,

    // Lists
    ul: ({ children, ...props }) => (
        <ul className="my-6 ml-6 list-disc [&>li]:mt-2" {...props}>
            {children}
        </ul>
    ),
    ol: ({ children, ...props }) => (
        <ol className="my-6 ml-6 list-decimal [&>li]:mt-2" {...props}>
            {children}
        </ol>
    ),
    li: ({ children, ...props }) => (
        <li className="leading-7" {...props}>
            {children}
        </li>
    ),

    // Blockquote
    blockquote: ({ children, ...props }) => (
        <blockquote
            className="mt-6 border-l-4 border-primary pl-6 italic text-muted-foreground"
            {...props}
        >
            {children}
        </blockquote>
    ),

    // Code - inline and block
    code: ({ children, className, ...props }) => {
        // Check if this is an inline code (no language class)
        const isInline = !className?.includes("language-")

        if (isInline) {
            return (
                <code
                    className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm"
                    {...props}
                >
                    {children}
                </code>
            )
        }

        return (
            <code className={cn("font-mono text-sm", className)} {...props}>
                {children}
            </code>
        )
    },
    pre: ({ children, ...props }) => (
        <pre
            className="my-6 overflow-x-auto rounded-lg border border-border/50 bg-muted/50 p-4"
            {...props}
        >
            {children}
        </pre>
    ),

    // Tables
    table: ({ children, ...props }) => (
        <div className="my-6 w-full overflow-x-auto">
            <table className="w-full border-collapse" {...props}>
                {children}
            </table>
        </div>
    ),
    thead: ({ children, ...props }) => (
        <thead className="border-b border-border" {...props}>
            {children}
        </thead>
    ),
    tbody: ({ children, ...props }) => (
        <tbody {...props}>{children}</tbody>
    ),
    tr: ({ children, ...props }) => (
        <tr className="border-b border-border/50 transition-colors hover:bg-muted/50" {...props}>
            {children}
        </tr>
    ),
    th: ({ children, ...props }) => (
        <th
            className="h-12 px-4 text-left align-middle font-medium text-muted-foreground"
            {...props}
        >
            {children}
        </th>
    ),
    td: ({ children, ...props }) => (
        <td className="p-4 align-middle" {...props}>
            {children}
        </td>
    ),

    // Horizontal rule
    hr: (props) => <hr className="my-8 border-border/50" {...props} />,

    // Custom components available in MDX
    Badge,
    Image,
    Link,
}
