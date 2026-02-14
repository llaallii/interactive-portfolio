"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface Heading {
    id: string
    text: string
    level: number
}

interface TableOfContentsProps {
    headings: Heading[]
}

export function TableOfContents({ headings }: TableOfContentsProps) {
    const [activeId, setActiveId] = useState<string>("")

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id)
                    }
                })
            },
            {
                rootMargin: "-80px 0px -80% 0px",
                threshold: 0,
            }
        )

        headings.forEach(({ id }) => {
            const element = document.getElementById(id)
            if (element) {
                observer.observe(element)
            }
        })

        return () => observer.disconnect()
    }, [headings])

    const handleClick = (id: string) => {
        const element = document.getElementById(id)
        if (element) {
            const yOffset = -100
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
            window.scrollTo({ top: y, behavior: "smooth" })
        }
    }

    if (headings.length === 0) {
        return null
    }

    return (
        <nav className="space-y-2">
            <h4 className="font-semibold text-sm text-foreground mb-4">On this page</h4>
            <ul className="space-y-2 text-sm">
                {headings.map((heading) => (
                    <li
                        key={heading.id}
                        style={{ paddingLeft: `${(heading.level - 2) * 12}px` }}
                    >
                        <button
                            onClick={() => handleClick(heading.id)}
                            className={cn(
                                "text-left w-full hover:text-primary transition-colors",
                                activeId === heading.id
                                    ? "text-primary font-medium"
                                    : "text-muted-foreground"
                            )}
                        >
                            {heading.text}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
