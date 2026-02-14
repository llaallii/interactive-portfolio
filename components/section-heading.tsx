"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { cn } from "@/lib/utils"

gsap.registerPlugin(ScrollTrigger)

interface SectionHeadingProps {
    title: string
    subtitle?: string
    className?: string
    align?: "left" | "center" | "right"
}

export function SectionHeading({
    title,
    subtitle,
    className,
    align = "left",
}: SectionHeadingProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const titleRef = useRef<HTMLHeadingElement>(null)
    const subtitleRef = useRef<HTMLParagraphElement>(null)
    const lineRef = useRef<HTMLDivElement>(null)

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
                toggleActions: "play none none reverse",
            },
        })

        tl.from(titleRef.current, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
        })

        if (subtitleRef.current) {
            tl.from(
                subtitleRef.current,
                {
                    y: 20,
                    opacity: 0,
                    duration: 0.6,
                    ease: "power3.out",
                },
                "-=0.4"
            )
        }

        if (lineRef.current) {
            tl.from(
                lineRef.current,
                {
                    width: 0,
                    duration: 0.8,
                    ease: "power3.inOut",
                },
                "-=0.6"
            )
        }
    }, { scope: containerRef })

    return (
        <div
            ref={containerRef}
            className={cn(
                "flex flex-col mb-12",
                {
                    "items-start text-left": align === "left",
                    "items-center text-center": align === "center",
                    "items-end text-right": align === "right",
                },
                className
            )}
        >
            <h2
                ref={titleRef}
                className="text-3xl md:text-4xl font-bold tracking-tighter"
            >
                {title}
            </h2>
            <div
                ref={lineRef}
                className={cn("h-1 bg-primary mt-2 mb-4", {
                    "w-24": align === "left" || align === "right",
                    "w-16": align === "center", // Smaller centered line
                })}
            />
            {subtitle && (
                <p
                    ref={subtitleRef}
                    className="text-muted-foreground text-lg max-w-2xl"
                >
                    {subtitle}
                </p>
            )}
        </div>
    )
}
